// Canvas-only functions are not in Power Fx Core, and the library will not take a custom function
// with a permissive signature: ReflectionFunction wants a concrete type for every argument, and
// TexlFunction, the interface a variadic stub would implement, is internal to the package. Each call
// to one is therefore rewritten in place to `And(IsBlank(arg1), IsBlank(arg2), ...)`, which keeps
// every argument expression under the binder while giving the call a type the binder accepts. The
// map records where each copied fragment came from, so an error in the rewritten text is reported at
// its position in the source.
using System.Text;

namespace FxCheck;

internal sealed class Rewritten
{
    public string Text = "";

    // (position in the rewritten text, position in the source, length) for every verbatim fragment.
    public readonly List<(int Out, int Src, int Len)> Map = new();

    public int ToSource(int position)
    {
        foreach (var fragment in Map)
        {
            if (position >= fragment.Out && position < fragment.Out + fragment.Len)
            {
                return fragment.Src + (position - fragment.Out);
            }
        }

        foreach (var fragment in Map)
        {
            if (fragment.Out >= position) return fragment.Src;
        }

        return 0;
    }
}

internal static class Rewriter
{
    // The behaviour functions Power Fx Core does not carry, or carries but will not bind. Their
    // arguments are still checked.
    public static readonly HashSet<string> Stubs = new()
    {
        "Navigate", "Set", "ClearCollect", "Collect", "Clear", "Patch", "Notify", "Reset",
        "SaveData", "LoadData", "UpdateContext", "Concurrent", "Select", "Launch", "Refresh",
        "ResetForm", "SubmitForm", "Back", "Exit", "Remove", "RemoveIf", "Relate", "Unrelate",
    };

    // Functions whose later arguments are a predicate or a change record over the first argument's
    // rows: only the first argument can be checked on its own.
    private static readonly HashSet<string> FirstArgOnly = new() { "RemoveIf", "Remove", "Patch" };

    // Functions Power Fx Core has no answer for in a value position. A formula that uses one is
    // skipped rather than guessed at.
    public static readonly HashSet<string> Unsupported = new() { "GroupBy", "Ungroup", "JSON", "Param" };

    public static Rewritten Rewrite(string source)
    {
        var result = new Rewritten();
        var sb = new StringBuilder();
        Walk(source, 0, source.Length, sb, result);
        result.Text = sb.ToString();
        return result;
    }

    private static void Copy(string source, int from, int to, StringBuilder sb, Rewritten result)
    {
        if (to <= from) return;
        result.Map.Add((sb.Length, from, to - from));
        sb.Append(source, from, to - from);
    }

    private static bool AfterDot(string source, int from, int start)
    {
        for (var i = start - 1; i >= from; i--)
        {
            if (char.IsWhiteSpace(source[i])) continue;
            return source[i] == '.' || source[i] == '!';
        }

        return false;
    }

    private static void Walk(string source, int from, int to, StringBuilder sb, Rewritten result)
    {
        var i = from;
        var copied = from;
        while (i < to)
        {
            var c = source[i];
            if (c == '/' && i + 1 < to && source[i + 1] == '/')
            {
                while (i < to && source[i] != '\n') i++;
                continue;
            }

            if (c == '"' || c == '\'')
            {
                i = Scan.SkipQuoted(source, i, to);
                continue;
            }

            if (!char.IsLetter(c) && c != '_')
            {
                i++;
                continue;
            }

            var start = i;
            while (i < to && (char.IsLetterOrDigit(source[i]) || source[i] == '_')) i++;
            var name = source[start..i];
            var open = i;
            while (open < to && char.IsWhiteSpace(source[open])) open++;

            // Parent and Self are keywords to the parser and cannot be declared as symbols, so they
            // are renamed to the deferred symbols the checker does declare.
            if ((name == "Parent" || name == "Self") && !AfterDot(source, from, start))
            {
                Copy(source, copied, start, sb, result);
                sb.Append("Fx").Append(name);
                copied = i;
                continue;
            }

            if (open >= to || source[open] != '(') continue;
            var close = Scan.MatchClose(source, open, to);

            // User() is canvas-only and returns a record. The call is renamed to the record symbol
            // Program.cs declares for it, so that User().Email binds and User().Nope does not.
            if (name == "User" && Scan.SkipTrivia(source, open + 1, close) == close && !AfterDot(source, from, start))
            {
                Copy(source, copied, start, sb, result);
                sb.Append("FxUser");
                i = copied = close + 1;
                continue;
            }

            // Canvas takes a predicate per argument; Power Fx Core takes one. They mean the same
            // thing, so the predicates are combined and every one of them is still checked.
            if (name == "Filter" && Scan.SplitArgs(source, open, close).Count > 2)
            {
                var predicates = Scan.SplitArgs(source, open, close);
                Copy(source, copied, start, sb, result);
                sb.Append("Filter(");
                Walk(source, predicates[0].Lo, predicates[0].Hi, sb, result);
                sb.Append(", And(");
                for (var k = 1; k < predicates.Count; k++)
                {
                    if (k > 1) sb.Append(", ");
                    Walk(source, predicates[k].Lo, predicates[k].Hi, sb, result);
                }

                sb.Append("))");
                i = copied = close + 1;
                continue;
            }

            if (!Stubs.Contains(name)) continue;
            Copy(source, copied, start, sb, result);
            sb.Append("And(");
            var written = 0;
            foreach (var arg in Scan.SplitArgs(source, open, close))
            {
                if (written == 1 && FirstArgOnly.Contains(name)) break;
                if (written > 0) sb.Append(", ");
                sb.Append("IsBlank(");
                Walk(source, arg.Lo, arg.Hi, sb, result);
                sb.Append(')');
                written++;
            }

            if (written == 0) sb.Append("true");
            if (written == 1) sb.Append(", true");
            sb.Append(')');
            i = copied = close + 1;
        }

        Copy(source, copied, to, sb, result);
    }
}

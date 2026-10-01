// Reading a Formulas block as definitions, and reading the collections and variables a behaviour
// formula creates.
namespace FxCheck;

internal static class Definitions
{
    // `Name = expression;` statements, split on the semicolons at depth zero. The offset of each
    // expression inside the block is kept, so an error lands on the line it is on in the file.
    public static IEnumerable<Definition> Split(Unit unit)
    {
        var text = unit.Text;
        var start = 0;
        var depth = 0;
        for (var i = 0; i < text.Length; i++)
        {
            var c = text[i];
            if (c == '"' || c == '\'')
            {
                i = Scan.SkipQuoted(text, i, text.Length) - 1;
                continue;
            }

            if (c == '/' && i + 1 < text.Length && text[i + 1] == '/')
            {
                while (i < text.Length && text[i] != '\n') i++;
                continue;
            }

            if (c is '(' or '[' or '{') depth++;
            else if (c is ')' or ']' or '}') depth--;
            else if (c == ';' && depth == 0)
            {
                var definition = Statement(unit, start, i);
                if (definition is not null) yield return definition;
                start = i + 1;
            }
        }

        var last = Statement(unit, start, text.Length);
        if (last is not null) yield return last;
    }

    private static Definition? Statement(Unit unit, int from, int to)
    {
        var text = unit.Text;
        var i = Scan.SkipTrivia(text, from, to);
        if (i >= to) return null;
        if (!char.IsLetter(text[i]) && text[i] != '_') return null;
        var nameStart = i;
        while (i < to && (char.IsLetterOrDigit(text[i]) || text[i] == '_')) i++;
        var name = text[nameStart..i];
        while (i < to && char.IsWhiteSpace(text[i])) i++;
        if (i >= to || text[i] != '=' || (i + 1 < to && text[i + 1] == '=')) return null;
        var body = i + 1;
        return new Definition(name, text[body..to], body, unit);
    }

    // ClearCollect(colX, source), Collect(colX, source), Set(varX, value): the name and what it is
    // given, so the symbol can be typed from the source rather than guessed at.
    public static IEnumerable<Assignment> Assignments(Unit unit)
    {
        var text = unit.Text;
        for (var i = 0; i < text.Length; i++)
        {
            var c = text[i];
            if (c == '"' || c == '\'')
            {
                i = Scan.SkipQuoted(text, i, text.Length) - 1;
                continue;
            }

            if (c == '/' && i + 1 < text.Length && text[i + 1] == '/')
            {
                while (i < text.Length && text[i] != '\n') i++;
                continue;
            }

            if (!char.IsLetter(c) && c != '_') continue;
            var start = i;
            while (i < text.Length && (char.IsLetterOrDigit(text[i]) || text[i] == '_')) i++;
            var name = text[start..i];
            if (name is not ("ClearCollect" or "Collect" or "Set")) continue;
            var open = i;
            while (open < text.Length && char.IsWhiteSpace(text[open])) open++;
            if (open >= text.Length || text[open] != '(') continue;
            var close = Scan.MatchClose(text, open, text.Length);
            var args = Scan.SplitArgs(text, open, close);
            if (args.Count < 2) continue;
            var target = text[args[0].Lo..args[0].Hi].Trim();
            if (target.Length == 0 || !(char.IsLetter(target[0]) || target[0] == '_')) continue;
            if (target.Any(ch => !char.IsLetterOrDigit(ch) && ch != '_')) continue;
            yield return new Assignment(target, text[args[1].Lo..args[1].Hi], name != "Set");
            i = open;
        }
    }

    // The first function in a formula that Power Fx Core has no answer for in a value position.
    public static string? UnsupportedIn(string text)
    {
        foreach (var name in Rewriter.Unsupported)
        {
            var at = 0;
            while ((at = text.IndexOf(name, at, StringComparison.Ordinal)) >= 0)
            {
                var before = at == 0 || (!char.IsLetterOrDigit(text[at - 1]) && text[at - 1] != '_');
                var after = at + name.Length < text.Length && text[at + name.Length] == '(';
                if (before && after) return name;
                at += name.Length;
            }
        }

        return null;
    }
}

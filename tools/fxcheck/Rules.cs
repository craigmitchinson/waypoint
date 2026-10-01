// The rules the Power Fx binder does not catch cleanly on its own, every one learned from a Studio open:
// SortByColumns and Search take their column names as strings, not identifiers, so a bare identifier
// there is dialect the binder may accept or lose in a cascade; and ThisItem has no row to read outside
// a gallery's own template, which the binder only reports once the whole property is already an error.
// Both are syntactic, so they run over the unit's raw text rather than through the engine.
using System.Text.RegularExpressions;

namespace FxCheck;

internal static class Rules
{
    // Gallery-level properties that can never legitimately read a row from their own gallery's own
    // `Items`: `TemplateSize` and `TemplatePadding` size every row before any row is entered, so
    // there is no `ThisItem` yet. `Items`, `Fill`, `Height`, `Width`, `X`, `Y` and `Visible` are left
    // out of this rule: on a gallery nested inside another gallery's template (`grpRows` here) they
    // legitimately read the *enclosing* gallery's `ThisItem`, and scripts/fxcheck.mjs resolves a
    // nested gallery's own scope to itself the same way it resolves a root gallery's, so the two
    // cannot be told apart from `Unit.ThisItem` alone without a job.mjs fix that is out of scope here.
    private static readonly HashSet<string> GalleryLevelProperties = new() { "TemplateSize", "TemplatePadding" };

    // SortByColumns(Table, "Column", Order, "Column2", Order2, ...) and
    // Search(Table, SearchString, "Column", "Column2", ...): every column name is a string literal.
    public static IEnumerable<Finding> ColumnArgumentsNotStringLiterals(Unit unit)
    {
        foreach (var call in FindCalls(unit.Text, "SortByColumns"))
        {
            var close = Scan.MatchClose(unit.Text, call, unit.Text.Length);
            var args = Scan.SplitArgs(unit.Text, call, close);
            for (var i = 1; i < args.Count; i += 2)
            {
                var arg = unit.Text[args[i].Lo..args[i].Hi].Trim();
                if (!IsStringLiteral(arg))
                {
                    yield return Locate(unit, args[i].Lo, unit.Path,
                        $"SortByColumns takes its column name as a string: '{arg}' should be \"{arg}\".");
                }
            }
        }

        foreach (var call in FindCalls(unit.Text, "Search"))
        {
            var close = Scan.MatchClose(unit.Text, call, unit.Text.Length);
            var args = Scan.SplitArgs(unit.Text, call, close);
            for (var i = 2; i < args.Count; i++)
            {
                var arg = unit.Text[args[i].Lo..args[i].Hi].Trim();
                if (!IsStringLiteral(arg))
                {
                    yield return Locate(unit, args[i].Lo, unit.Path,
                        $"Search takes its column name as a string: '{arg}' should be \"{arg}\".");
                }
            }
        }
    }

    // ThisItem on TemplateSize or TemplatePadding: the gallery has not entered its template yet, so
    // there is no row. `ownItems` is every control's own `Items` text, keyed by control name, so a
    // property can be checked against whether the scope it was given is its own gallery's `Items`
    // (always wrong: a gallery cannot supply its own row before it has one) rather than some other
    // gallery's genuinely enclosing one.
    public static Finding? ThisItemOnGalleryLevelProperty(Unit unit, IReadOnlyDictionary<string, string> ownItems)
    {
        var dot = unit.Path.LastIndexOf('.');
        if (dot < 0) return null;
        var control = unit.Path[..dot];
        var name = unit.Path[(dot + 1)..];
        if (!GalleryLevelProperties.Contains(name)) return null;
        var match = Regex.Match(unit.Text, @"\bThisItem\b");
        if (!match.Success) return null;

        // No enclosing scope at all (scripts/fxcheck.mjs found no gallery in the ancestry), or the
        // scope it did find is this same control's own `Items`: either way, the row it reads does
        // not exist yet at this property.
        var isOwnScope = unit.ThisItem is not null
            && ownItems.TryGetValue(control, out var own)
            && unit.ThisItem.Trim() == own.Trim();
        if (unit.ThisItem is not null && !isOwnScope) return null;

        return Locate(unit, match.Index, unit.Path,
            $"ThisItem is not valid on {name}: this is a gallery-level property, not a template " +
            "property, and has no row until the gallery enters its own Items.");
    }

    // A table the catalogue carries but Studio has not connected with Add data. The binder types it
    // like any other table, so only this rule sees it: Studio answers a formula that reads one with
    // "'Quarter snapshots' isn't recognized". Names with a space are quoted in Power Fx, the rest
    // are bare identifiers; a double-quoted string is blanked first so a table's name in a caption
    // is not a reference.
    public static IEnumerable<Finding> UnconnectedTables(Unit unit, IReadOnlyCollection<string> unconnected)
    {
        if (unconnected.Count == 0) yield break;
        var text = Masked(unit.Text);
        foreach (var table in unconnected)
        {
            var pattern = table.Contains(' ')
                ? "'" + Regex.Escape(table) + "'"
                : "(?<![\\w.'])" + Regex.Escape(table) + "(?![\\w'])";
            foreach (Match match in Regex.Matches(text, pattern))
            {
                yield return Locate(unit, match.Index, unit.Path,
                    $"Table '{table}' is not connected in the app (Add data in Studio).");
            }
        }
    }

    // The double-quoted strings and the comments, blanked, so a match is a name and not text. The
    // blanking keeps every offset, so a finding still points at the right line and column.
    private static string Masked(string text)
    {
        var chars = text.ToCharArray();
        for (var i = 0; i < chars.Length; i++)
        {
            var c = chars[i];
            var end = -1;
            if (c == '"') end = Scan.SkipQuoted(text, i, text.Length);
            else if (c == '/' && i + 1 < chars.Length && chars[i + 1] == '/') end = Scan.SkipTrivia(text, i, text.Length);
            if (end < 0) continue;
            for (var j = i; j < end && j < chars.Length; j++)
            {
                if (chars[j] != '\n') chars[j] = ' ';
            }

            i = end - 1;
        }

        return new string(chars);
    }

    // A property name on a modern control, against the properties that control actually carries.
    // Only the controls modern-controls.json knows are checked, so a classic control, a canvas
    // component and a modern control the reference does not describe are all left alone.
    public static Finding? UnknownModernProperty(Unit unit, ModernCatalogue modern)
    {
        if (unit.Kind != "property" || !modern.Knows(unit.Control)) return null;
        var dot = unit.Path.LastIndexOf('.');
        if (dot < 0) return null;
        var name = unit.Path[(dot + 1)..];
        if (modern.Has(unit.Control!, name)) return null;

        return Locate(unit, 0, unit.Path, $"Unknown property {name} for {unit.Control}.");
    }

    // Program.cs carries the same logic for the engine's own findings; this copy keeps Rules.cs
    // independent of Program.cs's top-level local functions, which are not visible outside it.
    private static Finding Locate(Unit unit, int offset, string formula, string message)
    {
        var line = 0;
        var column = 0;
        for (var i = 0; i < Math.Min(offset, unit.Text.Length); i++)
        {
            if (unit.Text[i] == '\n')
            {
                line++;
                column = 0;
            }
            else
            {
                column++;
            }
        }

        return new Finding
        {
            File = unit.File,
            Formula = formula,
            Line = unit.Line + line,
            Column = column + 1,
            Message = message,
        };
    }

    private static IEnumerable<int> FindCalls(string text, string name)
    {
        foreach (Match m in Regex.Matches(text, $@"(?<![\w.]){Regex.Escape(name)}\s*\("))
        {
            yield return m.Index + m.Length - 1;
        }
    }

    private static bool IsStringLiteral(string arg)
    {
        if (arg.Length < 2 || arg[0] != '"' || arg[^1] != '"') return false;
        for (var i = 1; i < arg.Length - 1; i++)
        {
            if (arg[i] != '"') continue;
            if (i + 1 < arg.Length - 1 && arg[i + 1] == '"')
            {
                i++;
                continue;
            }

            return false;
        }

        return true;
    }
}

// The Dataverse catalogue (power/canvas/columns.json) as Power Fx types.
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Text.Json;
using System.Text.RegularExpressions;
using Microsoft.PowerFx;
using Microsoft.PowerFx.Core.Utils;
using Microsoft.PowerFx.Types;

namespace FxCheck;

internal sealed class Column
{
    public string Display = "";
    public string Logical = "";
    public string Type = "";
    public string? Target;
    public string? OptionSet;
    public List<string> Options = new();
    public Dictionary<int, string> ByValue = new();
}

internal sealed class Table
{
    public string Display = "";
    public string Singular = "";
    public string Logical = "";
    public string PrimaryName = "";
    public List<Column> Columns = new();
}

internal sealed class Catalogue
{
    public readonly List<Table> Tables = new();
    public readonly Dictionary<string, OptionSet> OptionSets = new();
    private readonly Dictionary<string, Table> _byLogical = new();

    public static Catalogue Load(string path)
    {
        var cat = new Catalogue();
        using var doc = JsonDocument.Parse(File.ReadAllText(path));
        foreach (var t in doc.RootElement.GetProperty("tables").EnumerateArray())
        {
            var table = new Table
            {
                Display = t.GetProperty("display").GetString()!,
                Singular = t.TryGetProperty("singular", out var s) ? s.GetString()! : "",
                Logical = t.GetProperty("logical").GetString()!,
                PrimaryName = t.TryGetProperty("primaryName", out var p) ? p.GetString()! : "",
            };
            foreach (var c in t.GetProperty("columns").EnumerateArray())
            {
                var col = new Column
                {
                    Display = c.GetProperty("display").GetString()!,
                    Logical = c.GetProperty("logical").GetString()!,
                    Type = c.GetProperty("type").GetString()!,
                    Target = c.TryGetProperty("target", out var tg) ? tg.GetString() : null,
                    OptionSet = c.TryGetProperty("optionSet", out var os) ? os.GetString() : null,
                };
                if (c.TryGetProperty("options", out var opts))
                {
                    foreach (var o in opts.EnumerateArray())
                    {
                        var label = o.GetProperty("label").GetString()!;
                        col.Options.Add(label);
                        if (o.TryGetProperty("value", out var v) && v.TryGetInt32(out var n)) col.ByValue[n] = label;
                    }
                }
                table.Columns.Add(col);
            }
            cat.Tables.Add(table);
            cat._byLogical[table.Logical] = table;
        }
        return cat;
    }

    // The tables Studio has actually connected, read from power/canvas/source/datasources.json: the
    // names refresh-skeleton.mjs took out of the downloaded app's References/DataSources.json. A
    // table arrives there as its logical name, as `default.cds_<logical>_views` (the view collection
    // Studio adds with the table) and as its display name; an option set arrives as
    // `wp_person_wp_lead`, which names no table on its own. Anything the file does not carry is a
    // table no formula may reference, whatever the catalogue says.
    public static HashSet<string> Connected(string path)
    {
        var connected = new HashSet<string>();
        using var doc = JsonDocument.Parse(File.ReadAllText(path));
        if (!doc.RootElement.TryGetProperty("names", out var names)) return connected;
        foreach (var entry in names.EnumerateArray())
        {
            var name = entry.GetString();
            if (name is null) continue;
            connected.Add(name);
            var views = Regex.Match(name, @"^default\.cds_(.+)_views$");
            if (views.Success) connected.Add(views.Groups[1].Value);
        }

        return connected;
    }

    // The tables the catalogue has and the app has not connected, by display name.
    public List<string> Unconnected(HashSet<string> connected) =>
        Tables.Where(t => !connected.Contains(t.Logical) && !connected.Contains(t.Display))
            .Select(t => t.Display)
            .ToList();

    // A Dataverse choice is an enum. Studio names it "Column (Table plural)", which is the name the
    // formulas compare against, so that is the display name the option set is registered under.
    public Table? ByLogical(string logical) => _byLogical.TryGetValue(logical, out var t) ? t : null;

    public string ChoiceName(Table table, Column column) => $"{column.Display} ({table.Display})";

    private OptionSet Choice(Table table, Column column)
    {
        var name = ChoiceName(table, column);
        if (OptionSets.TryGetValue(name, out var existing)) return existing;
        var members = ImmutableDictionary.CreateBuilder<DName, DName>();
        foreach (var label in column.Options.Distinct())
        {
            var dn = new DName(label);
            if (!members.ContainsKey(dn)) members.Add(dn, dn);
        }
        if (members.Count == 0) members.Add(new DName("Blank"), new DName("Blank"));
        var set = new OptionSet(name, members.ToImmutable());
        OptionSets[name] = set;
        return set;
    }

    private FormulaType Scalar(Table table, Column column, int depth)
    {
        switch (column.Type)
        {
            case "text":
            case "memo": return FormulaType.String;
            case "int":
            case "decimal":
            case "money": return FormulaType.Decimal;
            case "datetime": return FormulaType.DateTime;
            case "bool": return FormulaType.Boolean;
            case "guid": return FormulaType.Guid;
            case "picklist": return Choice(table, column).FormulaType;
            case "lookup": return LookupRecord(column, depth);
            default: return FormulaType.String;
        }
    }

    // A lookup is a record. One level down carries the target's own columns; the level below that is
    // the target's primary column only, so a chain of lookups cannot recurse forever.
    private RecordType LookupRecord(Column column, int depth)
    {
        if (column.Target is null || !_byLogical.TryGetValue(column.Target, out var target))
        {
            return RecordType.Empty().Add("Name", FormulaType.String);
        }
        if (depth >= 2)
        {
            var primary = target.Columns.FirstOrDefault(c => c.Display == target.PrimaryName);
            var shallow = RecordType.Empty();
            if (primary is not null) shallow = shallow.Add(primary.Logical, FormulaType.String, primary.Display);
            return shallow;
        }
        return Record(target, depth + 1);
    }

    public RecordType Record(Table table, int depth = 0)
    {
        var record = RecordType.Empty();
        var seen = new HashSet<string>();
        foreach (var column in table.Columns)
        {
            if (!seen.Add(column.Logical)) continue;
            var display = column.Display == column.Logical || !seen.Add(column.Display) ? null : column.Display;
            record = record.Add(column.Logical, Scalar(table, column, depth), display);
        }
        return record;
    }
}

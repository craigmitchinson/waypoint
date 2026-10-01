// FxCheck --eval: the named formulas run, not just bound, against the seed data package.
//
//   dotnet run --project tools/fxcheck -- --eval --columns power/canvas/columns.json \
//       --data power/data/src/data.xml --formulas power/app/Formulas.pa.yaml \
//       --onstart power/app/App.pa.yaml --expected power/tests/expected.json
//
// The seed rows become in-memory tables typed from columns.json: a choice is the option set value
// the catalogue registers, a lookup is the target's record two levels deep, exactly as the binder
// types them. OnStart's ClearCollect targets are then evaluated the way OnStart writes them, every
// named formula is evaluated in dependency order, and each expression asked for on the command line
// is printed beside its value in power/tests/expected.json.
//
// This is a separate entry point: nothing here runs on the checking path preflight uses.
//
// --asof YYYY-MM-DD pins Today() and Now(): RecalcEngine.EvalAsync takes a RuntimeConfig, and
// RuntimeConfig.AddService<IClockService>(...) is Microsoft.PowerFx.Interpreter 1.8.1's own supported
// hook for the clock a formula reads (Microsoft.PowerFx.Functions.IClockService, one property,
// UtcNow). No rewriting of Today()/Now() calls is needed or done.
using System.Globalization;
using System.Text.Json;
using System.Text.RegularExpressions;
using System.Threading;
using System.Xml.Linq;
using Microsoft.PowerFx;
using Microsoft.PowerFx.Core.Utils;
using Microsoft.PowerFx.Functions;
using Microsoft.PowerFx.Types;

namespace FxCheck;

internal static class Eval
{
    // The expressions worth a parity run, and the case in power/tests/expected.json each answers.
    // The headline figures the Command band reads are NetTotal, CommittedTotal and ReservedTotal;
    // the per-squad available MW is SquadTable's Net column, which replaced SquadNetMW().
    private static readonly (string Expression, string Case)[] Headlines =
    {
        ("NetTotal", "NetTotal"),
        ("CommittedTotal", "CommittedTotal"),
        ("ReservedTotal", "ReservedTotal"),
        ("InPlanMW", "InPlanMW"),
        ("DeliveredMW", "DeliveredMW"),
        ("GbpInYear", "GbpInYear"),
        ("NetTotal - CommittedTotal - ReservedTotal", ""),
        ("LookUp(SquadTable, Name = \"Service\").Net", "SquadNetMW(\"Service\")"),
        ("LookUp(SquadTable, Name = \"Squad 1\").Net", "SquadNetMW(\"Squad 1\")"),
        ("LookUp(SquadTable, Name = \"Squad 2\").Net", "SquadNetMW(\"Squad 2\")"),
        ("LookUp(SquadTable, Name = \"Squad 3\").Net", "SquadNetMW(\"Squad 3\")"),
        ("LookUp(SquadTable, Name = \"Squad 4\").Net", "SquadNetMW(\"Squad 4\")"),
        ("LookUp(SquadTable, Name = \"Team level\").Net", "SquadNetMW(\"Team level\")"),
        ("LookUp(SquadTable, Name = \"Service\").Committed", "SquadCommittedMW(\"Service\")"),
        ("LookUp(SquadTable, Name = \"Squad 1\").Committed", "SquadCommittedMW(\"Squad 1\")"),
        ("LookUp(SquadTable, Name = \"Squad 4\").Committed", "SquadCommittedMW(\"Squad 4\")"),
        ("LookUp(SquadTable, Name = \"Service\").Utilisation", "SquadUtilisation(\"Service\")"),
        ("LookUp(SquadTable, Name = \"Squad 4\").Reserved", "SquadReservedMW(\"Squad 4\")"),
    };

    public static int Run()
    {
        var columnsPath = Arg("--columns") ?? "power/canvas/columns.json";
        var dataPath = Arg("--data") ?? "power/data/src/data.xml";
        var formulasPath = Arg("--formulas") ?? "power/app/Formulas.pa.yaml";
        var onStartPath = Arg("--onstart") ?? "power/app/App.pa.yaml";
        var expectedPath = Arg("--expected") ?? "power/tests/expected.json";
        var verbose = Environment.GetCommandLineArgs().Contains("--verbose");

        var asOfText = Arg("--asof");
        RuntimeConfig? runtimeConfig = null;
        if (asOfText is not null)
        {
            if (!DateTime.TryParseExact(asOfText, "yyyy-MM-dd", CultureInfo.InvariantCulture,
                    DateTimeStyles.None, out var asOf))
            {
                Console.Error.WriteLine($"fxcheck --eval: --asof wants YYYY-MM-DD, got \"{asOfText}\".");
                return 2;
            }

            runtimeConfig = new RuntimeConfig();
            runtimeConfig.AddService<IClockService>(new PinnedClock(DateTime.SpecifyKind(asOf, DateTimeKind.Utc)));
        }

        var catalogue = Catalogue.Load(columnsPath);
        var symbols = new SymbolTable();
        var config = new PowerFxConfig { SymbolTable = symbols };

        // Record() is what registers a table's choices, so every type is built before the option
        // sets are read back out of the catalogue.
        var types = new Dictionary<string, RecordType>();
        foreach (var table in catalogue.Tables) types[table.Logical] = catalogue.Record(table);
        foreach (var pair in catalogue.OptionSets) symbols.AddOptionSet(pair.Value, new DName(pair.Key));

        var engine = new RecalcEngine(config);
        var parser = new ParserOptions { Culture = CultureInfo.InvariantCulture, NumberIsFloat = false };

        var rows = Rows(dataPath);
        foreach (var table in catalogue.Tables)
        {
            var type = types[table.Logical];
            var records = rows.TryGetValue(table.Logical, out var byId)
                ? byId.Values.Select(r => Record(catalogue, types, rows, table, r, 0)).ToList()
                : new List<RecordValue>();
            engine.UpdateVariable(table.Display, FormulaValue.NewTable(type, records));
        }

        // OnStart's own collections, from the ClearCollect and Set calls as OnStart writes them.
        var onStart = Unit(onStartPath, "OnStart");
        var assignments = onStart is null ? new List<Assignment>() : Definitions.Assignments(onStart).ToList();
        var definitions = Unit(formulasPath, "Formulas") is { } block
            ? Definitions.Split(block).ToList()
            : new List<Definition>();

        var failures = new List<string>();
        var done = new HashSet<string>();
        for (var round = 0; round < 8; round++)
        {
            var progress = false;
            foreach (var assignment in assignments)
            {
                if (!done.Add("col:" + assignment.Name)) continue;
                if (!Assign(engine, parser, runtimeConfig, assignment.Name, assignment.Source, failures)) done.Remove("col:" + assignment.Name);
                else progress = true;
            }

            foreach (var definition in definitions)
            {
                if (!done.Add(definition.Name)) continue;
                if (!Assign(engine, parser, runtimeConfig, definition.Name, definition.Text, failures)) done.Remove(definition.Name);
                else progress = true;
            }

            if (!progress) break;
            failures.Clear();
        }

        var unresolved = definitions.Select(d => d.Name).Where(n => !done.Contains(n)).Distinct().ToList();
        Console.WriteLine($"formulas: {definitions.Count - unresolved.Count} of {definitions.Count} evaluated, "
                          + $"{assignments.Count(a => done.Contains("col:" + a.Name))} of {assignments.Count} collections");
        // The names that stay unresolved offline are screen- and control-scoped UI formulas Studio's
        // own runtime supplies context for; they are not a parity signal, so the detail is quiet
        // unless asked for.
        if (verbose)
        {
            foreach (var failure in failures.Take(12))
            {
                Console.WriteLine("  unresolved: " + Regex.Replace(failure, @"\s+", " "));
            }

            if (failures.Count > 12) Console.WriteLine($"  ... and {failures.Count - 12} more");
        }

        var root = File.Exists(expectedPath)
            ? JsonDocument.Parse(File.ReadAllText(expectedPath)).RootElement
            : default;
        var expected = root.ValueKind == JsonValueKind.Object ? root.GetProperty("cases") : default;
        var tolerance = root.ValueKind == JsonValueKind.Object && root.TryGetProperty("tolerance", out var t)
            ? t.GetDouble()
            : 0.005;
        var extra = Names();
        var wanted = extra.Count > 0
            ? extra.Select(e => (Expression: e, Case: e)).ToArray()
            : Headlines;

        Console.WriteLine();
        Console.WriteLine($"{"case",-46} {"expected",14} {"actual",14} {"delta",10}  status");
        var mismatches = 0;
        foreach (var (expression, name) in wanted)
        {
            var actual = Text(Value(engine, parser, runtimeConfig, expression));
            if (expected.ValueKind != JsonValueKind.Object || name.Length == 0
                || !expected.TryGetProperty(name, out var c))
            {
                Console.WriteLine($"{expression,-46} {"",14} {actual,14} {"",10}  (no fixture)");
                continue;
            }

            var fixture = c.GetProperty("expected").ToString();
            var near = Near(actual, fixture, tolerance, out var delta);
            if (!near) mismatches++;
            var deltaText = double.IsNaN(delta) ? "" : delta.ToString("0.######", CultureInfo.InvariantCulture);
            Console.WriteLine($"{name,-46} {fixture,14} {actual,14} {deltaText,10}  {(near ? "PASS" : "FAIL")}");
        }

        return mismatches > 0 ? 1 : 0;
    }

    // ---------------------------------------------------------------------------
    // The seed data package as tables.
    // ---------------------------------------------------------------------------

    // data.xml: entity logical name -> record id -> field logical name -> value.
    private static Dictionary<string, Dictionary<string, Dictionary<string, string>>> Rows(string path)
    {
        var all = new Dictionary<string, Dictionary<string, Dictionary<string, string>>>();
        var doc = XDocument.Load(path);
        foreach (var entity in doc.Root!.Elements("entity"))
        {
            var name = entity.Attribute("name")!.Value;
            var byId = all[name] = new Dictionary<string, Dictionary<string, string>>();
            foreach (var record in entity.Element("records")?.Elements("record") ?? Enumerable.Empty<XElement>())
            {
                var id = record.Attribute("id")!.Value;
                var fields = byId[id] = new Dictionary<string, string>();
                fields[""] = id;
                foreach (var field in record.Elements("field"))
                {
                    fields[field.Attribute("name")!.Value] = field.Attribute("value")?.Value ?? "";
                }
            }
        }

        return all;
    }

    // A row as a record of the type the catalogue gives the table, at the depth the catalogue
    // stops recursing at: two levels of lookup, then the target's primary column alone.
    private static RecordValue Record(
        Catalogue catalogue,
        Dictionary<string, RecordType> types,
        Dictionary<string, Dictionary<string, Dictionary<string, string>>> rows,
        Table table,
        Dictionary<string, string> row,
        int depth)
    {
        var type = depth >= 2 ? Shallow(table) : types[table.Logical];
        var fields = new List<NamedValue>();
        foreach (var name in type.FieldNames)
        {
            var column = table.Columns.FirstOrDefault(c => c.Logical == name);
            var fieldType = type.GetFieldType(name);
            if (column is null) continue;
            var id = column.Logical == table.Logical + "id";
            var raw = id ? row[""] : row.TryGetValue(column.Logical, out var v) ? v : "";
            fields.Add(new NamedValue(name, Scalar(catalogue, types, rows, column, fieldType, raw, depth)));
        }

        return FormulaValue.NewRecordFromFields(type, fields);
    }

    private static RecordType Shallow(Table table)
    {
        var primary = table.Columns.FirstOrDefault(c => c.Display == table.PrimaryName);
        return primary is null
            ? RecordType.Empty()
            : RecordType.Empty().Add(primary.Logical, FormulaType.String, primary.Display);
    }

    private static FormulaValue Scalar(
        Catalogue catalogue,
        Dictionary<string, RecordType> types,
        Dictionary<string, Dictionary<string, Dictionary<string, string>>> rows,
        Column column,
        FormulaType type,
        string raw,
        int depth)
    {
        if (column.Type == "lookup")
        {
            var target = column.Target is null ? null : catalogue.ByLogical(column.Target);
            if (target is not null && raw.Length > 0 && type is RecordType
                && rows.TryGetValue(target.Logical, out var byId) && byId.TryGetValue(raw, out var row))
            {
                return Record(catalogue, types, rows, target, row, depth + 1);
            }

            return FormulaValue.NewBlank(type);
        }

        if (raw.Length == 0) return FormulaValue.NewBlank(type);
        switch (column.Type)
        {
            case "picklist":
                if (int.TryParse(raw, out var option) && column.ByValue.TryGetValue(option, out var label)
                    && type is OptionSetValueType set && set.TryGetValue(new DName(label), out var chosen))
                {
                    return chosen;
                }

                return FormulaValue.NewBlank(type);
            case "int":
            case "decimal":
            case "money":
                return decimal.TryParse(raw, NumberStyles.Any, CultureInfo.InvariantCulture, out var number)
                    ? FormulaValue.New(number)
                    : FormulaValue.NewBlank(type);
            case "datetime":
                return DateTime.TryParse(raw, CultureInfo.InvariantCulture,
                    DateTimeStyles.AdjustToUniversal | DateTimeStyles.AssumeUniversal, out var moment)
                    ? FormulaValue.New(DateTime.SpecifyKind(moment.Date, DateTimeKind.Unspecified))
                    : FormulaValue.NewBlank(type);
            case "bool":
                return FormulaValue.New(raw.Equals("True", StringComparison.OrdinalIgnoreCase) || raw == "1");
            case "guid":
                return Guid.TryParse(raw, out var guid) ? FormulaValue.New(guid) : FormulaValue.NewBlank(type);
            default:
                return FormulaValue.New(raw);
        }
    }

    // ---------------------------------------------------------------------------
    // Running the formulas.
    // ---------------------------------------------------------------------------

    private static bool Assign(RecalcEngine engine, ParserOptions parser, RuntimeConfig? runtimeConfig, string name, string source, List<string> failures)
    {
        var value = Value(engine, parser, runtimeConfig, source);
        if (value is ErrorValue error)
        {
            failures.Add(name + ": " + string.Join("; ", error.Errors.Select(e => e.Message)));
            return false;
        }

        try
        {
            engine.UpdateVariable(name, value);
            return true;
        }
        catch (Exception ex)
        {
            failures.Add(name + ": " + ex.Message);
            return false;
        }
    }

    private static FormulaValue Value(RecalcEngine engine, ParserOptions parser, RuntimeConfig? runtimeConfig, string source)
    {
        try
        {
            return engine
                .EvalAsync(Rewriter.Rewrite(source).Text, CancellationToken.None, parser, null, runtimeConfig)
                .GetAwaiter().GetResult();
        }
        catch (Exception ex)
        {
            return FormulaValue.NewError(new ExpressionError { Message = ex.GetType().Name + ": " + ex.Message });
        }
    }

    private static string Text(FormulaValue value) => value switch
    {
        ErrorValue error => "ERROR " + string.Join("; ", error.Errors.Select(e => e.Message)).Replace("\n", " "),
        BlankValue => "blank",
        DecimalValue d => Math.Round(d.Value, 6).ToString(CultureInfo.InvariantCulture),
        NumberValue n => Math.Round(n.Value, 6).ToString(CultureInfo.InvariantCulture),
        StringValue s => s.Value,
        BooleanValue b => b.Value ? "true" : "false",
        TableValue t => "table of " + t.Rows.Count(),
        _ => value.ToObject()?.ToString() ?? "blank",
    };

    private static bool Near(string value, string fixture, double tolerance, out double delta)
    {
        if (double.TryParse(value, NumberStyles.Any, CultureInfo.InvariantCulture, out var a)
            && double.TryParse(fixture, NumberStyles.Any, CultureInfo.InvariantCulture, out var b))
        {
            delta = Math.Abs(a - b);
            return delta <= tolerance;
        }

        delta = double.NaN;
        return value == fixture;
    }

    // The one clock a formula reads offline: fixed at the moment --asof names, so Today() and Now()
    // answer the day the fixture was worked out on rather than the day the checker happens to run.
    private sealed class PinnedClock : IClockService
    {
        public DateTime UtcNow { get; }
        public PinnedClock(DateTime utcNow) => UtcNow = utcNow;
    }

    // The Formulas or OnStart block of a .pa.yaml, dedented, with the leading "=" dropped.
    private static Unit? Unit(string path, string property)
    {
        if (!File.Exists(path)) return null;
        var lines = File.ReadAllLines(path);
        var at = Array.FindIndex(lines, l => Regex.IsMatch(l, @"^\s*" + property + @":\s*\|\s*$"));
        if (at < 0) return null;
        var indent = lines[at].Length - lines[at].TrimStart().Length + 2;
        var body = new List<string>();
        for (var i = at + 1; i < lines.Length; i++)
        {
            if (lines[i].Trim().Length > 0 && lines[i].Length - lines[i].TrimStart().Length < indent) break;
            body.Add(lines[i].Length >= indent ? lines[i][indent..] : "");
        }

        var text = string.Join("\n", body).TrimStart();
        if (text.StartsWith("=", StringComparison.Ordinal)) text = text[1..];
        return new Unit { Kind = "formulas", File = path, Path = property, Text = text, Line = at + 2 };
    }

    // Everything after --eval up to the next flag: the expressions to evaluate.
    private static List<string> Names()
    {
        var args = Environment.GetCommandLineArgs();
        var at = Array.IndexOf(args, "--eval");
        var names = new List<string>();
        for (var i = at + 1; i >= 0 && i < args.Length && !args[i].StartsWith("--", StringComparison.Ordinal); i++)
        {
            names.Add(args[i]);
        }

        return names;
    }

    private static string? Arg(string name)
    {
        var args = Environment.GetCommandLineArgs();
        for (var i = 0; i < args.Length - 1; i++)
        {
            if (args[i] == name) return args[i + 1];
        }

        return null;
    }
}

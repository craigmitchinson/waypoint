// The job scripts/fxcheck.mjs writes, and the report this tool writes back.
using System.Text.Json;
using System.Text.Json.Serialization;

namespace FxCheck;

internal sealed class Job
{
    public List<Unit> Units { get; set; } = new();

    public List<string> Controls { get; set; } = new();

    // Component name -> custom property name -> what the .pa.yaml declares about it.
    public Dictionary<string, Dictionary<string, CustomProperty>> Components { get; set; } = new();
}

internal sealed class CustomProperty
{
    // Input, Output, Event or Action.
    public string Kind { get; set; } = "";

    // Text, Number, Boolean, Table, Record, Color, ...
    public string DataType { get; set; } = "";

    // The property's Default formula, where it has one. It is what types the property.
    public string? Default { get; set; }
}

internal sealed class Unit
{
    // "formulas" for an App Formulas block, "property" for a screen or component property.
    public string Kind { get; set; } = "";

    public string File { get; set; } = "";

    public string Path { get; set; } = "";

    public string Text { get; set; } = "";

    // The 1-based line in the file the text starts on. The text keeps its original indentation, so a
    // position in it is a position in the file.
    public int Line { get; set; }

    // The Items formula of the gallery this property sits inside, where there is one.
    public string? ThisItem { get; set; }

    // The identifier and version of the control this property sits on, as the YAML writes it:
    // `ModernButton@1.0.0`. Null on an App or Formulas unit.
    public string? Control { get; set; }
}

internal sealed class Finding
{
    public string File { get; set; } = "";

    public string Formula { get; set; } = "";

    public int Line { get; set; }

    public int Column { get; set; }

    public string Message { get; set; } = "";
}

internal sealed class Report
{
    public int Definitions { get; set; }

    public int Properties { get; set; }

    public int Galleries { get; set; }

    public List<Finding> Findings { get; set; } = new();

    public List<string> Skipped { get; set; } = new();
}

internal sealed record Definition(string Name, string Text, int Offset, Unit Unit);

internal sealed record Assignment(string Name, string Source, bool WantsTable);

internal static class Json
{
    public static readonly JsonSerializerOptions Options = new()
    {
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
        PropertyNameCaseInsensitive = true,
        DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull,
        WriteIndented = true,
    };
}

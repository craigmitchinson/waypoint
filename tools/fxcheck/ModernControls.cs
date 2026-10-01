// The modern controls' own table: modern-controls.json, built from
// power/reference/canvas-apps-04-modern-controls-reference.md and from what Studio itself wrote on
// power/canvas/source/Src/Screen1.pa.yaml. Each control is keyed by the identifier and version the
// YAML carries, so `ModernButton@1.0.0` is a different entry from a later version of the same
// control, and each property names the enum type its value comes from where it has one.
using System.Text.Json;

namespace FxCheck;

internal sealed class ModernCatalogue
{
    // Properties every modern control carries, whichever section of the reference describes it.
    public List<string> Common { get; set; } = new();

    // Enum type name -> its members. A name with a dot in it is quoted in Power Fx, the way Studio
    // writes it: 'BadgeCanvas.Appearance'.Ghost.
    public Dictionary<string, List<string>> Enums { get; set; } = new();

    // Control identifier with version -> the control's properties.
    public Dictionary<string, ModernControl> Controls { get; set; } = new();

    public static ModernCatalogue Load(string path) =>
        JsonSerializer.Deserialize<ModernCatalogue>(File.ReadAllText(path), Json.Options)!;

    // Whether this control's properties are known well enough to report an unknown one.
    public bool Knows(string? control) => control is not null && Controls.ContainsKey(control);

    public bool Has(string control, string property) =>
        Common.Contains(property) || Controls[control].Properties.ContainsKey(property);

    // The type the table declares for a property, where it knows the control and the property.
    public string? TypeOf(string control, string property) =>
        Controls.TryGetValue(control, out var c) && c.Properties.TryGetValue(property, out var p) ? p.Type : null;
}

internal sealed class ModernControl
{
    // The reference document's section this control's properties were read from.
    public string Doc { get; set; } = "";

    public Dictionary<string, ModernProperty> Properties { get; set; } = new();
}

internal sealed class ModernProperty
{
    // Text, Number, Boolean, Color, Enum, Table, Record, Image, DateTime, DataSource, Behaviour, and
    // the three that are typed from the control's own Items: ItemsRow (a record from Items),
    // ItemsRowTable (a table of records from Items) and ItemsText (a text formula over ThisItem).
    public string Type { get; set; } = "";

    // The enum type the value comes from, where Type is Enum.
    public string? Enum { get; set; }
}

// YamlCheck: a strict YAML syntax gate for the canvas app build.
//
//   dotnet run --project tools/yamlcheck -- --yaml <dir>
//
// pac canvas pack copies *.pa.yaml into the .msapp verbatim; it does not parse it, so a file that is
// not even well-formed YAML (a `// comment` inside a mapping, say) packs cleanly and only fails when
// Studio opens the app. This tool parses every file under <dir> with YamlDotNet's own parser -- the
// same low-level event stream a real YAML 1.1 reader uses, not a guess -- and reports the first
// syntax fault in each file as file:line:col. It does not check the pa.schema.yaml shape, only that
// the file is valid YAML.
using YamlDotNet.Core;
using YamlDotNet.RepresentationModel;

var dir = ArgOf("--yaml");
if (dir is null || !Directory.Exists(dir))
{
    Console.Error.WriteLine("usage: YamlCheck --yaml <dir>");
    return 2;
}

var files = Directory.EnumerateFiles(dir, "*.yaml", SearchOption.AllDirectories)
    .OrderBy(f => f, StringComparer.Ordinal)
    .ToList();

var failures = 0;
foreach (var file in files)
{
    try
    {
        using var reader = new StreamReader(file);
        var stream = new YamlStream();
        stream.Load(reader);
    }
    catch (YamlException ex)
    {
        failures++;
        var line = ex.Start.Line;
        var column = ex.Start.Column;
        Console.WriteLine($"{file}:{line}:{column}: {ex.Message}");
    }
}

if (failures == 0)
{
    Console.WriteLine($"{files.Count} files, 0 invalid.");
    return 0;
}

Console.WriteLine($"{files.Count} files, {failures} invalid.");
return 1;

string? ArgOf(string name)
{
    var i = Array.IndexOf(args, name);
    return i >= 0 && i + 1 < args.Length ? args[i + 1] : null;
}

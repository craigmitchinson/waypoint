// The little bit of Power Fx lexing this tool does for itself: strings, quoted names, comments,
// brackets and argument lists.
namespace FxCheck;

internal static class Scan
{
    public static int SkipQuoted(string text, int i, int to)
    {
        var quote = text[i];
        i++;
        while (i < to)
        {
            if (text[i] == quote)
            {
                if (i + 1 < to && text[i + 1] == quote)
                {
                    i += 2;
                    continue;
                }

                return i + 1;
            }

            i++;
        }

        return to;
    }

    public static int SkipTrivia(string text, int i, int to)
    {
        while (i < to)
        {
            if (char.IsWhiteSpace(text[i]))
            {
                i++;
                continue;
            }

            if (text[i] == '/' && i + 1 < to && text[i + 1] == '/')
            {
                while (i < to && text[i] != '\n') i++;
                continue;
            }

            if (text[i] == '/' && i + 1 < to && text[i + 1] == '*')
            {
                var end = text.IndexOf("*/", i, StringComparison.Ordinal);
                i = end < 0 ? to : end + 2;
                continue;
            }

            break;
        }

        return i;
    }

    // The index of the bracket that closes the one at `open`.
    public static int MatchClose(string text, int open, int to)
    {
        var depth = 0;
        for (var i = open; i < to; i++)
        {
            var c = text[i];
            if (c == '"' || c == '\'')
            {
                i = SkipQuoted(text, i, to) - 1;
                continue;
            }

            if (c == '/' && i + 1 < to && text[i + 1] == '/')
            {
                while (i < to && text[i] != '\n') i++;
                continue;
            }

            if (c is '(' or '[' or '{') depth++;
            else if (c is ')' or ']' or '}')
            {
                depth--;
                if (depth == 0) return i;
            }
        }

        return to - 1;
    }

    // The argument spans between `open` and its closing bracket, each [Lo, Hi).
    public static List<(int Lo, int Hi)> SplitArgs(string text, int open, int close)
    {
        var args = new List<(int, int)>();
        var depth = 0;
        var start = open + 1;
        for (var i = open + 1; i < close; i++)
        {
            var c = text[i];
            if (c == '"' || c == '\'')
            {
                i = SkipQuoted(text, i, close) - 1;
                continue;
            }

            if (c == '/' && i + 1 < close && text[i + 1] == '/')
            {
                while (i < close && text[i] != '\n') i++;
                i--;
                continue;
            }

            if (c is '(' or '[' or '{') depth++;
            else if (c is ')' or ']' or '}') depth--;
            else if (c == ',' && depth == 0)
            {
                args.Add((start, i));
                start = i + 1;
            }
        }

        if (start < close) args.Add((start, close));
        return args;
    }
}

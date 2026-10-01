import { useEffect, useState } from "react";
import type { ThemeName } from "../theme";

interface Props {
  /** The markup a chart builder returned. */
  svg: string;
  className?: string;
}

/**
 * A chart, shown the way a Power Apps Image control shows one: an SVG string in a data URI, sized to
 * its box. The picture says nothing to a screen reader, so every caller puts an sr-only table or
 * sentence beside it.
 */
export default function SvgImage({ svg, className }: Props) {
  return (
    <img
      className={className}
      alt=""
      src={"data:image/svg+xml;utf8," + encodeURIComponent(svg)}
    />
  );
}

/** The theme and mode on <html>, as one string, so a change in either redraws the chart. */
const readLook = (): string => {
  const root = document.documentElement;
  return (root.getAttribute("data-theme") ?? "light") + "/" + (root.getAttribute("data-mode") ?? "");
};

/** The theme on <html data-theme>, kept in step with it so a chart is drawn in its colours. */
export function useTheme(): ThemeName {
  const [look, setLook] = useState(readLook);

  useEffect(() => {
    const observer = new MutationObserver(() => setLook(readLook()));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme", "data-mode"],
    });
    setLook(readLook());
    return () => observer.disconnect();
  }, []);

  return look.startsWith("dark") ? "dark" : "light";
}

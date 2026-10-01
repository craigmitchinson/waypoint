import { useEffect, useLayoutEffect, useState } from "react";
import { BrowserRouter, Navigate, NavLink, Route, Routes, useParams } from "react-router-dom";
import {
  CalendarRange,
  ClipboardList,
  Coins,
  Download,
  Flag,
  LayoutDashboard,
  Menu,
  Moon,
  PanelLeftClose,
  Settings2,
  Signpost,
  Sun,
  Target,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Command from "./pages/Command";
import Work from "./pages/Work";
import WorkItem, { workPath } from "./pages/WorkItem";
import Timeline from "./pages/Timeline";
import Team from "./pages/Team";
import Benefits from "./pages/Benefits";
import Financials from "./pages/Financials";
import QuarterClose from "./pages/QuarterClose";
import Import from "./pages/Import";
import Journey from "./sections/journey/Journey";
import Settings from "./pages/Settings";
import { AppHeader } from "./ui";
import { applyMode, applyTheme, storedMode, storedTheme } from "./theme";
import type { ModeName, ThemeName } from "./theme";

interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
  end?: boolean;
}

const NAV: { group: string; items: NavItem[] }[] = [
  { group: "Overview", items: [{ to: "/", label: "Command", icon: LayoutDashboard, end: true }] },
  {
    group: "Plan",
    items: [
      { to: "/work", label: "Work", icon: ClipboardList },
      { to: "/timeline", label: "Timeline", icon: CalendarRange },
      { to: "/journey", label: "Journey", icon: Signpost },
    ],
  },
  {
    group: "People",
    items: [
      { to: "/team", label: "Team", icon: Users },
      { to: "/import", label: "Import", icon: Download },
    ],
  },
  {
    group: "Measure",
    items: [
      { to: "/benefits", label: "Benefits", icon: Target },
      { to: "/financials", label: "Financials", icon: Coins },
      { to: "/quarter-close", label: "Quarter close", icon: Flag },
    ],
  },
];

/** An old /plan/:title bookmark, sent on to the same item under /work. */
function OldItem() {
  const { title = "" } = useParams();
  return <Navigate to={workPath(title)} replace />;
}

/** The Power Apps canvas is a fixed logical size, scaled to fit the viewport. */
const CANVAS = { w: 1600, h: 900 };

/** Below this the Studio rail collapses itself, so the content keeps its room. */
const NARROW = 1020;

/** Where the collapsed rail is remembered between visits. */
const NAV_KEY = "waypoint-nav";

function storedNav(): boolean {
  try {
    return window.localStorage.getItem(NAV_KEY) === "collapsed";
  } catch {
    return false;
  }
}

/** How far the canvas has to shrink to sit inside the viewport. */
function useFit(): number {
  const [scale, setScale] = useState(1);
  useLayoutEffect(() => {
    const recompute = () =>
      setScale(
        Math.min(1, (window.innerWidth - 32) / CANVAS.w, (window.innerHeight - 32) / CANVAS.h),
      );
    recompute();
    window.addEventListener("resize", recompute);
    return () => window.removeEventListener("resize", recompute);
  }, []);
  return scale;
}

export default function App() {
  const [theme, setTheme] = useState<ThemeName>(storedTheme);
  const [mode, setMode] = useState<ModeName>(storedMode);
  const [collapsed, setCollapsed] = useState<boolean>(storedNav);
  const scale = useFit();

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    applyMode(mode);
  }, [mode]);

  useEffect(() => {
    try {
      window.localStorage.setItem(NAV_KEY, collapsed ? "collapsed" : "expanded");
    } catch {
      // A blocked localStorage only costs us the memory, not the rail.
    }
  }, [collapsed]);

  // Studio has no canvas to hold the rail's width, so it folds it on narrow viewports.
  useEffect(() => {
    if (mode !== "studio") return;
    const fold = () => {
      if (window.innerWidth < NARROW) setCollapsed(true);
    };
    fold();
    window.addEventListener("resize", fold);
    return () => window.removeEventListener("resize", fold);
  }, [mode]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");
  const toggleMode = () => setMode(mode === "power" ? "studio" : "power");

  const shell = (
    <div className={"wp-shell" + (collapsed ? " is-collapsed" : "")}>
      <nav className="wp-rail ccs-glass-rail ccs-on-brand" aria-label="Sections">
        <div className="wp-rail__head">
          <button
            type="button"
            className="wp-nav-toggle"
            aria-expanded={!collapsed}
            aria-controls="wp-nav"
            aria-label={collapsed ? "Expand navigation" : "Collapse navigation"}
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <Menu size={16} aria-hidden="true" /> : <PanelLeftClose size={16} aria-hidden="true" />}
          </button>
          {collapsed ? (
            <p className="wp-monogram" aria-hidden="true">W<span className="wp-wordmark__stop">.</span></p>
          ) : (
            <div className="wp-rail__identity">
              <p className="wp-wordmark">Waypoint<span className="wp-wordmark__stop">.</span></p>
              <p className="wp-kicker">Intelligent Process Automation</p>
            </div>
          )}
        </div>
        <div className="wp-nav" id="wp-nav">
          {NAV.map((group) => (
            <div className="wp-nav__group" key={group.group}>
              <p className="wp-nav__group-label">{group.group}</p>
              {group.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className="wp-nav__link"
                  title={collapsed ? item.label : undefined}
                >
                  <item.icon size={collapsed ? 20 : 16} aria-hidden="true" />
                  <span className="wp-nav__label">{item.label}</span>
                </NavLink>
              ))}
            </div>
          ))}
        </div>
        <div className="wp-rail__foot">
          <NavLink to="/settings" className="wp-nav__link" title={collapsed ? "Settings" : undefined}>
            <Settings2 size={collapsed ? 20 : 16} aria-hidden="true" />
            <span className="wp-nav__label">Settings</span>
          </NavLink>
          <button type="button" className="wp-theme-toggle" onClick={toggleTheme}>
            {theme === "light" ? <Moon size={15} aria-hidden="true" /> : <Sun size={15} aria-hidden="true" />}
            <span className="wp-nav__label">{theme === "light" ? "Dark theme" : "Light theme"}</span>
          </button>
          <button type="button" className="wp-theme-toggle" onClick={toggleMode}>
            <LayoutDashboard size={15} aria-hidden="true" />
            <span className="wp-nav__label">{mode === "power" ? "Studio" : "Power Apps preview"}</span>
          </button>
        </div>
      </nav>
      <main className="wp-main" id="main">
        <Routes>
          <Route path="/" element={<Command />} />
          <Route path="/work" element={<Work />} />
          <Route path="/work/:title" element={<WorkItem />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/journey" element={<Journey />} />
          <Route path="/team" element={<Team />} />
          <Route path="/benefits" element={<Benefits />} />
          <Route path="/financials" element={<Financials />} />
          <Route path="/quarter-close" element={<QuarterClose />} />
          <Route path="/import" element={<Import />} />
          <Route path="/settings" element={<Settings />} />
          {/* The paths these pages used to sit at, so an old bookmark still lands. */}
          <Route path="/plan" element={<Navigate to="/work" replace />} />
          <Route path="/plan/:title" element={<OldItem />} />
          <Route path="/value" element={<Navigate to="/benefits" replace />} />
          <Route path="/money" element={<Navigate to="/financials" replace />} />
          <Route path="/close" element={<Navigate to="/quarter-close" replace />} />
        </Routes>
      </main>
    </div>
  );

  return (
    <BrowserRouter>
      <a className="ccs-skip-link" href="#main">Skip to content</a>
      {mode === "power" ? (
        <div className="pa-stage">
          <div className="pa-fit" style={{ width: CANVAS.w * scale, height: CANVAS.h * scale }}>
            <div
              className="pa-canvas"
              style={{
                width: CANVAS.w,
                height: CANVAS.h,
                transform: `scale(${scale})`,
                transformOrigin: "top left",
              }}
            >
              <AppHeader />
              {shell}
            </div>
          </div>
        </div>
      ) : (
        shell
      )}
    </BrowserRouter>
  );
}

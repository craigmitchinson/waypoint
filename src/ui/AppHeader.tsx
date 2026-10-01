// The app bar across the top of the Power Apps canvas: identity, environment,
// search and account. It carries no h1: the view underneath owns that.
import { Search, Settings } from "lucide-react";
import Avatar from "./Avatar";
import Pill from "./Pill";

export default function AppHeader() {
  return (
    <header className="pa-header">
      <span className="pa-header__icon" aria-hidden="true">W</span>
      <span className="pa-header__title" aria-label="Waypoint">Waypoint</span>
      <Pill tone="neutral">Dev</Pill>
      <div className="pa-header__search">
        <Search size={14} aria-hidden="true" />
        <input type="search" placeholder="Search" aria-label="Search" />
      </div>
      <button type="button" className="pa-header__btn" aria-label="Settings">
        <Settings size={16} aria-hidden="true" />
      </button>
      <Avatar name="Craig Morgan" />
    </header>
  );
}

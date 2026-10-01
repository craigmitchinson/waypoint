import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "@ccs/ui/tokens.css";
import "@ccs/ui/fonts.css";
import "./index.css";
import "./skins/power.css";

createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

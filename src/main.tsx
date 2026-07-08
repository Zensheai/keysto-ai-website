import "./styles/theme.css";
import "./styles/site.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const container = document.getElementById("root")!;
const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Pages are pre-rendered at build time (scripts/prerender.mjs), so hydrate the
// existing HTML. Fall back to a fresh render in dev, where the root is empty.
if (container.hasChildNodes()) {
  ReactDOM.hydrateRoot(container, app);
} else {
  ReactDOM.createRoot(container).render(app);
}

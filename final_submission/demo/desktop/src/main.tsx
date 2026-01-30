import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import HelloWorld from "./HelloWorld";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <HelloWorld />
  </React.StrictMode>,
);

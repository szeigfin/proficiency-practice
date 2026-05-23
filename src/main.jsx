import React from "react";
import ReactDOM from "react-dom/client";

function App() {
  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>Proficiency Practice Lab</h1>

      <p>
        Spanish 1 vocabulary practice inspired by NSE and AAPPL-style learning.
      </p>

      <h2>Level 1 Adjectives</h2>

      <ul>
        <li>alto — tall</li>
        <li>bajo — short</li>
        <li>simpático — nice</li>
        <li>trabajador — hardworking</li>
      </ul>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

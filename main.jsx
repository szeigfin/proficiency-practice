import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";

const units = [
  {
    title: "Level 1 Adjectives",
    words: [
      ["alto", "tall"],
      ["bajo", "short"],
      ["simpático", "nice"],
      ["trabajador", "hardworking"],
      ["interesante", "interesting"],
      ["aburrido", "boring"],
      ["fácil", "easy"],
      ["difícil", "difficult"]
    ],
  },
  {
    title: "Level 1 Places",
    words: [
      ["la escuela", "school"],
      ["la clase", "class"],
      ["la casa", "house"],
      ["el parque", "park"],
      ["la biblioteca", "library"],
      ["el restaurante", "restaurant"],
      ["la tienda", "store"],
      ["el cine", "movie theater"]
    ],
  },
  {
    title: "Level 1 Food",
    words: [
      ["el agua", "water"],
      ["el pan", "bread"],
      ["el arroz", "rice"],
      ["la fruta", "fruit"],
      ["la manzana", "apple"],
      ["el queso", "cheese"],
      ["el pollo", "chicken"],
      ["la ensalada", "salad"]
    ],
  },
];

function App() {
  const [selected, setSelected] = useState(units[0]);

  return (
    <div>
      <div className="header">Proficiency Practice Lab</div>
      <main className="container">
        <section className="card">
          <h1>Spanish 1 Skill Builder</h1>
          <p>Vocabulary-building practice inspired by NSE-style topic modules and future AAPPL-style proficiency tasks.</p>
        </section>

        <section className="grid">
          {units.map((unit) => (
            <article className="card" key={unit.title}>
              <h2>{unit.title}</h2>
              <button onClick={() => setSelected(unit)}>Open</button>
            </article>
          ))}
        </section>

        <section className="card">
          <h2>{selected.title}</h2>
          <div className="grid">
            {selected.words.map(([es, en]) => (
              <div className="word" key={es}>
                <strong>{es}</strong>
                <div>{en}</div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

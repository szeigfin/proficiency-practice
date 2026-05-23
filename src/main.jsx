import React, { useMemo, useState } from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";

const units = [
  {
    id: "food",
    title: "Level 1 Food",
    icon: "🍎",
    description: "Food, drinks, and basic meal words",
    words: [
      { es: "el agua", en: "water", icon: "💧" },
      { es: "el pan", en: "bread", icon: "🥖" },
      { es: "la manzana", en: "apple", icon: "🍎" },
      { es: "el queso", en: "cheese", icon: "🧀" },
      { es: "el pollo", en: "chicken", icon: "🍗" }
    ]
  },
  {
    id: "places",
    title: "Level 1 Places",
    icon: "🏫",
    description: "School, city, and familiar locations",
    words: [
      { es: "la escuela", en: "school", icon: "🏫" },
      { es: "la casa", en: "house", icon: "🏠" },
      { es: "el parque", en: "park", icon: "🌳" },
      { es: "la biblioteca", en: "library", icon: "📚" },
      { es: "el restaurante", en: "restaurant", icon: "🍽️" }
    ]
  },
  {
    id: "adjectives",
    title: "Level 1 Adjectives",
    icon: "✨",
    description: "Words to describe people and things",
    words: [
      { es: "alto", en: "tall", icon: "📏" },
      { es: "bajo", en: "short", icon: "↘️" },
      { es: "simpático", en: "nice", icon: "😊" },
      { es: "trabajador", en: "hardworking", icon: "💪" },
      { es: "interesante", en: "interesting", icon: "🤔" }
    ]
  }
];

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function App() {
  const [unitId, setUnitId] = useState("food");
  const [mode, setMode] = useState("study");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);

  const unit = units.find((u) => u.id === unitId);

  const question = useMemo(() => {
    const correct = unit.words[questionIndex % unit.words.length];
    const wrong = shuffle(unit.words.filter((w) => w.en !== correct.en))
      .slice(0, 3)
      .map((w) => w.en);

    return {
      prompt: correct.es,
      icon: correct.icon,
      answer: correct.en,
      options: shuffle([correct.en, ...wrong])
    };
  }, [unit, questionIndex]);

  function choose(option) {
    if (answered) return;
    setAnswer(option);
    setAnswered(true);
    if (option === question.answer) setScore(score + 1);
  }

  function next() {
    setQuestionIndex(questionIndex + 1);
    setAnswer("");
    setAnswered(false);
  }

  function reset(newUnitId) {
    setUnitId(newUnitId);
    setQuestionIndex(0);
    setAnswer("");
    setAnswered(false);
    setScore(0);
    setMode("study");
  }

  return (
    <div className="app">
      <header className="hero">
        <div className="hero-badge">Spanish 1</div>
        <h1>Proficiency Practice Lab</h1>
        <p>Build vocabulary first. Use it in real communication next.</p>
      </header>

      <main className="layout">
        <section className="topics">
          {units.map((u) => (
            <button
              key={u.id}
              className={`topic-card ${u.id === unitId ? "active" : ""}`}
              onClick={() => reset(u.id)}
            >
              <div className="topic-icon">{u.icon}</div>
              <h2>{u.title}</h2>
              <p>{u.description}</p>
            </button>
          ))}
        </section>

        <section className="practice-panel">
          <div className="panel-header">
            <div>
              <h2>{unit.title}</h2>
              <p>{unit.description}</p>
            </div>

            <div className="tabs">
              <button className={mode === "study" ? "tab active" : "tab"} onClick={() => setMode("study")}>
                Study
              </button>
              <button className={mode === "quiz" ? "tab active" : "tab"} onClick={() => setMode("quiz")}>
                Quiz
              </button>
            </div>
          </div>

          {mode === "study" && (
            <div className="word-grid">
              {unit.words.map((word) => (
                <div className="word-card" key={word.es}>
                  <div className="word-icon">{word.icon}</div>
                  <div className="spanish">{word.es}</div>
                  <div className="english">{word.en}</div>
                </div>
              ))}
            </div>
          )}

          {mode === "quiz" && (
            <div className="quiz">
              <div className="score">Score: {score}/{questionIndex + (answered ? 1 : 0)}</div>
              <div className="quiz-icon">{question.icon}</div>
              <p className="quiz-label">Choose the best meaning:</p>
              <h2 className="quiz-prompt">{question.prompt}</h2>

              <div className="answers">
                {question.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => choose(option)}
                    className={
                      answered && option === question.answer
                        ? "answer correct"
                        : answered && option === answer
                        ? "answer wrong"
                        : "answer"
                    }
                  >
                    {option}
                  </button>
                ))}
              </div>

              {answered && (
                <div className="feedback">
                  <span>Correct answer: <strong>{question.answer}</strong></span>
                  <button onClick={next}>Next</button>
                </div>
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

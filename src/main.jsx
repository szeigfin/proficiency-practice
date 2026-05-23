import React, { useMemo, useState } from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";

const skillUnits = [
  {
    id: "adjectives",
    title: "Level 1 Adjectives",
    function: "Describe people, places, and things",
    grammar: ["ser", "estar", "adjective agreement"],
    words: [
      ["alto", "tall"],
      ["bajo", "short"],
      ["simpático", "nice"],
      ["trabajador", "hardworking"],
      ["interesante", "interesting"],
      ["aburrido", "boring"],
      ["difícil", "difficult"],
      ["fácil", "easy"],
      ["nuevo", "new"],
      ["viejo", "old"]
    ]
  },
  {
    id: "places",
    title: "Level 1 Places",
    function: "Talk about school, city, home, and familiar places",
    grammar: ["estar + location", "hay", "prepositions"],
    words: [
      ["la escuela", "school"],
      ["la clase", "class"],
      ["la casa", "house"],
      ["el parque", "park"],
      ["la biblioteca", "library"],
      ["el restaurante", "restaurant"],
      ["la tienda", "store"],
      ["el cine", "movie theater"],
      ["la ciudad", "city"],
      ["el baño", "bathroom"]
    ]
  },
  {
    id: "food",
    title: "Level 1 Food",
    function: "Express likes, dislikes, hunger, and food choices",
    grammar: ["gustar", "tener hambre", "querer"],
    words: [
      ["el agua", "water"],
      ["la leche", "milk"],
      ["el pan", "bread"],
      ["el arroz", "rice"],
      ["la fruta", "fruit"],
      ["la manzana", "apple"],
      ["el queso", "cheese"],
      ["la sopa", "soup"],
      ["el pollo", "chicken"],
      ["la ensalada", "salad"]
    ]
  },
  {
    id: "classroom",
    title: "Level 1 Classroom",
    function: "Understand classroom language and school objects",
    grammar: ["articles", "tener", "necesitar"],
    words: [
      ["el lápiz", "pencil"],
      ["el bolígrafo", "pen"],
      ["el cuaderno", "notebook"],
      ["la mochila", "backpack"],
      ["la computadora", "computer"],
      ["la mesa", "table"],
      ["la silla", "chair"],
      ["la puerta", "door"],
      ["la ventana", "window"],
      ["el libro", "book"]
    ]
  },
  {
    id: "weather",
    title: "Level 1 Weather",
    function: "Describe the weather and environment",
    grammar: ["hace", "está", "hay"],
    words: [
      ["hace sol", "it is sunny"],
      ["hace frío", "it is cold"],
      ["hace calor", "it is hot"],
      ["hace viento", "it is windy"],
      ["está lloviendo", "it is raining"],
      ["está nevando", "it is snowing"],
      ["está nublado", "it is cloudy"],
      ["la lluvia", "rain"],
      ["la nieve", "snow"],
      ["el cielo", "sky"]
    ]
  }
];

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function App() {
  const [selectedId, setSelectedId] = useState("adjectives");
  const [mode, setMode] = useState("study");
  const [questionNumber, setQuestionNumber] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);

  const selectedUnit = skillUnits.find((unit) => unit.id === selectedId);

  const question = useMemo(() => {
    const correct = selectedUnit.words[questionNumber % selectedUnit.words.length];
    const wrong = shuffle(selectedUnit.words.filter((word) => word[1] !== correct[1]))
      .slice(0, 3)
      .map((word) => word[1]);

    return {
      prompt: correct[0],
      answer: correct[1],
      options: shuffle([correct[1], ...wrong])
    };
  }, [selectedUnit, questionNumber]);

  function resetQuiz() {
    setQuestionNumber(0);
    setScore(0);
    setSelectedAnswer("");
    setAnswered(false);
  }

  function chooseAnswer(option) {
    if (answered) return;

    setSelectedAnswer(option);
    setAnswered(true);

    if (option === question.answer) {
      setScore(score + 1);
    }
  }

  function nextQuestion() {
    setQuestionNumber(questionNumber + 1);
    setSelectedAnswer("");
    setAnswered(false);
  }

  return (
    <div>
      <header className="site-header">
        <h1>Proficiency Practice Lab</h1>
        <p>Spanish 1 Skill Builder</p>
      </header>

      <main className="container">
        <section className="hero card">
          <h2>Build the words first. Use them in real communication next.</h2>
          <p>
            This first layer is old NSE-style topic practice: fast vocabulary review by level and category.
          </p>
        </section>

        <section className="grid">
          {skillUnits.map((unit) => (
            <button
              key={unit.id}
              className={`card topic-card ${unit.id === selectedId ? "selected" : ""}`}
              onClick={() => {
                setSelectedId(unit.id);
                resetQuiz();
              }}
            >
              <h3>{unit.title}</h3>
              <p>{unit.function}</p>
              <small>{unit.grammar.join(" • ")}</small>
            </button>
          ))}
        </section>

        <section className="card">
          <div className="unit-header">
            <div>
              <h2>{selectedUnit.title}</h2>
              <p>{selectedUnit.function}</p>
            </div>

            <div className="button-row">
              <button className={mode === "study" ? "button" : "button light"} onClick={() => setMode("study")}>
                Study
              </button>
              <button className={mode === "quiz" ? "button" : "button light"} onClick={() => setMode("quiz")}>
                Quiz
              </button>
            </div>
          </div>

          {mode === "study" && (
            <div className="word-grid">
              {selectedUnit.words.map(([spanish, english]) => (
                <div className="word-card" key={spanish}>
                  <strong>{spanish}</strong>
                  <span>{english}</span>
                </div>
              ))}
            </div>
          )}

          {mode === "quiz" && (
            <div className="quiz-box">
              <div className="score">Score: {score}/{questionNumber + (answered ? 1 : 0)}</div>

              <p className="label">Choose the best meaning:</p>
              <h2 className="prompt">{question.prompt}</h2>

              <div className="answer-grid">
                {question.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => chooseAnswer(option)}
                    className={
                      answered && option === question.answer
                        ? "answer correct"
                        : answered && option === selectedAnswer
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
                  <strong>Correct answer:</strong> {question.answer}
                  <button className="button" onClick={nextQuestion}>Next</button>
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

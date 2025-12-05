import React, { useState } from "react";
import logo from "./file-search-corner.svg";
import "./App.css";

function App() {
  const [articleText, setArticleText] = useState("");
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleAnalyze = async () => {
    console.log("BUTTON CLICKED, sending:", articleText);
    try {
      const response = await fetch("http://127.0.0.1:5000/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: articleText }),
      });

      const result = await response.json();
      console.log("Fetch result: ", result);
      setAnalysisResult(result.prediction);
      /*
      if (result.prediction !== undefined) {
        setAnalysisResult(result.prediction); //actually sets instead of just logging result
      } else {
        alert("Error: " + result.error);
      }*/
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="App">
      <header
        className="App-header"
        style={{
          background: "linear-gradient(90deg, #1CB5E0 0%, #000851 100%)",
        }}
      >
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="title">Welcome to the Misinformation Detector!</h1>
        <p className="subtitle">Paste an article below to check its credibility!</p>

        <textarea
          className="article"
          placeholder="Paste article here..."
          value={articleText}
          onChange={(e) => setArticleText(e.target.value)}
        />

        <button
          className="check-btn"
          onClick={handleAnalyze}
          aria-label="Run credibility check"
        >
          Run Check
        </button>

        {analysisResult && ( //adds new textblock if result is true
          <div style={{ marginTop: "20px", textAlign: "left", width: "100%" }}>
            <h3>Analysis Result:</h3>
            <pre>{JSON.stringify(analysisResult, null, 2)}</pre>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
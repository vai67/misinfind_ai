import React, { useState } from "react";
import logo from "./logo2.png";
import "./App.css";

function App() {
  const [articleText, setArticleText] = useState("");
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleAnalyze = async () => {
    try {
      const response = await fetch("http://localhost:5000/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: articleText }),
      });

      const result = await response.json();
      if (result.success) {
        setAnalysisResult(result.result); //actually sets instead of just logging result
      } else {
        alert("Error: " + result.error);
      }
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
        <h1>Welcome to the Misinformation Detector</h1>
        <p>Paste article below to check its credibility!</p>

        <textarea
          placeholder="Paste article here..."
          style={{ width: "100%", height: "100px", marginTop: "20px" }}
          value={articleText}
          onChange={(e) => setArticleText(e.target.value)}
        />

        <button
          onClick={handleAnalyze}
          aria-label="Run credibility check"
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#61dafb",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Run Check
        </button>

        {analysisResult && ( //adds new textblock if result is true
          <div style={{ marginTop: "20px", textAlign: "left", width: "100%" }}>
            <h3>Analysis Result:</h3>
            <pre>{JSON.stringify(analysisResult, null, 2)}</pre>
          </div>
        )}

        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
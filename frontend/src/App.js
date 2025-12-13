import { useState } from 'react';
import logo from './logo.svg';
import './App.css';


function ConfidenceMeter({ confidence }) {
  // confidence = number between 0 and 1
  const percent = Math.round(confidence * 100);

  let barColor = "#f1c40f";
  if (percent > 70) barColor = "#2ecc71"; // green
  if (percent < 40) barColor = "#e74c3c"; // red

  return (
    <div style={{ width: "60%", marginTop: "20px" }}>
      <p style={{ marginBottom: "6px", fontWeight: "bold" }}>
        Confidence: {percent}%
      </p>

      <div
        style={{
          height: "20px",
          width: "100%",
          backgroundColor: "#eee",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${percent}%`,
            backgroundColor: barColor,
            transition: "width 0.4s ease",
          }}
        ></div>
      </div>
    </div>
  );
}

function App() {
  const [analysisResult, setAnalysisResult] = useState(null);

  function handleAnalyze() {

    setAnalysisResult({
      label: "temporary",
      confidence: 0.82
    });
  }
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
        {analysisResult && (
          <div style={{ marginTop: "20px", textAlign: "left", width: "100%" }}>
            <h3>Analysis Result:</h3>

            <pre>{JSON.stringify(analysisResult, null, 2)}</pre>

            {analysisResult.confidence !== undefined && (
              <ConfidenceMeter confidence={analysisResult.confidence} />
            )}
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
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
  return (
    <div className="App">
      <header className="App-header"
        style={{ background: 'linear-gradient(90deg, #1CB5E0 0%, #000851 100%)' }}
      >
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Welcome to the Misinformation Detector</h1>
        <p> Paste article below to check its credibilty!</p>
        
        <input
          type="text"
          placeholder="Paste article here..."
          style={{ width: '60%', height: '100px', marginTop: '20px' }}
        />



                <button
          onClick={handleAnalyze}
          aria-label="Run credibility check"
          style={{
            marginTop: "20px",
            padding: "12px 24px",
            fontSize: "16px",
            backgroundColor: "#61dafb",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Run Check
        </button>

            {analysisResult && (
      <div style={{ marginTop: "20px" }}>
        <h3>Analysis Result:</h3>
        <pre>{JSON.stringify(analysisResult, null, 2)}</pre>

        {/* Confidence Meter */}
        <ConfidenceMeter confidence={analysisResult.confidence} />
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
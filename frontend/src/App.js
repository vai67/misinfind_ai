import logo from './logo2.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header" style={{ textAlign: 'center' }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: '0px', width: 'fit-content', textAlign: 'center'
        }}>
          <img src={logo} className="App-logo" alt="logo"
            style={{
              position: 'absolute',
              left: '10px',
              top: '-3%',
              transform: 'translateY(-50%)',
              width: 420,
              height: 420
            }}
          />
          <h1 style={{ width: 600, marginLeft: 0 }}>Welcome to the Misinformation Detector</h1>
        </div>

        <p> Paste article below to check its credibilty!</p>

        <input
          type="text"
          placeholder="Paste article here..."
          style={{ width: '100%', height: '100px', marginTop: '20px' }}
        />

        <button
          style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px', backgroundColor: '#61dafb', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
        ></button>

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

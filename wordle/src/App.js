import Wordle from "./components/game/Wordle.js"
import Optimizer from "./components/optimizer/Optimizer.js";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Wordle Optimizer</h1>
      </header>
      <div className="App-containers">
        <div className="App-container">
          <Wordle />
        </div>
        <div className="App-container">
          <Optimizer />
        </div>
      </div>
    </div>
  );
}

export default App;

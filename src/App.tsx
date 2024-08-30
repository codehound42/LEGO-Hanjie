import React from "react";
import "./App.css";
import Grid from "./create-grid/Grid";

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Grid App</h1>
      </header>
      <Grid />
    </div>
  );
};

export default App;

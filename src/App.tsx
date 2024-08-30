import React from "react";
import "./App.css";
import Grid from "./create-grid/Grid";

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Hanjie Generator</h1>
        <p>
          This application provides a fun tool to create Hanjie puzzles, also
          known as nonograms or picross. 🧩✨
          <br />
          Use the left mouse button to draw and fill in cells, and the right
          mouse button to erase and remove color.
          <br />
          Once you're satisfied with your masterpiece 🎨🖌️, press "Done" and
          take a snapshot to print. 📸🖨️
        </p>
      </header>
      <Grid />
    </div>
  );
};

export default App;

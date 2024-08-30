import React, { useState, useEffect } from "react";
import "./Grid.css";

interface Cell {
  id: number;
  color: string;
}

// Define color constants
const EMPTY_COLOR = "white";
const FILLED_COLOR = "#90AFC5";

const Grid: React.FC = () => {
  const [width, setWidth] = useState<number>(15);
  const [height, setHeight] = useState<number>(15);
  const [cells, setCells] = useState<Cell[]>([]);

  useEffect(() => {
    initializeGrid(width, height);
  }, [width, height]);

  const initializeGrid = (width: number, height: number) => {
    const newCells: Cell[] = [];
    for (let i = 0; i < width * height; i++) {
      newCells.push({ id: i, color: EMPTY_COLOR });
    }
    setCells(newCells);
  };

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newWidth = parseInt(e.target.value) || 0;
    setWidth(newWidth);
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHeight = parseInt(e.target.value) || 0;
    setHeight(newHeight);
  };

  const handleCellClick = (id: number) => {
    setCells(
      cells.map((cell) =>
        cell.id === id
          ? {
              ...cell,
              color: cell.color === EMPTY_COLOR ? FILLED_COLOR : EMPTY_COLOR,
            }
          : cell
      )
    );
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset?")) {
      setCells(cells.map((cell) => ({ ...cell, color: EMPTY_COLOR })));
    }
  };

  const handleInvert = () => {
    setCells(
      cells.map((cell) => ({
        ...cell,
        color: cell.color === EMPTY_COLOR ? FILLED_COLOR : EMPTY_COLOR,
      }))
    );
  };

  const handleRandom = () => {
    setCells(
      cells.map((cell) => ({
        ...cell,
        color: Math.random() < 0.55 ? FILLED_COLOR : EMPTY_COLOR,
      }))
    );
  };

  const handleDone = () => {
    // Implement the logic for finalizing the grid
    // This could involve generating a new table or other actions as needed
    // For now, we'll just log the current state
    console.log("Grid finalized:", cells);
  };

  return (
    <div className="grid-container">
      <div className="input-container">
        <label>
          Width:
          <input type="number" value={width} onChange={handleWidthChange} />
        </label>
        <label>
          Height:
          <input type="number" value={height} onChange={handleHeightChange} />
        </label>
        <div className="button-container">
          <button onClick={handleReset}>Reset</button>
          <button onClick={handleInvert}>Invert</button>
          <button onClick={handleRandom}>Scramble</button>
          <button onClick={handleDone}>Done</button>
        </div>
      </div>
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${width}, 30px)`,
          gridTemplateRows: `repeat(${height}, 30px)`,
        }}
      >
        {cells.map((cell) => (
          <div
            key={cell.id}
            className="cell"
            style={{ backgroundColor: cell.color }}
            onClick={() => handleCellClick(cell.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Grid;

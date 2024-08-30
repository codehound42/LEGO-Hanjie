import React, { useState, useEffect } from "react";
import "./Grid.css";

interface Cell {
  id: number;
  color: string;
}

const Grid: React.FC = () => {
  const [width, setWidth] = useState<number>(5);
  const [height, setHeight] = useState<number>(5);
  const [cells, setCells] = useState<Cell[]>([]);

  useEffect(() => {
    initializeGrid(width, height);
  }, [width, height]);

  const initializeGrid = (width: number, height: number) => {
    const newCells: Cell[] = [];
    for (let i = 0; i < width * height; i++) {
      newCells.push({ id: i, color: "white" });
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
          ? { ...cell, color: cell.color === "white" ? "blue" : "white" }
          : cell
      )
    );
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
      </div>
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${width}, 20px)`,
          gridTemplateRows: `repeat(${height}, 20px)`,
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

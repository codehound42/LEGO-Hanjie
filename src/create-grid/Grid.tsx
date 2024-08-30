import React, { useState, useEffect } from "react";
import "./Grid.css";

interface Cell {
  id: number;
  color: string;
}

// Define color constants
const EMPTY_COLOR = "white";
const FILLED_COLOR = "#90AFC5";

// Define cell size constant
const CELL_SIZE = "30px";

const Grid: React.FC = () => {
  const [width, setWidth] = useState<number>(15);
  const [height, setHeight] = useState<number>(15);
  const [cells, setCells] = useState<Cell[]>([]);
  const [finalGrid, setFinalGrid] = useState<JSX.Element | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragColor, setDragColor] = useState<string>(EMPTY_COLOR);

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

  const handleMouseDown = (id: number, button: number) => {
    let newColor;
    if (button === 0) {
      // Left click
      newColor = FILLED_COLOR;
    } else if (button === 2) {
      // Right click
      newColor = EMPTY_COLOR;
    } else {
      return;
    }

    setIsDragging(true);
    setDragColor(newColor);
    setCells(
      cells.map((cell) =>
        cell.id === id
          ? {
              ...cell,
              color: newColor,
            }
          : cell
      )
    );
  };

  const handleMouseEnter = (id: number) => {
    if (isDragging) {
      setCells(
        cells.map((cell) =>
          cell.id === id
            ? {
                ...cell,
                color: dragColor,
              }
            : cell
        )
      );
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
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
    const rows: number[][] = [];
    const cols: number[][] = [];

    // Calculate row numbers
    for (let y = 0; y < height; y++) {
      rows[y] = [];
      let p = 0;
      let enc = false;
      for (let x = 0; x < width; x++) {
        const pos = y * width + x;
        if (cells[pos].color === FILLED_COLOR) {
          if (rows[y][p] === undefined) {
            rows[y][p] = 1;
            enc = true;
          } else {
            rows[y][p]++;
          }
        } else if (enc) {
          p++;
          enc = false;
        }
      }
    }

    // Calculate column numbers
    for (let x = 0; x < width; x++) {
      cols[x] = [];
      let p = 0;
      let enc = false;
      for (let y = 0; y < height; y++) {
        const pos = y * width + x;
        if (cells[pos].color === FILLED_COLOR) {
          if (cols[x][p] === undefined) {
            cols[x][p] = 1;
            enc = true;
          } else {
            cols[x][p]++;
          }
        } else if (enc) {
          p++;
          enc = false;
        }
      }
    }

    // Calculate the width of the left column based on the longest number sequence
    const leftColumnWidth =
      Math.max(...rows.map((row) => row.join(" ").length)) * 10 + 20;

    // Generate the final table
    const table = (
      <table border={1}>
        <thead>
          <tr>
            <th style={{ width: `${leftColumnWidth}px` }}></th>
            {cols.map((col, x) => (
              <th
                key={x}
                style={x % 5 === 0 ? { borderLeft: "2px solid #000000" } : {}}
              >
                {col.map((num, i) => (
                  <div key={i}>{num}</div>
                ))}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, y) => (
            <tr key={y}>
              <th
                style={
                  y % 5 === 0
                    ? {
                        borderTop: "2px solid #000000",
                        textAlign: "right",
                        width: `${leftColumnWidth}px`,
                      }
                    : { textAlign: "right", width: `${leftColumnWidth}px` }
                }
              >
                {row.join(" ")}
              </th>
              {Array.from({ length: width }).map((_, x) => (
                <td
                  key={x}
                  style={{
                    borderLeft:
                      x % 5 === 0 && x !== 0 ? "2px solid #000000" : "",
                    borderTop:
                      y % 5 === 0 && y !== 0 ? "2px solid #000000" : "",
                  }}
                ></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );

    setFinalGrid(table);
  };

  return (
    <div className="grid-container" onContextMenu={(e) => e.preventDefault()}>
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
        </div>
      </div>
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${width}, ${CELL_SIZE})`,
          gridTemplateRows: `repeat(${height}, ${CELL_SIZE})`,
        }}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp} // Ensure dragging stops when the mouse leaves the grid area
      >
        {cells.map((cell) => (
          <div
            key={cell.id}
            className="cell"
            style={{ backgroundColor: cell.color }}
            onMouseDown={(e) => handleMouseDown(cell.id, e.button)}
            onMouseEnter={() => handleMouseEnter(cell.id)}
          />
        ))}
      </div>
      <button onClick={handleDone}>Done</button>
      {finalGrid && <div className="final-grid">{finalGrid}</div>}
    </div>
  );
};

export default Grid;

import React, { useState, useEffect } from 'react';
import '../Styles/spinning-wheel.css';

const WordSearch = () => {
  const [grid, setGrid] = useState([]);
  const [selectedCells, setSelectedCells] = useState([]);
  const [foundWords, setFoundWords] = useState([]);
  const [timer, setTimer] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  
  const words = ['REACT', 'JAVASCRIPT', 'CSS', 'HTML', 'NODE', 'PYTHON', 'JAVA', 'RUBY'];
  const gridSize = 10;

  useEffect(() => {
    generateGrid();
  }, []);

  useEffect(() => {
    let interval = null;
    if (isTimerActive) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } else if (!isTimerActive && timer !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timer]);

  const generateGrid = () => {
    const newGrid = Array(gridSize).fill(null).map(() => Array(gridSize).fill(''));
    words.forEach((word) => placeWordInGrid(word, newGrid));
    fillEmptyCells(newGrid);
    setGrid(newGrid);
    setTimer(0);
    setIsTimerActive(true);
  };

  const placeWordInGrid = (word, grid) => {
    let placed = false;
    while (!placed) {
      const direction = Math.random() < 0.5 ? 'H' : 'V';
      const row = Math.floor(Math.random() * gridSize);
      const col = Math.floor(Math.random() * gridSize);
      if (canPlaceWord(word, row, col, direction, grid)) {
        for (let i = 0; i < word.length; i++) {
          if (direction === 'H') {
            grid[row][col + i] = word[i];
          } else {
            grid[row + i][col] = word[i];
          }
        }
        placed = true;
      }
    }
  };

  const canPlaceWord = (word, row, col, direction, grid) => {
    if (direction === 'H' && col + word.length > gridSize) return false;
    if (direction === 'V' && row + word.length > gridSize) return false;
    for (let i = 0; i < word.length; i++) {
      if (direction === 'H' && grid[row][col + i] !== '') return false;
      if (direction === 'V' && grid[row + i][col] !== '') return false;
    }
    return true;
  };

  const fillEmptyCells = (grid) => {
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        if (grid[row][col] === '') {
          grid[row][col] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        }
      }
    }
  };

  const handleCellClick = (row, col) => {
    if (selectedCells.some(cell => cell.row === row && cell.col === col)) {
      setSelectedCells(selectedCells.filter(cell => !(cell.row === row && cell.col === col)));
    } else {
      setSelectedCells([...selectedCells, { row, col }]);
    }
  };

  const checkWord = () => {
    const selectedWord = selectedCells.map(cell => grid[cell.row][cell.col]).join('');
    if (words.includes(selectedWord) && !foundWords.includes(selectedWord)) {
      setFoundWords([...foundWords, selectedWord]);
    }
    setSelectedCells([]);
  };

  return (
    <div className="word-search-game">
      <h2>Word Search Game</h2>
      <div className="timer">Time: {timer}s</div>
      <div className="grid">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="grid-row">
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className={`grid-cell ${selectedCells.some(c => c.row === rowIndex && c.col === colIndex) ? 'selected' : ''}`}
                onClick={() => handleCellClick(rowIndex, colIndex)}
              >
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
      <button onClick={checkWord} className="check-word-button">Check Word</button>
      <div className="found-words">
        <h3>Found Words:</h3>
        {foundWords.map((word, index) => (
          <p key={index}>{word}</p>
        ))}
      </div>
      {foundWords.length === words.length && <p className="congratulations">Congratulations! You found all the words!</p>}
    </div>
  );
};

export default WordSearch;

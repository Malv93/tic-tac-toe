import { useState } from "react";
import Board from "./board";
import calculateWinner from "../utilities/calculateWinner";

function Game(props) {
  const [gameStatus, setGameStatus] = useState({
    history: [
      {
        squares: Array(9).fill(null),
      },
    ],
    stepNumber: 0,
    xIsNext: true,
  });

  function handleClick(i) {
    const history = gameStatus.history.slice(0, gameStatus.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = gameStatus.xIsNext ? "X" : "O";
    setGameStatus({
      history: [
        ...history,
        {
          squares: squares,
        },
      ],
      stepNumber: history.length,
      xIsNext: !gameStatus.xIsNext,
    });
  }

  function jumpTo(step) {
    setGameStatus((prevValue) => {
      return { ...prevValue, stepNumber: step, xIsNext: step % 2 === 0 };
    });
  }

  const history = gameStatus.history;
  const current = history[gameStatus.stepNumber];
  const winner = calculateWinner(current.squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next Player: " + (gameStatus.xIsNext ? "X" : "O");
  }

  const moves = history.map((step, move) => {
    const desc = move ? "Go to move #" + move : "Go to game start";
    return (
      <li key={move} className="history-button">
        <button
          onClick={() => {
            jumpTo(move);
          }}
        >
          {desc}
        </button>
      </li>
    );
  });

  return (
    <main className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={(i) => handleClick(i)} />
      </div>
      <div className="game-info">
        <div>
          <h2>{status}</h2>
        </div>
        <ol>{moves}</ol>
      </div>
    </main>
  );
}

export default Game;

import { useState } from "react";
import Board from "./board";
import { CSSTransition } from "react-transition-group";
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
  const [showBoard, setShowBoard] = useState(true);

  const transitionTime = {
    board: 300,
  };

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
            setShowBoard(false);
            // Waiting for the exit animation
            //to be completed
            //Better to use async await
            //or to create an animation out-in
            setTimeout(() => {
              jumpTo(move);
              setShowBoard(true);
            }, transitionTime.board);
          }}
        >
          {desc}
        </button>
      </li>
    );
  });

  return (
    <main className="game">
      <CSSTransition
        in={showBoard}
        timeout={transitionTime.board}
        classNames="board"
      >
        <Board squares={current.squares} onClick={(i) => handleClick(i)} />
      </CSSTransition>
      <div className="game-info">
        <div>
          <h2 className="game-status">{status}</h2>
        </div>
        <ol className="history-list">{moves}</ol>
      </div>
    </main>
  );
}

export default Game;

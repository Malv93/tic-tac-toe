import { useState } from "react";
import Board from "./board";
import { CSSTransition, TransitionGroup } from "react-transition-group";
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
  //Board transition
  const [showBoard, setShowBoard] = useState(true);
  //Times of transitions
  const transitionTime = {
    board: 200,
    historyButton: 300,
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
      <CSSTransition
        key={move}
        timeout={transitionTime.historyButton}
        classNames="history-button"
      >
        <li key={move} className="history-button">
          <button
            onClick={() => {
              //trigger board exit transition
              setShowBoard(false);
              // Wait for the exit transition to complete
              setTimeout(() => {
                //change board #move
                jumpTo(move);
                //trigger board enter transition
                setShowBoard(true);
              }, transitionTime.board);
            }}
          >
            {desc}
          </button>
        </li>
      </CSSTransition>
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
        <ol className="history-list">
          <TransitionGroup>{moves}</TransitionGroup>
        </ol>
      </div>
    </main>
  );
}

export default Game;

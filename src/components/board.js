import Square from "./square";

function Board(props) {
  function renderSquare(i) {
    return (
      <Square
        key={i}
        value={props.squares[i]}
        onClick={() => props.onClick(i)}
      />
    );
  }

  // Create an array of squares
  var squares = [];
  for (let i = 0; i < 9; i++) {
    squares.push(renderSquare(i));
  }

  return <div className="board">{squares}</div>;
}

export default Board;

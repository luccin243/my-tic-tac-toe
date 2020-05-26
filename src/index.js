import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button
      className="square"
      onClick={() => props.onSquareClick()} >
      {props.output}
    </button>
  );
}

class Board extends React.Component {

  renderSquare(i) {
    return (
      <Square
        output={this.props.squares[i]}
        onSquareClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div className="squares">
        <h1 className="titre">TIC-TAC TOE</h1>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      unIsNext: true,
      status: `Start play now`,
      stepNumber: 0,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length -1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.unIsNext ? '🍎' : '🍏';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      unIsNext: !this.state.unIsNext,
      status: `Next player ${this.state.unIsNext ? '🍎' : '🍏'}`,
      stepNumber: history.length,
    });

  }

  jumpTo(step){
    this.setState({
      stepNumber: step,
      unIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    let status;

    const moves = history.map((step,move)=>{
      const desc = move ? `Revenir au tour n° ${move}` :
      `Revenir au début de la partie`;
      return (
        <li key={move}>
          <button onClick={()=>this.jumpTo(move)}>
            {desc}
          </button>
        </li>
      );
    });

    if (winner) {
      status = `The winner is ${winner}`;
    } else {
      status = this.state.status;
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div className="status">{status}</div>
          <ul>{moves}</ul>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

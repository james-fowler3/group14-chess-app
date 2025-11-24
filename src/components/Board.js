import Square from "./Square";

function Board({ board, selected, onSquareClick }) {
    return (
        <div className="board">
            {board.grid.map((row, r) =>
                row.map((cell, c) => {
                    const piece = cell.piece;
                    const isDark = (r + c) % 2 === 1;

                    const isSelected = selected && selected.row === r && selected.col === c;

                    return (
                        <Square
                            key={`${r}-${c}`}
                            piece={piece}
                            dark={isDark}
                            selected={isSelected}
                            onClick={() => onSquareClick(r, c)}
                        />
                    );
                })
            )}
        </div>
    );
}

export default Board;

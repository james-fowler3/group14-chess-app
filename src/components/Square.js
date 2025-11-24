import React from "react";

const pieceSymbols = {
    wP: "♙", wR: "♖", wN: "♘", wB: "♗", wQ: "♕", wK: "♔",
    bP: "♟", bR: "♜", bN: "♞", bB: "♝", bQ: "♛", bK: "♚",
};

function Square({ piece, dark, selected, onClick }) {
    return (
        <button
            className={`square ${dark ? "dark" : "light"} ${
                selected ? "selected" : ""
            }`}
            onClick={onClick}
        >
            {piece && (
                <span className="piece-text">
                    {pieceSymbols[piece.color + piece.type]}
                </span>
            )}
        </button>
    );
}

export default Square;

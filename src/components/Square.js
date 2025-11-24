import React from "react";

const pieceSymbols = {
    wP: "♟",
    wR: "♜",
    wN: "♞",
    wB: "♝",
    wQ: "♛",
    wK: "♚",

    bP: "♟",
    bR: "♜",
    bN: "♞",
    bB: "♝",
    bQ: "♛",
    bK: "♚"
};

function Square({ piece, dark, selected, onClick }) {

    let symbol = null;

    if (piece) {
        const key = piece.color + piece.type;
        symbol = pieceSymbols[key];
    }

    return (
        <button
            className={`square ${dark ? "dark" : "light"} ${selected ? "selected" : ""}`}
            onClick={onClick}
        >
            {symbol && (
                <span className={`piece-text ${piece.color === "w" ? "white" : "black"}`}>
                    {symbol}
                </span>
            )}
        </button>
    );
}

export default Square;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Board from "../components/Board";
import { validateMove, makeMove } from "../chess/GameLogic";

function algebraic(row, col) {
    const file = String.fromCharCode("a".charCodeAt(0) + col);
    const rank = 8 - row;
    return `${file}${rank}`;
}

function GamePage({ game, setGame }) {
    const [selected, setSelected] = useState(null);
    const [history, setHistory] = useState([]);
    const navigate = useNavigate();

    if (!game) {
        return (
            <div>
                <h2>No game active</h2>
                <button onClick={() => navigate("/")}>Go Home</button>
            </div>
        );
    }

    const handleSquareClick = (row, col) => {
        const cell = game.board.grid[row][col];
        const piece = cell.piece;

        // Step 1: Select a piece
        if (!selected) {
            if (!piece) return;
            if (piece.color !== game.currPlayer) return;

            setSelected({ row, col });
            return;
        }

        // Step 2: Deselect same square
        if (selected.row === row && selected.col === col) {
            setSelected(null);
            return;
        }

        // Step 3: Attempt move
        const from = { row: selected.row, col: selected.col };
        const to = { row, col };

        if (!validateMove(game, from, to)) {
            setSelected(null);
            return;
        }

        // Log move
        const moveText = `${algebraic(from.row, from.col)} → ${algebraic(
            to.row,
            to.col
        )}`;

        makeMove(game, from, to);
        setGame(game); // force rerender
        setHistory([moveText, ...history]);
        setSelected(null);
    };

    return (
        <div className="game-container">
            <h2>Game</h2>

            <p>
                Current Turn:{" "}
                {game.currPlayer === "w" ? game.whiteP.name : game.blackP.name}
            </p>

            <Board
                board={game.board}
                selected={selected}
                onSquareClick={handleSquareClick}
            />

            <div className="history">
                <h3>Move History</h3>
                <ol>
                    {history.map((move, i) => (
                        <li key={i}>{move}</li>
                    ))}
                </ol>
            </div>

            <button onClick={() => navigate("/")}>Exit to Menu</button>
        </div>
    );
}

export default GamePage;

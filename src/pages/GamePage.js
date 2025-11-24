import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Board from "../components/Board";

function GamePage({ game, setGame }) {
    const navigate = useNavigate();
    const [selected, setSelected] = useState(null);

    // If game isn't created, send user back
    if (!game) {
        return (
            <div>
                <h2>No Game</h2>
                <button onClick={() => navigate("/")}>Back</button>
            </div>
        );
    }

    const handleSquareClick = (row, col) => {
        const cell = game.board.getCell(row, col);
        const piece = cell.piece;

        // First click: select a piece
        if (!selected) {
            if (!piece) return;
            if (piece.color !== game.currPlayer) return;

            setSelected({ row, col });
            return;
        }

        // Second click: attempt a move
        const from = selected;
        const to = { row, col };

        // SKIP validation completely (demo mode)
        game.makeMove(from, to);

        setGame(game)
        setSelected(null);
    };


    return (
        <div className="game-container">
            <h2>
                Turn: {game.currPlayer === "w" ? game.whiteP.name : game.blackP.name}
            </h2>

            <Board
                board={game.board}
                selected={selected}
                onSquareClick={handleSquareClick}
            />
        </div>
    );
}

export default GamePage;
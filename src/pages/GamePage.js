import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Board from "../components/Board";

function GamePage({ game, setGame }) {
    const navigate = useNavigate();
    const [selected, setSelected] = useState(null);

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

        if (!selected) {
            if (!piece) return;
            if (piece.color !== game.currPlayer) return;

            setSelected({ row, col });
            return;
        }

        const from = selected;
        const to = { row, col };

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
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function JoinGamePage({ onStartGame }) {
    const [whiteName, setWhiteName] = useState("");
    const [blackName, setBlackName] = useState("");
    const navigate = useNavigate();

    const startGame = (e) => {
        e.preventDefault();
        const w = whiteName || "White";
        const b = blackName || "Black";

        onStartGame(w, b);
        navigate("/game");
    };

    return (
        <div className="join-container">
            <h1>Join Game</h1>
            <form onSubmit={startGame}>
                <label>
                    White Player
                    <input
                        value={whiteName}
                        onChange={(e) => setWhiteName(e.target.value)}
                    />
                </label>

                <label>
                    Black Player
                    <input
                        value={blackName}
                        onChange={(e) => setBlackName(e.target.value)}
                    />
                </label>

                <button type="submit">Start Game</button>
            </form>
        </div>
    );
}

export default JoinGamePage;

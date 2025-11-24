import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import JoinGamePage from "./pages/JoinGamePage";
import GamePage from "./pages/GamePage";
import { createGame } from "./chess/GameLogic";

function App() {
    const [game, setGame] = useState(null);

    const handleStartGame = (whiteName, blackName) => {
        const newGame = createGame("local-game", whiteName, blackName);
        setGame(newGame);
    };

    return (
        <div className="app-container">
            <Routes>
                <Route
                    path="/"
                    element={<JoinGamePage onStartGame={handleStartGame} />}
                />
                <Route
                    path="/game"
                    element={<GamePage game={game} setGame={setGame} />}
                />
            </Routes>
        </div>
    );
}

export default App;

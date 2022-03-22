import React from 'react';
import Menu from "./components/Menu1";
import Quiz from "./components/Quiz1";
import EndScreen from "./components/EndScreen1";
import { useState} from "react";
import { GameStateContext } from "./helpers/Contexts1";
import './tfqsc2.css'
const Tfqs = () => {
    const [gameState, setGameState] = useState("menu");
  const [userName, setUserName] = useState("");
  const [score, setScore] = useState(0);
    return (
        <div className='Scqs'>
        <GameStateContext.Provider
          value={{
            gameState,
            setGameState,
            userName,
            setUserName,
            score,
            setScore,
          }}
        >
          {gameState === "menu" && <Quiz />}
          {gameState === "playing" && <Menu/>}
          {gameState === "finished" && <EndScreen />}
        </GameStateContext.Provider>
        </div>
    );
}
export default Tfqs;

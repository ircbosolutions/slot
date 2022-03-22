import React from 'react';
import Menu from "./components/Menu";
import Quiz from "./components/Quiz";
import EndScreen from "./components/EndScreen";
import { useState,useEffect } from "react";
import { GameStateContext } from "./helpers/Contexts";
import Axios from 'axios';

const Scqs3 = () => {
    const [gameState, setGameState] = useState("menu");
  const [userName, setUserName] = useState("");
  const [score, setScore] = useState(0);


    return (
        <div className='scqs'>
              
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
export default Scqs3;

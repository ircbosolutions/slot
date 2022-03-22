import "../scqsc22.css";
import { useContext } from "react";
import { GameStateContext } from "../helpers/Contexts";
import {Link} from 'react-router-dom'

function Menu() {
  const { gameState, setGameState, userName, setUserName } = useContext(
    GameStateContext
  );

  
  return (
    <div className="Menu">
      <p>Instructions : SCQs Section- Select the Correct Answer . All Questions are Mandatory.</p>
    
    </div>
  );
}

export default Menu;

import "../tfqsc222.css";
import { useContext } from "react";
import { GameStateContext } from "../helpers/Contexts1";
import {Link} from 'react-router-dom'

function Menu() {
  const { gameState, setGameState, userName, setUserName } = useContext(
    GameStateContext
  );

  
  return (
    <div className="Menu">
      <p>TFQs Section- Select the Correct Answer . All Questions are Mandatory.</p>
      <Link className="scqLink"
      
        onClick={() => {
          setGameState("playing");
        }}
      >
        Start TFQs Exam
      </Link>
    </div>
  );
}

export default Menu;


import { Tfqsdata } from "../helpers/Questions1";
import { useState,useEffect } from "react";
import {Link} from 'react-router-dom'
import { useContext } from "react";
import { GameStateContext } from "../helpers/Contexts1";

import Axios from "axios";

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [optionChosen, setOptionChosen] = useState("");
  

  const { score, setScore, gameState, setGameState } = useContext(
    GameStateContext
  );

  const chooseOption = (option) => {
    setOptionChosen(option);
  };



  const [Questions1, setQuestions1] = useState(
    [
      {
        question: " Confidentiality & Integrity has maximum negative Impact on any organization from Information Security Angle?",
        opt1: "True ",
        opt2: "False",
       
        asnwer: "opt1",
      }
    ]
    );
    //get tfqs score
    const [getTfqsScore, setgetTfqsScore] = useState([]);
    const fetchTfqsScore=()=>{
      Axios.get('http://localhost:3002/gettfqsperquesdata').then((response)=>{
        let result = response.data;
        const data1=result.map(function(e){return e.tfqs_per_ques_marks})
        setgetTfqsScore(data1)
  
      })
    }
  
  
  
    const numerSc=parseInt(getTfqsScore)


    useEffect( async () => {
      var dataEval = await Tfqsdata()
    
     setQuestions1([...dataEval])
     fetchTfqsScore()
    }, []);
   
    const numberQ="1"
  const [increQ, setincreQ] = useState(numberQ);


  const nextQuestion = () => {
    if (Questions1[currentQuestion].asnwer == optionChosen) {
      setScore(score + numerSc);
    }
     setincreQ(parseInt(increQ)+1)
    setCurrentQuestion(currentQuestion + 1);
  };

  const finishQuiz = () => {
    if (Questions1[currentQuestion].asnwer == optionChosen) {
      setScore(score + numerSc);
    }
    setGameState("finished");
  };

  return (
    <div className="Quiz">
       <h6><b><u>Instructions :</u></b> TFQs Section- Select the Correct Answer . All Questions are Mandatory.</h6> <br />
     <br />
     <br />
      <p>Question {increQ} :  {Questions1[currentQuestion].question}</p><br />
      <div className="questions1">
        <button
          onClick={() => {
            chooseOption("opt1");
          }}
        >
          {Questions1[currentQuestion].opt1}
        </button><br />
        <button
          onClick={() => {
            chooseOption("opt2");
          }}
        >
          {Questions1[currentQuestion].opt2}
        </button><br />
       
      </div>
          <div className="submitAnswerButton">
      {currentQuestion === Questions1.length - 1 ? (
        <Link  onClick={finishQuiz} id="nextQuestion">
          Finish Quiz
        </Link>
      ) : (
        <Link onClick={nextQuestion} id="nextQuestion">
          Next Question
        </Link>
      )}
      </div>
    </div>
  );
}

export default Quiz;

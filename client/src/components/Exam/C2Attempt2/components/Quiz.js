
import { ScqsDataExport } from "../helpers/Questions";
import {FaCheck} from 'react-icons/fa'
import { useState,useEffect } from "react";
import {Link} from 'react-router-dom'
import { useContext } from "react";
import Axios from 'axios';

import { GameStateContext } from "../helpers/Contexts";
// ScqsDataExport()
function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [optionChosen, setOptionChosen] = useState("");

  const [Questions, setQuestions] = useState(
  [
    {
      question: "Which has maximum negative Impact on any organization from Information Security Angle?",
      opt1: "Confidentiality ",
      opt2: "Integrity",
      opt3: "Confidentiality & Integrity",
      opt4: "Confidentiality & Availability",
      asnwer: "optionC",
      marks:"5"
    }
  ]
  );


  const [getScqsScore, setGetScqsScore] = useState([]);
  const fetchScqsScore=()=>{
    Axios.get('http://localhost:3002/getscqsperquesdata').then((response)=>{
      let result = response.data;
      const data1=result.map(function(e){return e.scqs_per_ques_marks})
      setGetScqsScore(data1)

    })
  }



  const numerSc=parseInt(getScqsScore)

  
  useEffect( async () => {
    var dataEval = await ScqsDataExport()
 
   setQuestions([...dataEval])
   fetchScqsScore()
  }, []);

  const { score, setScore, gameState, setGameState } = useContext(
    GameStateContext
  );

  
  const numberQ="1"
  const [increQ, setincreQ] = useState(numberQ);
  const chooseOption = (option) => {
    setOptionChosen(option);
  };

  const nextQuestion = () => {
    if (Questions[currentQuestion].asnwer == optionChosen) {
      setScore(score + numerSc);
    }
    setCurrentQuestion(currentQuestion + 1);
    setincreQ(parseInt(increQ)+1)


  };

  const finishQuiz = () => {
    if (Questions[currentQuestion].asnwer === optionChosen) {
      setScore(score + numerSc);
    }
   
    setGameState("finished");
  };

 

  return (
    <div className="Quiz">
     <h6><b><u>Instructions :</u></b> SCQs Section- Select the Correct Answer . All Questions are Mandatory.</h6> <br />
     <br />
     <br />
      <p>Question {increQ} :  {Questions[currentQuestion].question}</p>
      <br />
      
      <div className="questions">
        <button
          onClick={() => {
            chooseOption("opt1");
          }}
        >
          <FaCheck className="checkIconSelect"/>
          {Questions[currentQuestion].opt1}
          
        </button><br />
        <button
          onClick={() => {
            chooseOption("opt2");
          }}
        >
          <FaCheck className="checkIconSelect"/>
          {Questions[currentQuestion].opt2}
        </button><br />
        <button
          onClick={() => {
            chooseOption("opt3");
          }}
        >
          <FaCheck className="checkIconSelect"/>
          {Questions[currentQuestion].opt3}
        </button><br />
        <button
          onClick={() => {
            chooseOption("opt4");
          }}
        >
          <FaCheck className="checkIconSelect"/>
          {Questions[currentQuestion].opt4}

        </button>
      </div>
        
        <div className="submitAnswerButton">
        {currentQuestion == Questions.length - 1 ? (
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

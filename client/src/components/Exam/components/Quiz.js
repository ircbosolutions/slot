
import { ScqsDataExport } from "../helpers/Questions";
import {FaCheck} from 'react-icons/fa'
import { useState,useEffect } from "react";
import {Link} from 'react-router-dom'
import { useContext } from "react";
import Axios from 'axios';

import { useTimer } from 'react-timer-hook';

import { GameStateContext } from "../helpers/Contexts";
// ScqsDataExport()
function Quiz({ expiryTimestamp }) {
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


  //timer 
    //for timer
    const [secondZero, setsecondZero] = useState('');
    const [minuteZero, setminuteZero] = useState('');
    const {
      seconds,
      minutes,
     
      isRunning,
     
    } = useTimer({ expiryTimestamp, onExpire: () =>  finishQuiz() });
  
    useEffect(() => {
      if(seconds<"10"){
        setsecondZero("0")
       }else{
         setsecondZero('')
       }
       if(minutes<"10"){
         setminuteZero("0")
        }else{
          setminuteZero('')
        }
    },[seconds,minutes]);

 

  return (
    <div className="Quiz">
     <h6><b><u>Instructions :</u></b> SCQs Section- Select the Correct Answer . All Questions are Mandatory.</h6> <br />
     <br />
     <div><p>Time Remain </p>
     <span style={{color:'black',marginLeft:'10px'}}>{minuteZero}{minutes}</span><span style={{color:'black'}}> : </span><span style={{color:'black'}}>{secondZero}{seconds}</span></div>

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

export default function take2() {
  const time = new Date()
  time.setSeconds(time.getSeconds() +10); // 10 minutes timer
  return (
    <div>
      <Quiz expiryTimestamp={time} />
    </div>
  );
}

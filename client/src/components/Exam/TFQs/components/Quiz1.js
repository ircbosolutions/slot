
import { Tfqsdata } from "../helpers/Questions1";
import { useState,useEffect } from "react";
import {Link} from 'react-router-dom'
import { useContext } from "react";
import { GameStateContext } from "../helpers/Contexts1";
import {FaCheck} from 'react-icons/fa'
import { useTimer } from 'react-timer-hook';

import Axios from "axios";

function Quiz({ expiryTimestamp }) {
 

 




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
       <h6><b><u>Instructions :</u></b> TFQs Section- Select the Correct Answer . All Questions are Mandatory.</h6> <br />
     <br />
     <div><p>Time Remain </p>
     <span style={{color:'black',marginLeft:'10px'}}>{minuteZero}{minutes}</span><span style={{color:'black'}}> : </span><span style={{color:'black'}}>{secondZero}{seconds}</span></div>
     <br />
      <p>Question {increQ} :  {Questions1[currentQuestion].question}</p><br />
      <div className="questions1">
      
        <button
          onClick={() => {
            chooseOption("opt1");
          }}
        >
          <FaCheck className="checkIconSelect"/>
          {Questions1[currentQuestion].opt1}
        </button><br />
        <button
          onClick={() => {
            chooseOption("opt2");
          }}
        >
          <FaCheck className="checkIconSelect"/>
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




export default function take1() {
  const time = new Date()
  time.setSeconds(time.getSeconds() +10); // 10 minutes timer
  return (
    <div>
      <Quiz expiryTimestamp={time} />
    </div>
  );
}

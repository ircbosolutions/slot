import React from "react";
import "../tfqsc2.css";
import { useContext,useState,useEffect } from "react";
import Axios from 'axios'
import { GameStateContext } from "../helpers/Contexts1";
import {Questions1} from "../helpers/Questions1";

const EndScreen = () => {
  const { score, setScore, setGameState, userName } = useContext(
    GameStateContext
  );
  
  
  useEffect(() => {
    userCourseid()
    getUidData()
   }, []);

 
     const [getUid, setGetUid] = useState();

   const getUidData=()=>{
       let user= localStorage.getItem("user")
       Axios.get(`http://localhost:3002/businessuid/${user}`).then((response)=>{
         console.log(response.data[0].businessMail)
         setGetUid(response.data[0].businessMail);
       })
   }

   const [courseID, setCourseID] = useState();

   const userCourseid= ()=>{
       const usrCourseIdGet = localStorage.getItem("user_course_id")
       setCourseID(usrCourseIdGet)

   }
 
   const attempt=localStorage.getItem("user_attempt")
  Axios.put('http://localhost:3002/sendtfqsdatausrc2',{
     tfqsScore:score,
    getUid:getUid,
    courseID:courseID,
    attempt:attempt
  
    })



  const restartQuiz = () => {
    setScore(0);
    setGameState("menu");
  };
  return (
    <div className="EndScreen">
      <p>You Scored</p>
      
      <p>
        {score}
      </p>
     
    </div>
  );
};

export default EndScreen;

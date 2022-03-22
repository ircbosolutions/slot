import React from "react";
import "../scqs2.css";
import { useContext,useState,useEffect } from "react";
import { GameStateContext } from "../helpers/Contexts";
import {ScqsDataExport} from "../helpers/Questions";
import {Link} from 'react-router-dom'
import Axios from 'axios'

const EndScreen = () => {
  const { score, setScore, setGameState, userName } = useContext(
    GameStateContext
  );

  useEffect(() => {
    getCustId()
    getUidData()
    
   }, []);

   const [CustId, setCustId] = useState();
   
  

   const getCustId = ()=>{
       let user= localStorage.getItem("user")
       Axios.get(`http://localhost:3002/custid/${user}`).then((response)=>{
         console.log(response.data[0].cust_id)
         setCustId(response.data[0].cust_id);
       })
     }

     const [getUid, setGetUid] = useState();

   const getUidData=()=>{
  
       let user= localStorage.getItem("user")
       Axios.get(`http://localhost:3002/businessuid/${user}`).then((response)=>{
         console.log(response.data[0].businessMail)
         setGetUid(response.data[0].businessMail);
       })
   }

   
 

  Axios.put('http://localhost:3002/sendscqsdatausr2',{
     score:score,
    getUid:getUid,
    CustId:CustId,
    
    })

  

  // const restartQuiz = () => {
  //   setScore(0);
  //   setGameState("menu");
  // };
  return (
    <div className="EndScreen">
      <p>You Scored</p>
      
      <p>
        {score} 
      </p>
      <div className="endScrBtn">

      
    
      </div>
    </div>
  );
};

export default EndScreen;

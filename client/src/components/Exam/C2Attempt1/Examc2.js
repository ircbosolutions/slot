import React,{useState,useEffect} from 'react';
import './examc2.css'
import {Link} from 'react-router-dom';
import Scqs from './Scqsc2';
import Axios from 'axios';
import Orqs from './ORQs/Orqsc2';
import { FaHandPointRight } from 'react-icons/fa';
import { useContext } from "react";
import { GameStateContext } from "../C2Attempt1/helpers/Contexts";
import Tfqs from './TFQs/Tfqsc2';
import ExamHeader from '../../userheader/ExamHeader';
const Examc2 = () => {

  const [tfqDisable, settfqDisable] = useState(false);//tfq disable
  const [orqsDiable, setorqsDiable] = useState(false);//orq disable
  const [scqsDisable, setscqsDisable] = useState(false);//scq disable


    const { gameState, setGameState, userName, setUserName } = useContext(
        GameStateContext
      );
    

    const [examSection, setExamSection] = useState();
    const [selectionField, setSelectionField] = useState(false);
    const [scqs, setScqs] = useState(false);
    const [tfqs, setTfqs] = useState(false);
    const [orqs, setOrqs] = useState(false);
    const [statusBar, setStatusBar] = useState(true);
   
    const scqsSelect=()=>{
       setSelectionField(false)
       setScqs(true)
       setGameState('playing')
       setStatusBar(false)
    }
    const tfqSelect=()=>{
        setSelectionField(false)
        setTfqs(true)
        setStatusBar(false)
    }
    const orqsSelect=()=>{
        setSelectionField(false)
        setOrqs(true)
        setStatusBar(false)
    }
    
    useEffect(() => {
        userCourseid()
    }, []);


  

    const [courseID, setCourseID] = useState();

    const userCourseid= ()=>{
        const usrCourseIdGet = localStorage.getItem("user_course_id")
        setCourseID(usrCourseIdGet)

    }

      //for result
   const [resultValue1C2, setResultValue1C2] = useState();
   const [resultValue2C2, setResultValue2C2] = useState();
   const [resultValue3C2, setResultValue3C2] = useState();

   const takeResult2=()=>{
     let takeuser=localStorage.getItem("user")
    Axios.get(`http://localhost:3002/takeresult2/${takeuser}`).then((response)=>{
     console.log(response.data)
     let result=response.data
     let takeResult = result.map(function(e){return e.stats_apt1})
     let takeResult2= result.map(function(e){return e.stats_apt2})
     let takeResult3= result.map(function(e){return e.stats_apt3})
 
     setResultValue1C2(takeResult[0])
     setResultValue2C2(takeResult2[0])
     setResultValue3C2(takeResult3[0])
     

   })

 }
 const [tfqApt1, setTfqApt1] = useState();
 const [scqApt1, setScqApt1] = useState();
 const [orqsApt1, setorqsApt1] = useState();

 const [tfqApt2, setTfqApt2] = useState();
 const [scqApt2, setScqApt2] = useState();
 const [orqsApt2, setorqsApt2] = useState();


 const [tfqApt3, setTfqApt3] = useState();
 const [scqApt3, setScqApt3] = useState();
 const [orqsApt3, setorqsApt3] = useState();
const blockTfqButton=()=>{
  let takeuser=localStorage.getItem("user")
 Axios.get(`http://localhost:3002/attempt2tfqblock/${takeuser}`).then((response)=>{
     console.log(response.data)
     let result =response.data
     //attempt1 block buttons
     let apt1_tfq_sc=result.map(function(e){return e.tfq_sc_apt1})
     let apt1_scq_sc=result.map(function(e){return e.scq_sc_apt1})
     let apt1_orq_sc=result.map(function(e){return e.ques_1_apt1})
     //attempt 2 block button
     let apt2_tfq_sc=result.map(function(e){return e.tfq_sc_apt2})
     let apt2_scq_sc=result.map(function(e){return e.scq_sc_apt2})
     let apt2_orq_sc=result.map(function(e){return e.ques_1_apt2})
     
     //attempt 3 block buttons
     let apt3_tfq_sc=result.map(function(e){return e.tfq_sc_apt3})
     let apt3_scq_sc=result.map(function(e){return e.scq_sc_apt3})
     let apt3_orq_sc=result.map(function(e){return e.ques_1_apt3})
     setTfqApt1(apt1_tfq_sc[0])
     setScqApt1(apt1_scq_sc[0])
     setorqsApt1(apt1_orq_sc[0])
     setTfqApt2(apt2_tfq_sc[0])
     setScqApt2(apt2_scq_sc[0])
     setorqsApt2(apt2_orq_sc[0])
     setTfqApt3(apt3_tfq_sc[0])
     setScqApt3(apt3_scq_sc[0])
     setorqsApt3(apt3_orq_sc[0])

 }) 
}
useEffect(() => {
 
 blockTfqButton()

 if(tfqApt1!==""){
     console.log('block')
     settfqDisable(true)
     
 }else{
    settfqDisable(false)
 }

 if(scqApt1!==""){
     console.log('block')
     setscqsDisable(true)
     
 }else{
     setscqsDisable(false)
 }
 if(orqsApt1!==""){
     console.log('block')
     setorqsDiable(true)
     
 }else{
     setorqsDiable(false)
 }

 if(tfqApt2!==""){
     console.log('block')
     settfqDisable(true)
     
 }else{
    settfqDisable(false)
 }

 if(scqApt2!==""){
     console.log('block')
     setscqsDisable(true)
     
 }else{
     setscqsDisable(false)
 }
 if(orqsApt2!==""){
     console.log('block')
     setorqsDiable(true)
     
 }else{
     setorqsDiable(false)
 }

 if(tfqApt3!==""){
     console.log('block')
     settfqDisable(true)
     
 }else{
    settfqDisable(false)
 }

 if(scqApt3!==""){
     console.log('block')
     setscqsDisable(true)
     
 }else{
     setscqsDisable(false)
 }
 if(orqsApt3!==""){
     console.log('block')
     setorqsDiable(true)
     
 }else{
     setorqsDiable(false)
 }


},);

 useEffect(()=>{
   takeResult2()
 },[])
 useEffect(() => {

    if(resultValue1C2===""){
      setButton1(false)
      
     
    }
    else if(resultValue2C2===""){
      setButton2(true)
      setButton3(true)
  
    }
  
    
  if(resultValue1C2=== "PASS"){
    
    setButton1(true)
    setButton2(true)
    setButton3(true)
  }
  else if(resultValue1C2==="FAIL"){
    
    setButton1(true)
    setButton2(false)
    setButton3(true)
  
     
  }
  if(resultValue2C2==="PASS"){
    
    setButton1(true)
    setButton2(true)
    setButton3(true)
  
  }else if(resultValue2C2==="FAIL"){
    setButton1(true)
    setButton2(true)
    setButton3(false)
      }
  
  if(resultValue3C2==="PASS"){
        setButton1(true)
        setButton2(true)
        setButton3(true)
      
  }else if(resultValue3C2==="FAIL"){
        setButton1(true)
        setButton2(true)
        setButton3(true)
          }
  
  
         
         
     
    
   }, [resultValue1C2,resultValue2C2,resultValue3C2]);
  



      //for result
      const [attemptButton, setAttemptButton] = useState(true);
      const [button1, setButton1] = useState(false);
      const [button2, setButton2] = useState(false);
      const [button3, setButton3] = useState(false);


      const [attempTry, setattempTry] = useState();
      const attempt1=()=>{
  
          setSelectionField(true)
          setAttemptButton(false)
          setattempTry("1")
          localStorage.setItem("user_course_id",courseID)
          localStorage.setItem("user_attempt","attempt1")
       }
   const attempt2=()=>{
  
      setSelectionField(true)
      setAttemptButton(false)
      setattempTry("2")
      localStorage.setItem("user_course_id",courseID)
      localStorage.setItem("user_attempt","attempt2")
  }
  
  const attempt3=()=>{
      setSelectionField(true)
      setAttemptButton(false)
      setattempTry("3")
      localStorage.setItem("user_course_id",courseID)
      localStorage.setItem("user_attempt","attempt3")
  }
  


  
    
    return (
        <div>
            <ExamHeader/>
            <div className="exam1-big-container">
                <div className="exam1-top-container">
                    <h4><strong>Exam Window :</strong> <i> This is AI Proctored Exam, Please Position Yourself Aligned to Device Camera.</i></h4>
                    
                </div>
                <div className="exam1-container">
                  <div className="exam1-left-container">
                        <h5>Course ID : {courseID} </h5>

                        <h5>Final Exam Status: Pending</h5>

                        <h5> Attempt - {attempTry} </h5>

                        <div className="status-options">
                        <p>TFQs Status : Pending</p>   
                        <p>SCQs Status : Pending</p>
                        <p>ORQs Status : Pending</p>
                        </div>
                        <div className="backButtonExam">
                        <Link className='closeBtnExam' to={'/examlist'}>Back</Link>
                        </div>
                      
                        </div>
                    <div className="exam1-right-container">
                    {
                            attemptButton?
                            <div>
                             <button disabled={button1} onClick={attempt1}>Attempt-1</button>
                            <button  disabled={button2} onClick={attempt2}>Attempt-2</button>
                            <button  disabled={button3} onClick={attempt3}>Attempt-3</button>
                            </div>:null
                        }
                        {
                            selectionField?
                            <div>
                            <h4><u>Important Exam Guidelines</u></h4>

                            <p><FaHandPointRight className='rightFa1'/><i>Complete Exam is Divided in Three Sections (TFQs, SCQs. ORQs).</i></p>
                            <p><FaHandPointRight className='rightFa1'/>All Sections are Mandatory.</p>
                            <p><FaHandPointRight className='rightFa1'/>To Start Exam, Please Click on Below Given Buttons.</p>
                            <div className="selectButtonExam">
                            <button disabled={tfqDisable} onClick={tfqSelect}>Start TFQs Section Exam</button>
                            <button disabled={scqsDisable} onClick={scqsSelect}>Start SCQs Section Exam</button>
                            <button disabled={orqsDiable} onClick={orqsSelect}>Start ORQs Section Exam</button>
                          
                           
                            </div>
                            </div>
                            :null
                        }  

                        <div className="exam-start-container">

                        {
                              orqs?<Orqs/>:null
                          }
                           
                            {
                                scqs? <Scqs/>:null
                            }

                            {
                                tfqs?<Tfqs/> :null
                            }
                           
                        </div>


                         
                           
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default Examc2;

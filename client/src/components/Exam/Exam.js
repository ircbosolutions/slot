import React,{useState,useEffect} from 'react';
import ExamHeader from '../userheader/ExamHeader';
import './exam.css'
import {Link} from 'react-router-dom';
import Scqs from './Scqs';
import Axios from 'axios';
import Orqs from './ORQs/Orqs';
import { FaHandPointRight } from 'react-icons/fa';
import { useContext } from "react";
import { GameStateContext } from "../Exam/helpers/Contexts";
import Tfqs from './TFQs/Tfqs';
const Exam = (props) => {
    
    const [tfqDisable, settfqDisable] = useState();//tfq disable
    const [orqsDiable, setorqsDiable] = useState();//orq disable
    const [scqsDisable, setscqsDisable] = useState();//scq disable

    

  
    
  


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
    
    const [getUid, setGetUid] = useState();

 const getUidData=()=>{
     let user= localStorage.getItem("user")
     Axios.get(`http://localhost:3002/businessuid/${user}`).then((response)=>{
       console.log(response.data[0].businessMail)
       setGetUid(response.data[0].businessMail);
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
        
        useEffect(() => {
            takeResult()
           
          
         },[]);

       
         
       

        //for result
        const [resultValue1, setResultValue1] = useState();
        const [resultValue2, setResultValue2] = useState();
        const [resultValue3, setResultValue3] = useState();
    
        const takeResult=()=>{
            let takeuser=localStorage.getItem("user")
           Axios.get(`http://localhost:3002/takeresult/${takeuser}`).then((response)=>{
            console.log(response.data)
            let result=response.data
            let takeResult = result.map(function(e){return e.stats_apt1})
            let takeResult2= result.map(function(e){return e.stats_apt2})
            let takeResult3= result.map(function(e){return e.stats_apt3})
            
            setResultValue1(takeResult[0])
            setResultValue2(takeResult2[0])
            setResultValue3(takeResult3[0])
            
    
          })
    
        }

        
useEffect(() => {

    if(resultValue1===""){
     setButton1(false)
    
   }
   else if(resultValue2===""){
     setButton2(true)
     setButton3(true)
   }
 if(resultValue1=== "PASS"){
   
   setButton1(true)
   setButton2(true)
   setButton3(true)
 }
 else if(resultValue1==="FAIL"){
   
   setButton1(true)
   setButton2(false)
   setButton3(true)
 
    
 }
 if(resultValue2==="PASS"){
   
   setButton1(true)
   setButton2(true)
   setButton3(true)
 
 }else if(resultValue2==="FAIL"){
   setButton1(true)
   setButton2(true)
   setButton3(false)
     }
 
 if(resultValue3==="PASS"){
       setButton1(true)
       setButton2(true)
       setButton3(true)
     
 }else if(resultValue3==="FAIL"){
       setButton1(true)
       setButton2(true)
       setButton3(true)
 }
 },[resultValue1,resultValue2,resultValue3])
  





    const [courseID, setCourseID] = useState();

    const userCourseid= ()=>{
        const usrCourseIdGet = localStorage.getItem("user_course_id")
        setCourseID(usrCourseIdGet)

    }

     //for attempts 
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

        
         Axios.get(`http://localhost:3002/attempt1tfqblock/${getUid}`).then((response)=>{
         console.log(response.data)
         let result =response.data
        //attempt1 block buttons
        let apt1_tfq_sc=result.map(function(e){return e.tfq_sc_apt1})
        let apt1_scq_sc=result.map(function(e){return e.scq_sc_apt1})
        let apt1_orq_sc=result.map(function(e){return e.ques_1_apt1})

        setTfqApt1(apt1_tfq_sc[0])
        setScqApt1(apt1_scq_sc[0])
        setorqsApt1(apt1_orq_sc[0])

      
         }) 


         if(tfqApt1!==null){
            console.log('block')
            settfqDisable(false)
            
        }else{
           settfqDisable(false)
        }
        if(scqApt1!==null){
            console.log('block')
            setscqsDisable(true)
            
        }else{
            setscqsDisable(false)
        }
        if(orqsApt1===""){
            console.log('block')
            setorqsDiable(false)
            
        }else if(orqsApt1!==null){
            setorqsDiable(true)
        }
        

        

 }
 const attempt2=()=>{

    setSelectionField(true)
    setAttemptButton(false)
    setattempTry("2")
    localStorage.setItem("user_course_id",courseID)
    localStorage.setItem("user_attempt","attempt2")

    Axios.get(`http://localhost:3002/attempt1tfqblock/${getUid}`).then((response)=>{
        console.log(response.data)
        let result =response.data
       
        //attempt 2 block button
        let apt2_tfq_sc=result.map(function(e){return e.tfq_sc_apt2})
        let apt2_scq_sc=result.map(function(e){return e.scq_sc_apt2})
        let apt2_orq_sc=result.map(function(e){return e.ques_1_apt2})
        setTfqApt2(apt2_tfq_sc[0])
        setScqApt2(apt2_scq_sc[0])
        setorqsApt2(apt2_orq_sc[0])

        if(tfqApt2===""){
            console.log('block')
            settfqDisable(false)
            
        }else{
           settfqDisable(true)
        }
    
        if(scqApt2===""){
            console.log('block')
            setscqsDisable(false)
            
        }else{
            setscqsDisable(true)
        }
        if(orqsApt2===""){
            console.log('block')
            setorqsDiable(false)
            
        }else{
            setorqsDiable(true)
        }
    }) 

    
     
}

const attempt3=()=>{

    setSelectionField(true)
    setAttemptButton(false)
    setattempTry("3")
    localStorage.setItem("user_course_id",courseID)
    localStorage.setItem("user_attempt","attempt3")
    Axios.get(`http://localhost:3002/attempt1tfqblock/${getUid}`).then((response)=>{
        console.log(response.data)
        let result =response.data
      
        //attempt 3 block buttons
        let apt3_tfq_sc=result.map(function(e){return e.tfq_sc_apt3})
        let apt3_scq_sc=result.map(function(e){return e.scq_sc_apt3})
        let apt3_orq_sc=result.map(function(e){return e.ques_1_apt3})
     
        setTfqApt3(apt3_tfq_sc[0])
        setScqApt3(apt3_scq_sc[0])
        setorqsApt3(apt3_orq_sc[0])

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

    }) 

     
}

    const [checkScqs, setCheckScqs] = useState();
    const fixButton=()=>{
        Axios.get('http://localhost:3002/trackmarks/'+courseID+"/"+getUid)
        .then((response)=>{
            let result=response.data
            let scq_sc_apt1=result.map(function(e){return e.tfq_sc_apt1})
            setCheckScqs(scq_sc_apt1[0])
            console.log(scq_sc_apt1)

        })

    }

   

 useEffect(() => {
    userCourseid()
    
}, []);
useEffect(() => {
  
    getUidData()

   
}, []);

        const backClick = ()=>{
            props.history.push('/examlist')
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
                        <Link className='closeBtnExam' onClick={backClick}>Back</Link>
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

export default Exam;

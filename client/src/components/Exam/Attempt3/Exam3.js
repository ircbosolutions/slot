import React,{useState,useEffect} from 'react';
import ExamHeader from '../../userheader/ExamHeader';
import './exam3.css'
import {Link} from 'react-router-dom';
import Scqs3 from './Scqs3';
import Axios from 'axios';
import Orqs2 from './ORQs/Orqs3';
import { FaHandPointRight } from 'react-icons/fa';
import { useContext } from "react";
import { GameStateContext } from "../Attempt3/helpers/Contexts";
import Tfqs3 from './TFQs/Tfqs3';
const Exam3 = () => {
    const { gameState, setGameState, userName, setUserName } = useContext(
        GameStateContext
      );
    

    const [examSection, setExamSection] = useState();
    const [selectionField, setSelectionField] = useState(true);
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
        const usrCourseIdGet = localStorage.getItem("user_course_id_ia")
        setCourseID(usrCourseIdGet)

    }


    // useEffect(() => {
    //     getAdmCustId()
    //   }, []);

    //   const [courseID, setcourseID] = useState();
      
    //   const getAdmCustId =()=>{
    //     Axios.get('http://localhost:3002/getadmcustid').then((response)=>{
    //       let result = response.data
          
         
    //       let courseId = result.map(function(e){return e.course_id})
        
    //       console.log(courseId)
    //       setcourseID(courseId[0])
         
         
          // console.log(response.data[0].cust_id)
          // setAdmCustId(response.data[0].cust_id)
    //     })
    //   }
    
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

                        <h5> Attempt - 3 </h5>

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
                            selectionField?
                            <div>
                            <h4><u>Important Exam Guidelines</u></h4>

                            <p><FaHandPointRight className='rightFa1'/><i>Complete Exam is Divided in Three Sections (TFQs, SCQs. ORQs).</i></p>
                            <p><FaHandPointRight className='rightFa1'/>All Sections are Mandatory.</p>
                            <p><FaHandPointRight className='rightFa1'/>To Start Exam, Please Click on Below Given Buttons.</p>
                            <div className="selectButtonExam">
                            <button onClick={tfqSelect}>Start TFQs Section Exam</button>
                            <button onClick={scqsSelect}>Start SCQs Section Exam</button>
                            <button onClick={orqsSelect}>Start ORQs Section Exam</button>
                          
                           
                            </div>
                            </div>
                            :null
                        }  

                        <div className="exam-start-container">

                        {
                              orqs?<Orqs2/>:null
                          }
                           
                            {
                                scqs? <Scqs3/>:null
                            }

                            {
                                tfqs?<Tfqs3/> :null
                            }
                           
                        </div>


                         
                           
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default Exam3;

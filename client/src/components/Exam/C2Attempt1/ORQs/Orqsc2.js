import React from 'react';
import { useState,useEffect } from 'react';
import './orqsc2.css'
import Axios from 'axios'
import $ from 'jquery';

import { useTimer } from 'react-timer-hook';

const Orqs = ({ expiryTimestamp }) => {

    $(document).ready(function(){
        $('#non_paste').bind("cut copy paste",function(e){
            e.preventDefault()
        })
    })
    $(document).ready(function(){
        $('#non_paste2').bind("cut copy paste",function(e){
            e.preventDefault()
        })
    })
    $(document).ready(function(){
        $('#non_paste4').bind("cut copy paste",function(e){
            e.preventDefault()
        })
    })
    $(document).ready(function(){
        $('#non_paste3').bind("cut copy paste",function(e){
            e.preventDefault()
        })
    })
    $(document).ready(function(){
        $('#non_paste5').bind("cut copy paste",function(e){
            e.preventDefault()
        })
    })
    useEffect(() => {
       getOrqsData()
    }, []);


    const getOrqsData=()=>{
        
        const courseid2=localStorage.getItem("user_course_id")
        const attempt=localStorage.getItem("user_attempt")
        Axios.get('http://localhost:3002/getorqsquesdatac2/'+courseid2+"/"+attempt).then((response)=>{
          
            let result=response.data
            let question1=result.map(function(e){return e.question})
            setq1(question1[0])
            setq2(question1[1])
            setq3(question1[2])
            setq4(question1[3])
            setq5(question1[4])


        })
    }
    //for getting questions from backend and database 
    const [q1, setq1] = useState();
    const [q2, setq2] = useState();
    const [q3, setq3] = useState();
    const [q4, setq4] = useState();
    const [q5, setq5] = useState();

    //get answers from user
    const [ans1, setAns1] = useState();
    const [ans2, setAns2] = useState();
    const [ans3, setAns3] = useState();
    const [ans4, setAns4] = useState();
    const [ans5, setAns5] = useState();



    //get login uid
    useEffect(() => {
      getUidData()
    }, []);
    const [getUid, setGetUid] = useState();
    //for show body
    const [showBody, setShowBody] = useState(true);
     //for submitting answers
     const [successPop, setsuccessPop] = useState(false);
      //for answer1 count
    const [count, setCount] = React.useState(0);
    //for answer2 count
    const [count2, setCount2] = React.useState(0);
     //for answer3 count
   const [count3, setCount3] = React.useState(0);
   //for answer1 count
   const [count4, setCount4] = React.useState(0);
   //for answer1 count
   const [count5, setCount5] = React.useState(0);
   

    const getUidData=()=>{
        let user= localStorage.getItem("user")
        Axios.get(`http://localhost:3002/businessuid/${user}`).then((response)=>{
          console.log(response.data[0].businessMail)
          setGetUid(response.data[0].businessMail);
        })
    }

    const attempt =localStorage.getItem("user_attempt")
    const course_id = localStorage.getItem("user_course_id")
    const orqsData1=()=>{
       
        
        Axios.put('http://localhost:3002/sendusrorqsdatac2',{
            uid:getUid,
            q1:q1,
            ans1:ans1,
            q2:q2,
            ans2:ans2,
            q3:q3,
            ans3:ans3,
            q4:q4,
            ans4:ans4,
            q5:q5,
            ans5:ans5,
            attempt:attempt,
            course_id:course_id
        }).then((reponse)=>{
            setShowBody(false)
            setsuccessPop(true)
        }).catch(err=>console.log(err))
     
    }


    const sendAns1=(e)=>{
        setAns1(e.target.value)
        setCount(e.target.value.length)
    }
    const sendAns2=(e)=>{
        setAns2(e.target.value)
        setCount2(e.target.value.length)
    }
    const sendAns3=(e)=>{
        setAns3(e.target.value)
        setCount3(e.target.value.length)
    }
    const sendAns4=(e)=>{
        setAns4(e.target.value)
        setCount4(e.target.value.length)
    }
    const sendAns5=(e)=>{
        setAns5(e.target.value)
        setCount5(e.target.value.length)
    }


    //for timer
    const [secondZero, setsecondZero] = useState('');
    const [minuteZero, setminuteZero] = useState('');
    const {
      seconds,
      minutes,
     
      isRunning,
     
    } = useTimer({ expiryTimestamp, onExpire: () => orqsData1() });
  
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
        
        <>
        {
            showBody?
            <div className="orqs-big-container-full">
                <h6>ORQs Section- Type your Answer in minimum Wordings. All Questions are Mandatory.</h6>
                <div><p>Time Remain </p>
     <span style={{color:'black',marginLeft:'10px'}}>{minuteZero}{minutes}</span><span style={{color:'black'}}> : </span><span style={{color:'black'}}>{secondZero}{seconds}</span></div>
<br />
                <div className="orqs-container-full">
                    {/* question 1 */}
                    <p><b>Q1.</b> {q1}</p>
                    <br />
                    <div className='textarea_style'>
                    <textarea id="non_paste"  maxLength='500' minLength='20' placeholder='Enter Your Answer Here' name="" cols="100" rows="5" onChange={sendAns1}/>
                    <span id='show' className='textarea_count'>{count} / 500 (max character 500)</span>
                    </div>
                    <br />
                     {/* question 2 */}
                    <p><b>Q2.</b> {q2}</p>
                    <br />
                    <div className='textarea_style'>
                    <textarea id="non_paste2" maxLength='500' minLength='20' name=""  cols="100" placeholder='Enter Your Answer Here' rows="5" onChange={sendAns2}/>
                    <span id='show' className='textarea_count'>{count2} / 500 (max character 500)</span>
                    </div>
                    <br />
                     {/* question 3 */}
                     <p><b>Q3.</b> {q3}</p>
                    <br />
                    <div className='textarea_style'>
                    <textarea maxLength='500' minLength='20' name="" id="non_paste3" cols="100" placeholder='Enter Your Answer Here' rows="5" onChange={sendAns3}/>
                    <span id='show' className='textarea_count'>{count3}/ 500 (max character 500)</span>
                    </div>
                    <br />
                    {/* question 4 */}
                    <p><b>Q4.</b> {q4}</p>
                    <br />
                    <div className='textarea_style'>
                    <textarea maxLength='500' minLength='20' name="" id="non_paste4" cols="100" placeholder='Enter Your Answer Here' rows="5" onChange={sendAns4}/>
                    <span id='show' className='textarea_count'>{count4} / 500 (max character 500)</span>
                    </div>
                    <br />
                    {/* question 5 */}
                    <p><b>Q5.</b> {q5}</p>
                    <br />
                    <div className='textarea_style'>
                    <textarea maxLength='500' minLength='20' name="" id="non_paste5" cols="100" placeholder='Enter Your Answer Here' rows="5" onChange={sendAns5}/>
                    <span id='show' className='textarea_count'>{count5} / 500 (max character 500)</span>
                    </div>
                    <br />

                    <div >
                    <button className="orqs-submit" onClick={orqsData1}>Submit</button>
                    </div>
                   
                </div>
            </div>:null
        }
         {
            successPop?
            <h1>
                Your Answers is submitted.Please wait for evaluation.

            </h1>:null
        }
            
        </>
    );
}

export default function take3() {
    const time = new Date()
    time.setSeconds(time.getSeconds() +20); // 10 minutes timer
    return (
      <div>
        <Orqs expiryTimestamp={time} />
      </div>
    );
  }
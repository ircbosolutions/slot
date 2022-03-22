import React from 'react';
import { useState,useEffect } from 'react';
import './orqsc22.css'
import Axios from 'axios'
import $ from 'jquery';

const Orqs22= () => {

    $(document).ready(function(){
        $('#non_paste').bind("cut copy paste",function(e){
            e.preventDefault()
        })
    })

    useEffect(() => {
       getOrqsData()
    }, []);


    const getOrqsData=()=>{
        
        const courseid2=localStorage.getItem("user_course_id_ind")
        Axios.get(`http://localhost:3002/getorqsquesdatac22/${courseid2}`).then((response)=>{
          
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

    const getUidData=()=>{
        let user= localStorage.getItem("user")
        Axios.get(`http://localhost:3002/businessuid/${user}`).then((response)=>{
          console.log(response.data[0].businessMail)
          setGetUid(response.data[0].businessMail);
        })
    }

    const orqsData=(e)=>{
        e.preventDefault()
       
        
        Axios.put('http://localhost:3002/sendusrorqsdatac22',{
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
        })
    }

    return (
        
        <>
            <div className="orqs-big-container-full">
                <h6>ORQs Section- Type your Answer in minimum Wordings. All Questions are Mandatory.</h6>
                <div className="orqs-container-full">
                    {/* question 1 */}
                    <p><b>Q1.</b> {q1}</p>
                    <br />
                    <div className='textarea_style'>
                    <textarea id="non_paste"  maxLength='500' minLength='20' placeholder='Enter Your Answer Here' name="" id="" cols="100" rows="5" onChange={(e)=>{
                        setAns1(e.target.value)
                    }}/>
                    <span id='show' className='textarea_count'>0 / 500 (max character 500)</span>
                    </div>
                    <br />
                     {/* question 2 */}
                    <p><b>Q2.</b> {q2}</p>
                    <br />
                    <div className='textarea_style'>
                    <textarea maxLength='500' minLength='20' name="" id="" cols="100" placeholder='Enter Your Answer Here' rows="5" onChange={(e)=>{
                        setAns2(e.target.value)
                    }}/>
                    <span id='show' className='textarea_count'>0 / 500 (max character 500)</span>
                    </div>
                    <br />
                     {/* question 3 */}
                     <p><b>Q3.</b> {q3}</p>
                    <br />
                    <div className='textarea_style'>
                    <textarea maxLength='500' minLength='20' name="" id="" cols="100" placeholder='Enter Your Answer Here' rows="5" onChange={(e)=>{
                        setAns3(e.target.value)
                    }}/>
                    <span id='show' className='textarea_count'>0 / 500 (max character 500)</span>
                    </div>
                    <br />
                    {/* question 4 */}
                    <p><b>Q4.</b> {q4}</p>
                    <br />
                    <div className='textarea_style'>
                    <textarea maxLength='500' minLength='20' name="" id="" cols="100" placeholder='Enter Your Answer Here' rows="5" onChange={(e)=>{
                        setAns4(e.target.value)
                    }}/>
                    <span id='show' className='textarea_count'>0 / 500 (max character 500)</span>
                    </div>
                    <br />
                    {/* question 5 */}
                    <p><b>Q5.</b> {q5}</p>
                    <br />
                    <div className='textarea_style'>
                    <textarea maxLength='500' minLength='20' name="" id="" cols="100" placeholder='Enter Your Answer Here' rows="5" onChange={(e)=>{
                        setAns5(e.target.value)
                    }}/>
                    <span id='show' className='textarea_count'>0 / 500 (max character 500)</span>
                    </div>
                    <br />

                    <div className="orqs-submit">
                    <button onClick={orqsData}>Submit</button>
                    </div>
                   
                </div>
            </div>
        </>
    );
}

export default Orqs22;

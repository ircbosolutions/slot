import React,{useState,useEffect} from 'react';
import HomepageHead from '../userheader/HomepageHead';
import './feedback.css';
import Axios from 'axios';
import {Link} from 'react-router-dom';
import { FaHandPointRight } from 'react-icons/fa';

const Feedback = () => {

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

    const [feedData, setFeedData] = useState([]);

    const [q1, setq1] = useState('');
    const [q2, setq2] = useState('');
    const [q3, setq3] = useState('');
  
    useEffect(()=>{
        getData()
    })
    const getData=()=>{
        Axios.get('http://localhost:3002/feedbackdata').then((response)=>{
            let result=response.data;
            let qu1=result.map(function(e){return e.question})
            setq1(qu1[0])
            setq2(qu1[1])
            setq3(qu1[2])
         
        })
    }

    //send data
    const [question1, setQuestion1] = useState();
    const [rv1, setRv1] = useState();
    const [textBox, setTextBox] = useState();
    const [rv2, setrv2] = useState();
    const [rv3, setrv3] = useState();
    const [TextBox2, setTextBox2] = useState();
    const [TextBox3, setTextBox3] = useState();
    // let pData=document.getElementById('tagP').textContent;

    const sendFeedData=async(e)=>{
        
        e.preventDefault()
      if(!textBox||!TextBox2||!TextBox3){
        seterrMSg(true)
      }else{
          setshowBody(false)
          setsuccessPop(true)
        Axios.post('http://localhost:3002/api/sendfeedback',
        {
            getUid:getUid,
            CustId:CustId,
            q1:q1,
            q2:q2,
            q3:q3,
            rv1:rv1,
            rv2:rv2,
            rv3:rv3,
            textBox:textBox,
            textBox2:TextBox2,
            textBox3:TextBox3
        })

      }
       
    }

    const onBlur1=()=>{
        seterrMSg(false)
    }

    const [showBody, setshowBody] = useState(true);
    const [successPop, setsuccessPop] = useState(false);
    const [errMSg, seterrMSg] = useState(false);


    return (
        <>
            <HomepageHead/>
            <div className="feedback_title">
            <h1>Feedback</h1>
            </div>
            <div className="feedback_big_container">
                {
                    showBody?
                    <div className="feedback_container">
                    <span><i>Dear Participant,</i></span><br />

                    <span><i>Please give us your feedback, your valuable feedback is very important and contributes to our endeour for continuol improvement.</i></span>
                    <form>
                   
                    <div className="feedback__form">
                        <div className="feedback__form_question">
                        <p><FaHandPointRight className='rightFa'/>&nbsp; {q1}</p>
                        </div>
                        <div className="feedback__form_dropdown">
                        <input onInput={onBlur1} type="radio" id="Need_Improment" name="fav_language" value="Need Improment" onChange={(e)=>{
                            setRv1(e.target.value)
                        }}/>
                        <label for="Need_Improment">Need Improment</label>
                        <input onInput={onBlur1} type="radio" id="Acceptable" name="fav_language" value="Acceptable" onChange={(e)=>{
                            setRv1(e.target.value)
                        }}/>
                        <label for="Acceptable">Acceptable</label>
                        <input onInput={onBlur1} type="radio" id="Good" name="fav_language" value="Good" onChange={(e)=>{
                            setRv1(e.target.value)
                        }}/>
                        <label for="Good">Good</label>
                        <input onInput={onBlur1} type="radio" id="Delighted" name="fav_language" value="Delighted" onChange={(e)=>{
                            setRv1(e.target.value)
                        }}/>
                        <label for="Delighted">Delighted</label>
                        </div>
                        <div className="feedback__form_textbox">
                            <input onInput={onBlur1} type="text" placeholder='Please Enter Remark Here' onChange={(e)=>{
                                setTextBox(e.target.value)
                            }}/>
                            
                        </div>

                        
                    </div>
                    <div className="feedback__form">
                   
                         <div className="feedback__form_question">
                            
                           <p><FaHandPointRight className='rightFa'/>&nbsp;{q2}</p>

                        </div>
                        <div className="feedback__form_dropdown">
                        <input onInput={onBlur1} type="radio" id="Need_Improment1" name="fave_ood" value="Need Improvement" 
                        onChange={(e)=>{
                            setrv2(e.target.value)
                        }}/>
                        <label for="Need_Improment1">Need Improment</label>
                        <input onInput={onBlur1} type="radio" id="Acceptable1" name="fave_ood" value="Acceptable" onChange={(e)=>{
                            setrv2(e.target.value)
                        }} />
                        <label for="Acceptable1">Acceptable</label>
                        <input onInput={onBlur1} type="radio" id="Good1" name="fave_ood" value="Good" onChange={(e)=>{
                            setrv2(e.target.value)
                        }} />
                        <label for="Good1">Good</label>
                    
                        <input onInput={onBlur1} type="radio" id="Delighted1" name="fave_ood" value="Delighted" onChange={(e)=>{
                            setrv2(e.target.value)
                        }}/>
                        <label for="Delighted1">Delighted</label>
                        </div>
                        <div className="feedback__form_textbox">
                            <input onInput={onBlur1} type="text" placeholder='Please Enter Remark Here' onChange={(e)=>{
                                setTextBox2(e.target.value)
                            }}/>
                            
                        </div>

                        
                    </div>

                    <div className="feedback__form">
                   
                         <div className="feedback__form_question">
                           <p><FaHandPointRight className='rightFa'/>&nbsp;{q3}</p>
                        </div>
                        <div className="feedback__form_dropdown">
                        <input onInput={onBlur1} type="radio" id="Need_Improment2" name="fave_ood2" value="Need Improvement" onChange={(e)=>{
                            setrv3(e.target.value)
                        }} />
                        <label for="Need_Improment2">Need Improment</label>
                        <input onInput={onBlur1} type="radio" id="Acceptable12" name="fave_ood2" value="Acceptable" onChange={(e)=>{
                            setrv3(e.target.value)
                        }} />
                        <label for="Acceptable12">Acceptable</label>
                        <input onInput={onBlur1} type="radio" id="Good2" name="fave_ood2" value="Good" onChange={(e)=>{
                            setrv3(e.target.value)
                        }} />
                        <label for="Good2">Good</label>
                    
                        <input type="radio" onInput={onBlur1} id="Delighted2" name="fave_ood2" value="Delighted" onChange={(e)=>{
                            setrv3(e.target.value)
                        }} />
                        <label for="Delighted2">Delighted</label>
                        </div>
                        <div className="feedback__form_textbox">
                            <input onInput={onBlur1} type="text" placeholder='Please Enter Remark Here' onChange={(e)=>{
                                setTextBox3(e.target.value)
                            }}/>
                            
                        </div>

                        
                    </div>
                   <div className="FeedbackBtn">
                      <Link className='closebtn-Feedback' to={'/homepage'}>Close</Link>
                  <button onClick={sendFeedData}>Submit</button>
                  </div>
      
                   </form>
                  
                </div>:null
                }
                <div className="errMsg">

                
                   {
     errMSg?<p style={{color:'#ff0000',fontWeight:'bold'}}>! Please Fill All Fields.</p>:null
   }    
   </div>
                  
                {
                    successPop?
                    <div className='feedback-success'>
                         
                    <h5>! Feedback Submitted Successfully.</h5>
                  <Link className='okbtn-feedback' to={'/homepage'}>Ok</Link>
    
                    </div>:null
                }
               
              

            </div>
            
        </>
    );
}

export default Feedback;

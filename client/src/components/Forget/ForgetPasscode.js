import React,{useState} from 'react'
import './forgetpasscode.css'

import successGif from '../images/success.gif';
import Axios from 'axios';
import {Link} from 'react-router-dom'





export const ForgetPasscode=({closeForgetModal})=> {


    const [SuccessPop, setSuccessPop] = useState(false);
    const [errMsg, setErrMsg] = useState(false);


    const [getEmail, setGetEmail] = useState();

    const forgetPasscode=async(e)=>{
        e.preventDefault()
      const response= await  Axios.post('http://localhost:3002/forgetpasscode',{
        getEmail:getEmail
    })
    
   
    if(response.data?.success){
        
        setSuccessPop(true)
  
    }else{
      // setLoginStatus(response.data[0].uid);
       setErrMsg(true)
    }
    }

    const blurInput=()=>{
        setErrMsg(false)
    }
    
    return (
        
        <>
          
            
                    <div className="Forget-body-popup">
            <div class="Forget-card-form">
  <form class="Forget-signup">
  <div className="Forget-top-section">
      <div class="Forget-form-title">
          <h5>Forgot Passcode</h5></div>
      <div className='Forget-closeBtn'><button onClick={()=>{
          closeForgetModal(false)
      }}>X</button></div>
      </div>

    <div class="Forget-form-body">
      
    
      <div class="Forget-row">
      
      <input type="text" onInput={blurInput} onChange={(e)=>{
          setGetEmail(e.target.value)
      }}  placeholder="Enter Registered E-mail ID*"  />
      
       
     
      
    </div>
   
    <div class="rule-btn">
    <button onClick={forgetPasscode}>Submit</button>
    </div>
    </div>


    {
     errMsg?<p style={{color:'#ff0000',fontWeight:'bold',textAlign:'center',paddingBottom:'15px',fontSize:'12px'}}>! UID Not Resgistered.</p>:null
   }
    {SuccessPop?
    <div>
    <div className="ForgetPop-body-popup">
<div class="ForgetPop-card-form">
<form class="ForgetPop-signup">

<div class="ForgetPop-form-body">
<div  class="ForgetPop-row">
<img src={successGif} alt="" /> 
<h5>! UID and Passcode Sent to Registered E-mail ID Successfully</h5>
<Link className='okBtn' onClick={()=>{
    closeForgetModal(false)
}}  >Ok</Link>
</div>


</div>
</form>
</div>
</div>         
</div>:null
    }
  
  </form>
</div>
</div>         
        </>
    )
}
export default ForgetPasscode;
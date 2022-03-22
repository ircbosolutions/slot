import React from 'react';
import successGif from '../images/success.gif';
import './forgetpop.css'

import {Link} from 'react-router-dom'

const ForgetSuccessPop = ({closeForgetSuccessPop}) => {
    return (
        <div>
                <div className="ForgetPop-body-popup">
            <div class="ForgetPop-card-form">
  <form class="ForgetPop-signup">
  {/* <div className="ForgetPop1-top-section">
      <div class="ForgetPop-form-title">
          <h5>Registraion</h5></div>
      <div className='ForgetPop-closeBtn'><button onClick={()=>{
          closeModal(false)
      }}>X</button></div>
      </div> */}
    
    <div class="ForgetPop-form-body">
      <div  class="ForgetPop-row">
         <img src={successGif} alt="" /> 
        <h5>! UID and Passcode Sent to Registered E-mail ID Successfully</h5>
            <Link className='okBtn'  >Ok</Link>
      </div>
     
  
    </div>
  </form>
</div>
</div>         
        </div>
    );
}

export default ForgetSuccessPop;

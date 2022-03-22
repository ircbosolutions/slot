import React from 'react';
import successGif from '../images/success.gif';
import './donepop.css'
import {Link} from 'react-router-dom'

const DonePop = ({closeDonePop}) => {
    return (
        <div>
                <div className="done1-body-popup">
            <div class="done1-card-form">
  <form class="done1-signup">
  {/* <div className="done11-top-section">
      <div class="done1-form-title">
          <h5>Registraion</h5></div>
      <div className='done1-closeBtn'><button onClick={()=>{
          closeModal(false)
      }}>X</button></div>
      </div> */}
    
    <div class="done1-form-body">
      <div  class="done1-row">
         <img src={successGif} alt="" /> 
        <h5>! User Registered Successfully.</h5>
            <Link className='okBtn'  to='/'>Ok</Link>
      </div>
     
  
    </div>
  </form>
</div>
</div>         
        </div>
    );
}

export default DonePop;

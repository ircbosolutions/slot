import React from 'react';
import './errorpop.css'
import {Link} from 'react-router-dom'

const ErrorPop = ({closeErrorPopup}) => {
    return (
        <>
          
            
        <div className="err1-body-popup">
<div class="err1-card-form">
<form class="err1-signup">
{/* <div className="err1-top-section">
<div class="err1-form-title">
<h5>Registraion</h5></div>
<div className='err1-closeBtn'><button onClick={()=>{
closeModal(false)
}}>X</button></div>
</div> */}

<div class="err1-form-body">
<div  class="err1-row">

<h5 style={{color:'#ff0000',fontWeight:'bold'}}>! Please Fill All Fields.</h5>
<Link className='err1okBtn'  onClick={()=>{
  closeErrorPopup(false)
}}>Ok</Link>
</div>


</div>
</form>
</div>
</div>         
</>
    );
}

export default ErrorPop;

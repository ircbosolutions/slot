import React from 'react';
import '../loginuser/loginuser.css';
import {useState,useEffect} from 'react';
import img1 from '../images/Picture1.png';
import slotimg from '../images/slotlogo2.png';
import loginbanner from '../images/login1.png';
import registerbutton from '../images/rgnow.gif';
import submitBtn from '../images/submit.jpg';
import globeGif from '../images/globe.gif';
import Axios from 'axios';
import auth from '../../Auth';
import globalAccess2 from '../images/global_access2.png'
import resetButton from '../images/reset_passcode.jpg';
import {FaUser,FaLock} from 'react-icons/fa';
import {Link} from 'react-router-dom';
import ForgetPasscode from '../Forget/ForgetPasscode';


const Loginuser = (props) => {

  //comp logo
  useEffect(() => {
    takeLogo()
  }, []);
  const [compLogo, setcompLogo] = useState();
  const [prodLogo, setprodLogo] = useState();
  const takeLogo=()=>{
    Axios.get('http://localhost:3002/getcomplogousr').then((response)=>{
      console.log(response.data.comp_logo)
      let result=response.data
      let img=result.map(function(e){return e.comp_logo})
      let img1=result.map(function(e){return e.pro_logo})
      setcompLogo(img[0])
      setprodLogo(img1[0])
    })
  }
 

  //forget Passcode
  const [ForgetShow, setForgetShow] = useState(false);

  

  const [fillErr, setFillErr] = useState(false);
    const [typeErr, setTypeErr] = useState(false);

  const initialValues ={email:"",password:""};
  const [formValue, setformValue] = useState(initialValues);

 
  const [uid, setUid] = useState();
  const [passcode, setPasscode] = useState();



  
  const loginButton =async()=>{

    if(!uid||!passcode){
      setFillErr(true)
    }
    else{
      const  response=await Axios.post('http://localhost:3002/login',{uid:uid,passcode:passcode})
      // console.log(response.data)
         if(response.data?.success){
            // setLoginStatus(response.data.message);
            
            localStorage.setItem("user",response.data?.message)
            props.history.push('/validating')
            
        }else{
          // setLoginStatus(response.data[0].uid);
          
          setTypeErr(true)
        }
    }
   
    // .then((response)=>{
    //   if(response.data.message){
    //       setLoginStatus(response.data.message);
    //   }else{
    //     // setLoginStatus(response.data[0].uid);
    //    alert('login successful');
    //   }
      
    // })
  }

  const onBlur2=()=>{
    setFillErr(false)
    setTypeErr(false)
}

    return (
      <>
     
        <div className='user-full-homepage'>
        <div className="user-slot-section">
        <nav className='user-nav-bar'>
          <div className="user-logo">
          <img src={compLogo} alt="" />
          </div>
 
          <div className="user-nav-text">
          <h1>SELF LEARNING OPTIMIZATION TOOL</h1>
          </div>
         
        </nav>
              
             <div className="user-grid">
      
               {/* images left side */}
 
               <div className="user-left-section-container">
 
                 <div className="user-img-container">
 
                 <div className="user-slot-img">
                 <img src={prodLogo} alt="" />
                 </div>
                  
 
 
                 <div className="user-world-img">
                 <img src={globeGif} alt="" />
 
                 <div className="user-global_access">
                   
                 <img  src={globalAccess2} alt="" />
                 </div>
 
                 </div>
 
 
                 
                 
 
                 
                 </div>
 
                
               
               </div>
 
                 
 
 
               {/* login form   */}
 
 
               <div className="user-wrapper">
                 <div className="user-title1">
                   <img src={loginbanner} alt="" />
                 </div>
 
                 <form action="#">
                   <div className="user-row">
                     <span><FaUser/></span>
                     
                     <input type="text" placeholder='User ID' onInput={onBlur2}  onChange={(e)=>{
                       setUid(e.target.value)
                     }} />
                   </div>

                   
 
                   <div className="user-row">
 
                     <span><FaLock/></span>
                     
                     <input type="password" placeholder='Passcode' onInput={onBlur2} onChange={(e)=>{
                       setPasscode(e.target.value)
                     }}/>
                        {
     typeErr?<p style={{color:'#ff0000',fontWeight:'bold',marginLeft:'0px',fontSize:'12px'}}>! Invalid UID and Passcode</p>:null
   }
                   </div>
 

                   
                   <div className="user-login-section">
                   
                      <input type="checkbox" id="check"/>
       <label className='rememberme' for="check">Remember me</label><img src={submitBtn} alt="" onClick={()=>{
         auth.login(()=>{
           loginButton()
         })
       }} /></div>
 
                   <div className="bott-text">
                     
                   <div className="user-pass1">Forgot Passcode?<Link href="#" style={{marginLeft:'30px'}} className='registerButton' onClick={()=>{
                     setForgetShow(true)
                   }}>Click Here</Link></div>
                     <div className="user-pass2">Not Registered?<Link href="#" className='registerButton' to={'/user-reg'}><img src={registerbutton} alt="" /></Link>
                  </div>
                  {
     fillErr?<p style={{color:'#ff0000',fontWeight:'bold',marginLeft:'0px',marginTop:'10px',fontSize:'14px'}}>! Please Fill UID and Passcode</p>:null
   }

                   </div>
                 </form>
               </div>
      
 
             </div>

       
             {ForgetShow &&<ForgetPasscode closeForgetModal={setForgetShow}/>}
       </div>
     </div>
     </>
    );
}

export default Loginuser;

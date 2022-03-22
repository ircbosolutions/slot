import React,{useState,useEffect} from 'react'
import Axios from 'axios';
import ExamCam from './ExamCam';
import './examheader.css'

function ExamHeader() {
    
  //comp logo
  useEffect(() => {
    takeLogo()
  }, []);
  const [compLogo, setcompLogo] = useState();
  
  const takeLogo=()=>{
    Axios.get('http://localhost:3002/getcomplogousr').then((response)=>{
      console.log(response.data.comp_logo)
      let result=response.data
      let img=result.map(function(e){return e.comp_logo})
      setcompLogo(img[0])
     
    })
  }

    const [userImg, setUserImg] = useState();
    useEffect(() => {
      getImage()
      getCustId()
    }, []);
      const getImage = ()=>{
        let user= localStorage.getItem("user")
        Axios.get(`http://localhost:3002/userimg/${user}`).then((response)=>{
          console.log(response.data[0].img)
          setUserImg(response.data[0].img);
        
        })
      }
      const [custId, setCustId] = useState();

      const getCustId = ()=>{
        let user= localStorage.getItem("user")
        Axios.get(`http://localhost:3002/custid/${user}`).then((response)=>{
          console.log(response.data[0].cust_id)
          setCustId(response.data[0].cust_id);
        })
      }
    return (
        <>
              <div className="homepage-user">
        <div className="top-nav">
         <div className="comp-logo">
         <img src={compLogo} alt="" />
         </div>
          <div className="homepage-title">
            
            <h1>SELF LEARNING OPTIMIZATION TOOL</h1>
          
          </div>
        
             <div className="profile-container">
                 <div className='photo-container'>
                   <ExamCam className="exam-cam"/>   
                 </div>
          </div>
        </div>
      </div>
      <div className="navbar-section">
         

           <div className="photo-container">
           
           </div>
      </div>
        </>
    )
}

export default ExamHeader;

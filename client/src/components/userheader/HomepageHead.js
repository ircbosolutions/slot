import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import Axios from 'axios';
import auth from '../../Auth';


function HomepageHead(props) {
    
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

     

      useEffect(() => {
        getAdmCustId()
        getCustId()
    }, []);
    useEffect(() => {
     checkEvent()
    },);
    const [custId, setCustId] = useState();
    const [admCustId, setAdmCustId] = useState([]);
    const [courseID, setcourseID] = useState();
    const [courseID2, setcourseID2] = useState();
    const [courseID3, setcourseID3] = useState();

      const getCustId = ()=>{
        let user= localStorage.getItem("user")
        Axios.get(`http://localhost:3002/custid/${user}`).then((response)=>{
          console.log(response.data[0].cust_id)
          setCustId(response.data[0].cust_id);
        })
      }
      

      const getAdmCustId =()=>{
        Axios.get('http://localhost:3002/getadmcustid').then((response)=>{
          let result = response.data
          
          let customerId = result.map(function(e){return e.cust_id})
          let courseId = result.map(function(e){return e.course_id})
          let courseId2 = result.map(function(e){return e.course_id2})
          let courseId3 = result.map(function(e){return e.course_id3})
          console.log(courseId)
          setcourseID(courseId[0])
          console.log(courseId[0])
          setcourseID2(courseId2[0])
          console.log(courseId2[0])
          setcourseID3(courseId3[0])
          console.log(customerId)
          setAdmCustId(customerId)
          
        })
      }

     const [showProgress, setShowProgress] = useState(true);
     const [showError, setShowError] = useState(false);
      const [proceddBtn, setProceddBtn] = useState(false);

      const [takeId1, setTakeId1] = useState();
      const [takeId2, setTakeId2] = useState();
      const [takeId3, setTakeId3] = useState();

      const checkEvent=()=>{
       
        if(admCustId.includes(custId)){
            console.log(courseID[0])
           
        }
        else{
         
        }
      }



      const courseid3Click =(courseID3)=>{

      }
      const courseid2Click =(courseID2)=>{

      }
      const courseid1Click =()=>{
        
        
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
                     <img src={userImg} alt=""  />
                 </div>
           </div>
        </div>
      </div>
      <div className="navbar-section">
           <nav class="navbar">
      {/* <a href="#" class="navbar-logo"
        ><i class="material-icons">fastfood</i> foodRoad</a
      > */}
      <ul class="navbar-links">
        <li class="navbar-dropdown">
          <Link>Course-ID</Link>
          <div class="dropdown">
          <Link to={'/training'} onClick={()=>{window.localStorage.setItem("cour_id1",courseID)}} >{courseID}</Link>
          <Link to={'/training'} onClick={()=>{window.localStorage.setItem("cour_id1",courseID2)}}>{courseID2}</Link>
          <Link to={'/training'} onClick={()=>{window.localStorage.setItem("cour_id1",courseID3)}}>{courseID3}</Link>
          </div>
        </li>
        <li class="navbar-dropdown">
          <Link to={'/feedback'}>Feedback</Link>
          
        </li>
        <li class="navbar-dropdown">
          <a href="#">Exam / Quiz</a>
          <div class="dropdown2">
          <Link to={'/examlist'}>Exam List</Link>
        
          </div>
        </li>
        <li class="navbar-dropdown">
          <Link to={'/helpdesk'} >SLOT Helpdesk</Link>
          
        </li>
        <li class="navbar-dropdown toto2">
          <a href="#">My Progress</a>
          <div class="dropdown2">
          <a href="#">My Cust-ID {custId}</a>
            <a href="#">My Profile</a>
            <a href="#">My Dashboard</a>
          </div>
        </li>
        
        <li class="navbar-dropdown" style={{textAlign:'end'}}>
          <Link onClick={()=>{
            auth.logout(()=>{
              window.location.replace('/')
            })
          }} >Log Out</Link>
        
        </li>


        {/* <li>
          <Redirect to={'/'}/>
        </li> */}
        
      </ul>
           </nav> 

           <div className="photo-container">
           
           </div>
      </div>
        </>
    )
}

export default HomepageHead

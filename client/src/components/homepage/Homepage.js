import {useState,useEffect} from 'react';
import '../homepage/homepage.css'
import arrowGif from '../images/arrow.gif'
import welcomeGif from '../images/welcome.gif';
import successImg from '../images/success1.jpg';
import HomepageHead from '../userheader/HomepageHead';
import axios from 'axios';
function Homepage() {

    

    
  
  
    
  
      const [courseID, setcourseID] = useState();
      const [courseID2, setcourseID2] = useState();
      const [courseID3, setcourseID3] = useState();
      
      const getAdmCustId =()=>{
        axios.get('http://localhost:3002/getadmcustid').then((response)=>{
          let result = response.data
         
          let courseId = result.map(function(e){return e.course_id})
          let courseId2 = result.map(function(e){return e.course_id2})
          let courseId3 = result.map(function(e){return e.course_id3})
        
          console.log(courseId)
          setcourseID(courseId[0])
          setcourseID2(courseId2[0])
          setcourseID3(courseId3[0])
         
        
        })
      }

      useEffect(() => {
        getUidData()
        }, []);
       
        const [getUid, setGetUid] = useState();
       
        const getUidData=()=>{
            let user= localStorage.getItem("user")
            axios.get(`http://localhost:3002/businessuid/${user}`).then((response)=>{
              console.log(response.data[0].businessMail)
              setGetUid(response.data[0].businessMail);
            })
        }



      const sendCourseID1=()=>{
          axios.put('http://localhost:3002/sendcourseid1',{
              course_id1:courseID,
              uid:getUid
          })
      }
      const sendCourseID2=()=>{
        axios.put('http://localhost:3002/sendcourseid2',{
            course_id2:courseID2,
            uid:getUid
        })
    }



    useEffect(() => {
        getAdmCustId()
        sendCourseID1()
        sendCourseID2()
      }, []);
    return (
        
         <>

         <HomepageHead/>
     
      {/* nav bar */}

     
      


    <div className="homepage-body">
  
        <div className="homepage-body-top">
            <div className="body-welcome-img">
            <img src={welcomeGif} alt="" />
            </div>

            <div className="body-qualify-section">

           
                <img src={arrowGif} alt="" />
            </div>
            
            <div className="body-success-section">

                <h3>Steps to qualify</h3>

                <p>Self Learning</p>

                <h2>Attempt Exam</h2>

                <h4>Qualified</h4>

              <img src={successImg} alt="" />
            
            </div>
        </div>
    </div>

       

       

        
    
        
         </>

    )
}

export default Homepage

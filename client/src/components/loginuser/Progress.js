import React,{useState,useEffect} from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom'
import loadingGif from '../images/loading.gif'
import wrongGif from '../images/wrong.gif'
import './progress.css';
import successImg from '../images/success.gif'
import { FaHandPointRight } from 'react-icons/fa';
const Progress = () => {
    const [buttonShow, setButtonShow] = useState(false);
    
  const [usrCustId, setUsrCustId] = useState();
  const [admCustId, setAdmCustId] = useState([]);
    useEffect(() => {
        getAdmCustId()
        getCustId()
    }, []);
    useEffect(() => {
     checkEvent()
     getAdmCustId1()
     takeAllCustData()
    },);
    const [custId, setCustId] = useState();

      const getCustId = ()=>{
        let user= localStorage.getItem("user")
        Axios.get(`http://localhost:3002/custid/${user}`).then((response)=>{
          console.log(response.data[0].cust_id)
          setCustId(response.data[0].cust_id);
        })
      }
      

      const [status, setStatus] = useState([]);

      const getAdmCustId =()=>{
        Axios.get('http://localhost:3002/getadmcustid').then((response)=>{
          let result = response.data
          let customerId = result.map(function(e){return e.cust_id})
          let status = result.map(function(e){return e.status})
          console.log(status)
          setStatus(status)
          console.log(customerId)
          setAdmCustId(customerId)
          
        })
      }

      //check status inactive or active

      const [statusCust, setStatusCust] = useState();

      const takeAllCustData=()=>{
        Axios.get(`http://localhost:3002/checkactive/${custId}`).then((response)=>{
          console.log(response.data)
          let result = response.data
          let status1= result.map(function(e){return e.status})
          setStatusCust(status1[0])

        })
      }
      const [courseID, setcourseID] = useState();
      const [courseID2, setcourseID2] = useState();
      const [courseID3, setcourseID3] = useState();

      const getAdmCustId1 =()=>{
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
          // console.log(response.data[0].cust_id)
          // setAdmCustId(response.data[0].cust_id)
        })
      }

     const [showProgress, setShowProgress] = useState(true);
     const [showError, setShowError] = useState(false);
      const [proceddBtn, setProceddBtn] = useState(false);


      //for later
      // console.log(custId)
      // debugger;
      // Axios.get('http://localhost:3002/getstatususer',{
      //   custId:custId
      // })

      const checkEvent=()=>{

      
       
        if(admCustId.includes(custId) && statusCust ==="Active"){
          console.log('true')
          console.log('true')
          setTimeout(function() {
           setProceddBtn(true)
           setShowProgress(false)
          }, 5000);
        }
        else{
          setTimeout(function(){
            setTimeout(function() {
              setShowProgress(false)
               setShowError(true)
              }, 5000);
          },5000)
         
        }
      }

    
  
    return (

        <>
        <div className="progress-big-container">

          {
            proceddBtn? 
            <div className='sucessMsg'>
            
            <img src={successImg} alt="" />
            <br />
           
            <p>Validated Successfully.</p>
            <br />
       
            <Link className='okBtn1' to={'/homepage'}>Click Here to Start  &nbsp; <FaHandPointRight/> </Link></div>:null
          }

               {
                showProgress?
               <div className="progress-container">
              
                <img src={loadingGif} alt="" />
                <h3>Please Wait... Validating Customer ID</h3>
               
               
                   
                   
            </div>
             :null
            }
             {
                showError?
               <div className="progress-container2">
              
                <img src={wrongGif} alt="" />
                <h3>Oops...Validation Failed...Please Contact Our Support Team </h3>
               
               
                   
                   
            </div>
             :null
            }
        </div>
        </>
    );
}


export default Progress;

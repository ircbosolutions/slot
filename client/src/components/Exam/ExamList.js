import React,{useState,useEffect} from 'react';
import HomepageHead from '../userheader/HomepageHead';
import './examlist.css'
import {Link} from 'react-router-dom';
import AttemptPop from './AttemptPop';
import Axios from 'axios'
const Examlist = (props) => {

    const [attemptPop, setAttemptPop] = useState(false);

    
    useEffect(() => {
      getAdmCustId()
     
    }, []);

  

    const [courseID, setcourseID] = useState();
    const [courseID2, setcourseID2] = useState();
    const [courseID3, setcourseID3] = useState();
    
    const getAdmCustId =()=>{
      Axios.get('http://localhost:3002/getadmcustid').then((response)=>{
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



  

    const [getData, setGetData] = useState([]);

   


//for course id - 2

const [buttonExamC2, setButtonExamC2] = useState(false);
const [buttonExam2C2, setButtonExam2C2] = useState(false);
const [buttonExam3C2, setButtonExam3C2] = useState(false);

   //for second table
   const [getAllDataC2, setGetAllDataC2] = useState([]);

 
 const clickAttempt1C2=(courseID2)=>{

  localStorage.setItem("user_course_id_ind",courseID2)
  window.location.replace('/examc2')
    
}

const clickAttempt2C2=(courseID2)=>{
// const apt2="attempt2"
// const attempt2="Attempt-2"
localStorage.setItem("user_course_id_ind",courseID2)
// localStorage.setItem("user_apt2",apt2)
// localStorage.setItem("user_apt2_text",attempt2)
window.location.replace('/examc22')
  
}

const clickAttempt3C2=(courseID2)=>{
// const apt2="attempt2"
// const attempt2="Attempt-2"
localStorage.setItem("user_course_id_ind",courseID2)
// localStorage.setItem("user_apt2",apt2)
// localStorage.setItem("user_apt2_text",attempt2)
window.location.replace('/examc222')

}







 useEffect(() => {
 getUidData()
 }, []);

 const [getUid, setGetUid] = useState();

 //for hiding table
 const [showBody, setShowBody] = useState(true);
 const getUidData=()=>{
     let user= localStorage.getItem("user")
     Axios.get(`http://localhost:3002/businessuid/${user}`).then((response)=>{
       console.log(response.data[0].businessMail)
       setGetUid(response.data[0].businessMail);
     })
 }

  const [getAllDataResult, setGetAllDataResult] = useState([]);
  const [takeCourseid, setTakeCourseid] = useState();

  function selectCourseID(e){
    const idValue=e.target.value
    console.log(idValue)
    setTakeCourseid(idValue)
    Axios.get('http://localhost:3002/getresultdatausr/'+idValue+"/"+getUid)
    .then((response)=>{
      console.log(response.data)
      setGetAllDataResult(response.data)
    })
  }


  function startExam(e){
    
    e.preventDefault()
    //for result course id 1 attempt 1
    if(takeCourseid==="ISMS-IA")
    {
      localStorage.setItem("user_course_id",takeCourseid)
      props.history.push('/exam')
    }else if(takeCourseid==="ISMS-IND"){
      localStorage.setItem("user_course_id",takeCourseid)
      props.history.push('/examc2')
    }
   
    
   
   
  
  }







    return (
        <>
            <HomepageHead/>
            
            

            <div className="exam_list_container">
                <div className="exam-list-upper-container">
                    <h4><strong>Exam List / Status</strong> :  <i>Maximum Three Attempts allowed to Qualify. </i></h4>
                    <div className="select-course-id-container">
            
            <select id="" onChange={selectCourseID}>
              <option >Select Course-ID</option>
              <option value={courseID}>{courseID}</option>
              <option value={courseID2}>{courseID2}</option>
              <option value={courseID3}>{courseID3}</option>
            </select>

           
            <button onClick={startExam}>Start Exam</button>
          </div>
                </div>

           
      {/* table 0 for course id  */}
      {
        showBody?
        <div className="table-container-examlist">   
      <div>       
     <table>

  <thead>
    <tr>


    <th scope="col">Course ID</th>
      {/* <th scope="col">UID</th> */}
      <th scope="col">Cust-ID</th>
     
      <th scope="col">Attempt</th>
     
      <th scope="col">TFQs Marks</th>
      <th scope="col">SCQs Marks</th>
      <th scope="col">ORQs Marks</th>
      <th scope="col">Total Marks</th>
      <th scope="col">Total %</th>
      <th scope="col">Result Status</th>

    </tr>
  </thead>

  <tbody>
    {
      getAllDataResult.map((val,key)=>{
        return<>
         <tr id="row-attmept1" >
            
            <td>{val.course_id}</td>
      {/* <td>{val.uid}</td> */}
      <td data-label="Amount">{val.cust_id}</td>
      
     <td data-label="Amount">
     
        Attempt-1
      </td>
    
      <td >{val.tfq_sc_apt1}</td>
      <td>{val.scq_sc_apt1}</td>
      <td>{val.orq_sc_apt1}</td>
      <td>{val.tot_sc_apt1}</td>
      <td>{val.percent_apt1} % </td>
      <td>{val.stats_apt1}</td>

    </tr>
      {/* attempt2 */}
    <tr id='row-attempt2'>
      <td >{val.course_id}</td>
      {/* <td>{val.uid}</td> */}
      <td data-label="Amount">{val.cust_id}</td>
      <td data-label="Amount">
      Attempt-2
    
     
      </td>
    
      <td >{val.tfq_sc_apt2}</td>
      <td>{val.scq_sc_apt2}</td>
      <td>{val.orq_sc_apt2}</td>
      <td>{val.tot_sc_apt2}</td>
      <td>{val.percent_apt2} % </td>
      <td>{val.stats_apt2}</td>

    </tr>
    {/* attempt3 */}
    <tr id='row-attempt3'>
      <td >{val.course_id}</td>
      {/* <td>{val.uid}</td> */}
      <td data-label="Amount">{val.cust_id}</td>
      <td data-label="Amount">
      Attempt-3
      </td>
    
      <td >{val.tfq_sc_apt3}</td>
      <td>{val.scq_sc_apt3}</td>
      <td>{val.orq_sc_apt3}</td>
      <td>{val.tot_sc_apt3}</td>
      <td>{val.percent_apt3} % </td>
      <td>{val.stats_apt3}</td>

    </tr>

        </>
      })
    }
  
  </tbody>
     </table>
     </div>
      </div>:null
      }
      


   
<div className="exam-list-upper-container">
                    <Link className='closeBtnExamList' to={'/homepage'}>Close</Link>
                </div>
        </div>
        {
          attemptPop && <AttemptPop closeAttemptPop={setAttemptPop}/>
        }
        </>
    );
}
export default Examlist;

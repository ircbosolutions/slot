import React,{useState,useEffect} from 'react'
import Axios from 'axios';
import {Link} from 'react-router-dom'
import successGif from '../images/success.gif';
import './faultticket.css'
export const FaultTicket=({closeftModal})=> {




  useEffect(() => {
    getUidData()
    }, []);
   
    const [getUid, setGetUid] = useState();
    const [firstName1, setFirstName1] = useState();
    const [lastName1, setLastName1] = useState();
    const getUidData=()=>{
        let user= localStorage.getItem("user")
        Axios.get(`http://localhost:3002/businessuid/${user}`).then((response)=>{
          console.log(response.data[0].businessMail)
          setGetUid(response.data[0].businessMail);
          setFirstName1(response.data[0].firstName)
          setLastName1(response.data[0].lastName)
        })
    }
   
   
   const [getData, setGetData] = useState([]);

    // useEffect(()=>{
    //   fetchData()
    // },[]);


    // const fetchData = ()=>{
    
    //   Axios.get('http://localhost:3001/coursefetchdata').then((response)=>{
    //    setGetData(response.data);
    //  });

    // }
    //cust id for send data
    const [getCustId, setgetCustId] = useState([]);

    useEffect(() => {
      getCustId1()
    }, []);
    const getCustId1 = ()=>{
        let user= localStorage.getItem("user")
        Axios.get(`http://localhost:3002/custid/${user}`).then((response)=>{
          console.log(response.data[0].cust_id)
          setgetCustId(response.data[0].cust_id);
        })
      }



    //send data in  database
    const [ft, setft] = useState();
    const [ftName, setftName] = useState();
    const [courseID, setCourseID] = useState();
    

    //
    
  //for company logo

  const [postImage, setPostImage] = useState();

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  
  today = dd + '/' + mm + '/' + yyyy;
  console.log(today)
  
  var today1=new Date();
  var time = today1.getHours() + ":" + today1.getMinutes() + ":" + today1.getSeconds();
  
  
  console.log(time)
const url = "http://localhost:3002/ftdata";//this is post methhod this have iamge and string data but this is not go in db
const createImage = (newImage) => Axios.post(url,{
  taken: postImage,
  ftName:ftName,
  date:today,
  time:time,
  uid:getUid,
  firstName:firstName1,
  lastName:lastName1,
  getCustId:getCustId
})


  const createPost = async (post) => {
    try {
      await createImage(post);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!ftName){
        
      setErrMsgft(true)
      }
      else{
      
      
       
       
        createPost(postImage);
        setShowBody(false)
        setSuccessPop(true)

       

      }
   
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const [image, setImage] = useState();
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    console.log(base64)
    setPostImage(base64);
    

    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
    
  };



   

     


    const onBlur1=(e)=>{
      setErrMsgft(false)
    }
    //success pop up
    const [SuccessPop, setSuccessPop] = useState(false);
    //for show body
    const [showBody, setShowBody] = useState(true);
    //for Error Message
    const [errMsgft, setErrMsgft] = useState(false);
    return (
        
        <>

                    <div className="ft-body-popup">
            <div class="ft-card-form">
  <form class="ft-signup" >
  <div className="ft-top-section">
      <div class="ft-form-title">
          <h5>Generate New Fault Ticket</h5></div>
        <div className='ft-closeBtn'><button onClick={()=>{
            closeftModal(false)
        }}>X</button></div>
        </div>
    {
      showBody?
      <div class="ft-form-body">
      <div  class="ft-row">
      
       
      </div>
    
      <div class="ft-row">
      <p>Problem Description :</p>
      <input type="text"   onInput={onBlur1} onChange={(e)=>{
          setftName(e.target.value)
      }}/>
      </div>
      <div class="ft-row1">
      <p>Upload Error Screen Shot (PDF,Image) : </p>
      <label class="custom-file-upload">
        {/* file */}
        <input
          type="file"
          label="Image"
          id="gallery-input-file1"
          name="myFile"
          accept=".jpeg, .png, .jpg"
          onChange={(e) => handleFileUpload(e)}
        />
    <br />
    <img height={100} width={100} src={image} alt="preview image" />
    </label>
    </div>
    <div class="rule"></div>
    </div>:null
    }
    

    <div class="ft-row2">
      <button  onClick={handleSubmit} >Submit</button>       
    </div>
    {SuccessPop?
    <div>
    <div className="ForgetPop-body-popup">
<div class="ForgetPop-card-form">
<form class="ForgetPop-signup">

<div class="ForgetPop-form-body">
<div  class="ForgetPop-row">
<img src={successGif} alt="" /> 
<h5>! Fault Ticked Generated Successfully</h5>
<Link className='okBtn' onClick={()=>{
    closeftModal(false)
}}  >Ok</Link>
</div>


</div>
</form>
</div>
</div>         
</div>:null
    }
   {
     errMsgft?<p style={{color:'#ff0000',fontWeight:'bold',marginLeft:'90px'}}>! Please Fill All Fields.</p>:null
   }
  </form>
</div>

</div>         
        </>
    )
}
export default FaultTicket;
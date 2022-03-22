import React, { Component } from 'react';
import axios from 'axios';
import { useState } from 'react';
function AttemptPop()  {
    const [name , setName] = useState();
    const [country , setCountry] = useState();
    const myStyle = {
      width : 250
    }
    const [partData , setPartData] = useState([

    ])

   function handleName(e)  { 
     const totValue=e.target.value
        axios.get('http://localhost:3002/fortest/'+totValue)
       .then( (response) => {
      
      setPartData(response.data)
      console.log(response.data)
   
       })
      .catch(function (error) {
        console.log(error);
      });
        
    }

    
    const [state, setstate] = useState();
    

    
        return (
            <form>
              <div class="container">
              <div class="container" >
              
                 <div className="mb-3">
                 
                  <select class="form-control" style={myStyle} value={name} onChange={handleName}>
                   <option value="">Select</option>
                     <option value="28">Satya </option>
                     <option value="30">kiran</option>
                     <option value="32">mohan</option>
                     <option value="34">ravi</option>
                     <option value="35">chinna</option>

                   </select>
            {
              partData.map((val)=>{
                    return<>
                       <p>{val.uid}</p>
                       <p>{val.cust_id}</p>

                       <input type='text' style={myStyle} class="form-control" onChange={(e)=>{
                         setstate(e.target.value)
                       }} value={val.uid}/>
                    </>
              })
            }
                

                   
                 </div>

                 <div className="mb-3">
                
              

                   
                 </div>

                 <div className="mb-3">
                
                  <input style={myStyle} class="form-control" value={partData.cust_id}/>

                   
                 </div>

              
                 </div>

</div>
            </form>


            
        );
   
}

export default AttemptPop;
import React from 'react'

import Axios from 'axios';
import { useState,useEffect } from 'react';


const Qs=()=> {
    useEffect(() => {
    
        takeData()
        }, []);
      
        const [getData, setGetData] = useState([]);
      
      const takeData=()=>{
       Axios.get('http://localhost:3002/scqsdata').then((response)=>{
              setGetData(response.data)
       })
      
      }
      
       
     const Questions = [
        {
          
          prompt: getData.question,
          optionA: getData.opt1,
          optionB: getData.opt2,
          optionC: getData.opt3,
          optionD:getData.opt4,
          asnwer: getData.c_ans,
        },
        // {
        //   prompt: "What is the approach of ISO 19011:2018 Framework?",
        //   optionA: "Planning & Execution of Audit",
        //   optionB: "Auditor Competency",
        //   optionC: "Start of Audit to End of Audit",
        //   optionD: "PDCA – Plan Do Check Act",
        //   asnwer: "optionD",
        // },
        // {
        //   prompt: "Which one is a wrong question asked by auditor?",
        //   optionA: "Could you please tell me the process you control here, in brief?",
        //   optionB: "How do you secure the information in your process, to safeguard Confidentiality, Integrity and Availability of the information?",
        //   optionC: "Which of you have failed in the internal competency exam on information security, and why you failed?",
        //   optionD: "All of the above",
        //   asnwer: "optionC",
        // },
        // {
        //   prompt: "Which one is not an Audit Principle?",
        //   optionA: "Integrity",
        //   optionB: "Confidentiality, Integrity and Availability",
        //   optionC: "Fair Presentation",
        //   optionD: "Evidence ",
        //   asnwer: "optionB",
        // },
        // {
        //   prompt: "Information Classification is done to..?",
        //   optionA: "Understand the criticality of the impact on organization if that information is breached",
        //   optionB: "Gives a clarity on the value of that information to the organization",
        //   optionC: "Apprt from 1 above, it helps in understanding the impact to the organization, based on this classification",
        //   optionD: "Data Privacy clarity",
        //   asnwer: "optionC",
        // },
      ];

      console.log(Questions.prompt)
  return (
    <div>{Questions.prompt}</div>
  )
}

export default Qs;
import React from 'react'

import Axios from 'axios';
import { useState,useEffect } from 'react';


export const ScqsDataExport=async()=>{

  const courseid2=localStorage.getItem("user_course_id_ind")

  const data=await Axios.get(`http://localhost:3002/scqsdataattempt1c222/${courseid2}`)
 
  return data.data.map((val) => ({
    question: val.question,
    opt1: val.opt1,
    opt2: val.opt2,
    opt3: val.opt3,
    opt4: val.opt4,
    asnwer: val.c_ans,
    marks:val.marks
  }))
}
export const Questions=() =>

[
  {
    
    prompt: "Which has maximum negative Impact on any organization from Information Security Angle?",
    optionA: "Confidentiality ",
    optionB: "Integrity",
    optionC: "Confidentiality & Integrity",
    optionD: "Confidentiality & Availability",
    asnwer: "optionC",
  }
];



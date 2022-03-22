import React from 'react'

import Axios from 'axios';
import { useState,useEffect } from 'react';
export const Tfqsdata=async()=>{


  const courseid=localStorage.getItem("user_course_id")
  const attempt=localStorage.getItem("user_attempt")

  const data=await Axios.get('http://localhost:3002/tfqsdata/'+courseid+"/"+attempt)
  console.log(data.data,"data123")
  return data.data.map((val) => ({
    question: val.question,
    opt1: val.opt1,
    opt2: val.opt2,
    asnwer: val.c_ans,
  }))
}
export const Questions1 = [
  {
    
    prompt: " Confidentiality & Integrity has maximum negative Impact on any organization from Information Security Angle?",
    optionA: "True ",
    optionB: "False",
   
    asnwer: "optionA",
  },

];

const express = require('express');
const bodyParsor =require('body-parser');
const nodemailer = require('nodemailer');
const app = express();
const db = require('./config/db')
const cors=require('cors');
const fs = require("fs");
const multer=require('multer');
const path=require('path')


app.use("/Uploads",express.static(path.join(__dirname,'/Uploads')));

const generator = require('generate-password');

// const upload=multer({storage:multer.memoryStorage()})





// app.get('/',(req,res)=>{
//     const sqlInsert="INSERT INTO customerdatabase.customer_reg(id,firstName,lastName,businessMail,contactNumber,userImg,pincode,city,address) VALUES('4','KMM M','DWIVEDI','TECHNICAL DIRECTOR','9876543210','iMGA','241001','HARDOI','BABA MANIDR');";
//     db.query(sqlInsert,(err,result)=>{
//         res.send('hello akshay');
//     });
// })

app.use(cors());
app.use(express.json());

app.use(bodyParsor.urlencoded({extended:true}))

app.post('/api/insert',(req,res)=>{
    debugger;
    const firstName=req.body.firstName;
    const lastName=req.body.lastName;
    const businessMail =req.body.businessMail;
    const contactNumber=req.body.contactNumber;
    const country=req.body.country;
    const pincode =req.body.pincode;
    const city =req.body.city;
    const address=req.body.address;
    const imgname=req.body.photo;
    const town=req.body.town;
    const landmark=req.body.landmark;
    const custID = req.body.custId;
    let base64Image = imgname.split(';base64,').pop();
    // const image=req.body.photo
    console.log(req.body)
    fs.writeFileSync(`./user_img/${businessMail}_IMG.jpeg`, Buffer.from(base64Image,'base64'));
    
    db.query("INSERT INTO `slot-adm-db`.usr_result_db(uid,cust_id,tfq_sc_apt1,scq_sc_apt1,orq_sc_apt1,tot_sc_apt1,ques_1_apt1,ans_1_apt1,ques_2_apt1,ans_2_apt1,firstName,lastName,ques_3_apt1,ans_3_apt1,ques_4_apt1,ans_4_apt1,ques_5_apt1,ans_5_apt1,percent_apt1,stats_apt1,course_id,tfq_sc_apt2,scq_sc_apt2,orq_sc_apt2,tot_sc_apt2,ques_1_apt2,ans_1_apt2,ques_2_apt2,ans_2_apt2,ques_3_apt2,ans_3_apt2,ques_4_apt2,ans_4_apt2,ques_5_apt2,ans_5_apt2,percent_apt2,stats_apt2,tfq_sc_apt3,scq_sc_apt3,orq_sc_apt3,tot_sc_apt3,ques_1_apt3,ans_1_apt3,ques_2_apt3,ans_2_apt3,ques_3_apt3,ans_3_apt3,ques_4_apt3,ans_4_apt3,ques_5_apt3,ans_5_apt3,percent_apt3,stats_apt3) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",[businessMail,"","","","","","","","","",firstName,lastName,"","","","","","","","Pending","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""],(err,result)=>{
        console.log(err)
    })

    db.query("INSERT INTO `slot-adm-db`.usr_result_db2(uid,cust_id,tfq_sc_apt1,scq_sc_apt1,orq_sc_apt1,tot_sc_apt1,firstName,lastName,ques_1_apt1,ans_1_apt1,ques_2_apt1,ans_2_apt1,ques_3_apt1,ans_3_apt1,ques_4_apt1,ans_4_apt1,ques_5_apt1,ans_5_apt1,percent_apt1,stats_apt1,course_id,tfq_sc_apt2,scq_sc_apt2,orq_sc_apt2,tot_sc_apt2,ques_1_apt2,ans_1_apt2,ques_2_apt2,ans_2_apt2,ques_3_apt2,ans_3_apt2,ques_4_apt2,ans_4_apt2,ques_5_apt2,ans_5_apt2,percent_apt2,stats_apt2,tfq_sc_apt3,scq_sc_apt3,orq_sc_apt3,tot_sc_apt3,ques_1_apt3,ans_1_apt3,ques_2_apt3,ans_2_apt3,ques_3_apt3,ans_3_apt3,ques_4_apt3,ans_4_apt3,ques_5_apt3,ans_5_apt3,percent_apt3,stats_apt3) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",[businessMail,"","","","","",firstName,lastName,"","","","","","","","","","","","Pending","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""],(err,result)=>{
        console.log(err)
    })

 
     db.query("INSERT INTO customerdatabase.customer_reg(firstName,lastName,businessMail,contactNumber,pincode,city,address,country,img,town,landmark,cust_id) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)",[firstName,lastName,businessMail,contactNumber,pincode,city,address,country,imgname,town,landmark,custID],(err,result)=>{
      if(err){
          console.log(err)
      }else{
          res.json(result)
      }

     })


     var password = generator.generate({
        length:10,
        numbers:true
    })
     const sqlInsert1="INSERT INTO customerdatabase.auth_tb(uid,passcode) VALUES(?,?)"
     db.query(sqlInsert1,[businessMail,password],(err,result)=>{

        console.log(err);
        

     })

     db.query("SELECT cust_id FROM `slot-adm-db`.comp_cust_req_db",(err,result)=>{
            if(err){
                console.log(err);
            }else{
                console.log(result);
            }
     })

     db.query("SELECT subject,URL FROM `slot-adm-db`.usr_email_body",(err,result)=>{
        if(err){
            console.log(err)
        }else{
           console.log(result)
            const subject = result[0]?.subject
            const URL = result[0]?.URL
            console.log(subject)
           console.log(URL)
     const output=`

     <h3>Dear ${req.body.firstName} ${req.body.lastName} </h3>
     <p>Thank you for registering with us, your Registration details are as Follows:
     </p>
     <p><b>URL</b> : <a href='${URL}'>${URL}</a></p>
     <p>  <b>UID</b> : ${req.body.businessMail}</p>
     <p> <b>Passcode</b> : <b>${password}</b> </p>
     <p> <b>Customer ID</b> : <b>${custID}</b></p>
     <p><u><b>Caution : Please do not share these credentials. These are only for you and not for outsiders.</b></u></p>
     
     <p>!!! This is an automatically system generated email ? please do not reply to it.</p>

     <p>All the best !</p>

     <p>Thanks & Regards</p>
     <p>SLOT TEAM</p>

     `;
console.log(output)
     
     let transporter = nodemailer.createTransport({
        host: "mail1.accessworld.net",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'no-reply@ircbo.solutions', // generated ethereal user
          pass: 'IRCBOteam#419', // generated ethereal password
        },
      });
    
      // send mail with defined transport object
      let info = transporter.sendMail({
        from: '"no-reply" <no-reply@ircbo.solutions>', // sender address
        to: req.body.businessMail, // list of receivers
        subject: subject, // Subject line
        bcc:'<Support@ircbo.solutions>',
        html: output, // html body
      });
    
      console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }
})
    
})

app.get('/userdata',(req,res)=>{

    
    db.query("SELECT * FROM `slot-adm-db`.usr_email_body",(err,result)=>{
        if(err){
            console.log(err)
        }else{
            
           console.log(result)
            const subject = result[0]?.subject
            const URL = result[0]?.URL
            console.log(subject)
            console.log(URL)
        }
    })
})

app.get('/customerid',(req,res)=>{
    
    db.query("SELECT cust_id FROM `slot-adm-db`.comp_cust_req_db",(err,result)=>{
        if(err){
            console.log(err);
        }else{
            console.log(result);
           
        }
 })
})

app.post('/login',(req,res)=>{

    const uid=req.body.uid;
    const passcode=req.body.passcode;


    // console.log(uid,passcode);

   
    db.query("SELECT passcode FROM customerdatabase.auth_tb WHERE uid = ?",[uid],(err,result)=>{
        if(err){
            res.send({err:err});
        }
        if(result!=undefined){
   
    if(result[0]?.passcode===passcode)res.status(200).json({success:true,message:uid})
            // res.send(result);
            else res.status(200).json({success:false,message:"Wrong Username/Password"})
        }
        else{
            // res.send({messages:"Wrong Username/Password "});
            res.status(200).json({success:false,message:"Wrong Username/Password"})
        }
    })

})

//get admin cust-id 
app.get('/getadmcustid',(req,res)=>{
    
       db.query("SELECT cust_id,course_id,course_id2,course_id3,status FROM `slot-adm-db`.comp_cust_req_db",(err,result)=>{
           if(err){
               console.log(err)
           }else{
               res.send(result)
           }
       })
   })

//get status data from admin database
// app.get('/getstatususer',(req,res)=>{

//     const custId=req.body.custId;
//     console.log(custId)
    
//     db.query('SELECT status FROM `slot-adm-db`.comp_cust_req_db WHERE cust_id=?',[custId],(err,result)=>{
//         console.log(err)
//     })
// })
   
//forget passcode
app.post('/forgetpasscode',(req,res)=>{

        const email=req.body.getEmail;
        var password = generator.generate({
            length:10,
            numbers:true
        })

       
        

        db.query('SELECT uid,passcode FROM  customerdatabase.auth_tb   WHERE uid = ?',[email],(err,result)=>{

            if(err){
                console.log(err)
            }
            if(result!=undefined){
   
                if(result[0]?.uid===email)
                {
                    res.status(200).json({success:true,message:email})
                    const uid = result[0]?.uid
                    const passcode=result[0]?.passcode
                    console.log(uid)
                    console.log(passcode)


                    const output=`

                    <h3>Dear User </h3>
                    <p>Thank you for registering with us, your Registration details are as Follows:
                    </p>

                    <p>  UID : ${uid}</p>
                    <p>  Passcode : <b>${passcode}</b> </p>

                    <p><u><b>Caution : Please do not share these credentials. These are only for you and not for outsiders.</b></u></p>

                    <p>!!! This is an automatically system generated email ? please do not reply to it.</p>

                    <p>All the best !</p>


                    `;


                    let transporter = nodemailer.createTransport({
                    host: "mail1.accessworld.net",
                    port: 587,
                    secure: false, // true for 465, false for other ports
                    auth: {
                    user: 'no-reply@ircbo.solutions', // generated ethereal user
                    pass: 'IRCBOteam#419', // generated ethereal password
                    },
                    });

                    // send mail with defined transport object
                    let info = transporter.sendMail({
                    from: '"no-reply" <no-reply@ircbo.solutions>', // sender address
                    to: req.body.getEmail, // list of receivers
                    subject: "Forgot Password", // Subject line
                    bcc:'<Support@ircbo.solutions>',
                    html: output, // html body
                    });

                    console.log("Message sent: %s", info.messageId);
                    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

                }
                
              
                        // res.send(result);
                        else res.status(200).json({success:false,message:"Wrong Username/Password"})
                    }
                    else{
                        // res.send({messages:"Wrong Username/Password "});
                        res.status(200).json({success:false,message:"Wrong Username/Password"})
                    }

        })

    })




   //get user cust-id 
app.get('/getusrcustid',(req,res)=>{
    
       db.query("SELECT cust_id FROM customerdatabase.customer_reg",(err,result)=>{
           if(err){
               console.log(err)
           }else{
               res.send(result)
           }
       })
})

//User Image Fetch
app.get('/userimg/:user',(req,res)=>{
 let user=req.params.user

    db.query("SELECT img FROM customerdatabase.customer_reg WHERE businessMail = ?",[user],(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
})
//Cust Id Fetch for User
app.get('/custid/:user',(req,res)=>{
    let user=req.params.user
    
       db.query("SELECT cust_id FROM customerdatabase.customer_reg WHERE businessMail = ?",[user],(err,result)=>{
           if(err){
               console.log(err)
           }else{
               res.send(result)
           }
       })
})
//Cust Id Fetch for User
app.get('/businessuid/:user',(req,res)=>{
    let user=req.params.user
    
       db.query("SELECT businessMail,firstName,lastName FROM customerdatabase.customer_reg WHERE businessMail = ?",[user],(err,result)=>{
           if(err){
               console.log(err)
           }else{
               res.send(result)
           }
       })
   })

//for feedback data showing in feedback window
app.get('/feedbackdata',(req,res)=>{
    
       db.query("SELECT * FROM `slot-adm-db`.snd_feedbck_db",(err,result)=>{
           if(err){
               console.log(err)
           }else{
               res.send(result)
           }
       })
   })

//send feedback data in admin db
   app.post('/api/sendfeedback',(req,res)=>{

    const uid=req.body.getUid;
    const custID=req.body.CustId;
    const q1=req.body.q1;
    const q2=req.body.q2;
    const q3=req.body.q3;
    const rv1=req.body.rv1;
    const rv2=req.body.rv2;
    const rv3=req.body.rv3;

    const textBox=req.body.textBox;
    const textBox2=req.body.textBox2;
    const textBox3=req.body.textBox3;
  
    db.query("INSERT INTO `slot-adm-db`.usr_feedbck(uid,cust_id,q1,q1_ans,q2,q2_ans,q3,q3_ans,remrk1,remrk2,remrk3) values(?,?,?,?,?,?,?,?,?,?,?)",[uid,custID,q1,rv1,q2,rv2,q3,rv3,textBox,textBox2,textBox3],(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
})

//send helpdesk data from user image is undefined
app.post('/ftdata',(req,res)=>{//for this
    
    const ft=req.body.taken

    const fileName = req.body.ftName;
    const date =req.body.date;
    const time =req.body.time;
    const status = "In-Progress";
    const uid = req.body.uid;
    const cust_id=req.body.getCustId;
    const firstName=req.body.firstName;
    const lastName=req.body.lastName
    console.log(firstName)
    console.log(lastName)
    console.log(fileName)

   console.log(ft)
    var autoNumer = generator.generate({
        length:3,
        numbers:true,
        lowercase:false,
        uppercase:false
    })
    const ftId="SLOT" + "FT" +autoNumer ;
    const CustomerID = req.body.getCustId;
    db.query("INSERT INTO `slot-adm-db`.usr_hlpdsk(ft_id,date,time,prblm,status,cust_id,rca_rm,ac_rm,ac_date,ac_time,uid,img) values(?,?,?,?,?,?,?,?,?,?,?,?)",[ftId,date,time,fileName,status,CustomerID,"","","","",uid,ft],(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })


//     // email body

//     const output=`

//      <h3>Dear ${firstName} ${lastName} </h3>
//      <p>Our customer Support Team received your Fault Ticket and will begin to work as soon as possible .
//      </p>
//      <p>FT details are as Follows:</p>
//      <p>  <b>Customer ID </b> : ${cust_id}</p>
//      <p>  <b>UID</b> : ${uid}</p>
//      <p>  <b>Fault Ticket-ID</b> : ${ftId}</p>
//      <p>  <b>Problem Description</b>: ${fileName}</p>
    
//      <p>!!! This is an automatically system generated email ? please do not reply to it.</p>

//      <p>All the best !</p>

//      <p>Thanks & Regards</p>
//      <p>SLOT TEAM</p>

//      `;
// console.log(output)
     
//      let transporter = nodemailer.createTransport({
//         host: "mail1.accessworld.net",
//         port: 587,
//         secure: false, // true for 465, false for other ports
//         auth: {
//           user: 'no-reply@ircbo.solutions', // generated ethereal user
//           pass: 'IRCBOteam#419', // generated ethereal password
//         },
//       });
    
//       // send mail with defined transport object
//       let info = transporter.sendMail({
//         from: '"no-reply" <no-reply@ircbo.solutions>', // sender address
//         to: uid, // list of receivers
//         subject: "SLOT - Fault Ticket", // Subject line
//         bcc:'<Support@ircbo.solutions>',
//         html: output, // html body
//       });
    
//       console.log("Message sent: %s", info.messageId);
//         console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    
})
  

//get data for user 
app.get('/getftdata',(req,res)=>{
    
    db.query("SELECT * FROM `slot-adm-db`.usr_hlpdsk",(err,result)=>{
        if(err){
            console.log(err)

        }else{
            res.send(result)
        }
    })
})
//get data for scqs
app.get('/scqsdata',(req,res)=>{
    
    db.query("SELECT * FROM `slot-adm-db`.add_scqs",(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
})
//check data
app.get('/scqsdataattempt1/:courseid/:attempt',(req,res)=>{
    const courseid=req.params.courseid;
    const attempt=req.params.attempt
    const courId=courseid+"-QB"

  
        db.query("SELECT * FROM `slot-adm-db`.add_scqs where attempt = ? and qb_id = ?  ORDER BY RAND() LIMIT 5 ",[attempt,courId],(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result)
            }
        })
 
   
})
//scqs course id 2 and attempt 1
app.get('/scqsdataattempt1c2/:courseid2/:attempt',(req,res)=>{
    const courseid2=req.params.courseid2;
    const attempt=req.params.attempt;
    const courId=courseid2+"-QB"

    console.log(attempt)
    console.log(courId)
    
    db.query("SELECT * FROM `slot-adm-db`.add_scqs where attempt = ? and qb_id = ?  ORDER BY RAND() LIMIT 5 ",[attempt,courId],(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
})
//scqs course id 2 and attempt 2
app.get('/scqsdataattempt1c22/:courseid2',(req,res)=>{
    const courseid2=req.params.courseid2;
    const attempt1 = "attempt2"
    const courId=courseid2+"-QB"
    
    db.query("SELECT * FROM `slot-adm-db`.add_scqs where attempt = ? and qb_id = ?  ORDER BY RAND() LIMIT 5 ",[attempt1,courId],(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
})
//get course id 2 attempt 3
app.get('/scqsdataattempt1c222/:courseid2',(req,res)=>{
    const courseid2=req.params.courseid2;
    const attempt1 = "attempt3"
    const courId=courseid2+"-QB"
    
    db.query("SELECT * FROM `slot-adm-db`.add_scqs where attempt = ? and qb_id = ?  ORDER BY RAND() LIMIT 5 ",[attempt1,courId],(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
})
//get scqs question course id 2 and attempt 2
//get scq data for attempt 2
app.get('/scqsdataattempt2/:courseid',(req,res)=>{
    const courseid=req.params.courseid;
    const attempt1 = "attempt2"
    const courId=courseid+"-QB"
    
    db.query("SELECT * FROM `slot-adm-db`.add_scqs where attempt = ? and qb_id = ?  ORDER BY RAND() LIMIT 5 ",[attempt1,courId],(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
})
//get scq data for attempt 3
app.get('/scqsdataattempt3/:courseid',(req,res)=>{
    const courseid=req.params.courseid;
    const attempt1 = "attempt3"
    const courId=courseid+"-QB"
    
    db.query("SELECT * FROM `slot-adm-db`.add_scqs where attempt = ? and qb_id = ?  ORDER BY RAND() LIMIT 5 ",[attempt1,courId],(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
})

//get data for tfqs
app.get('/tfqsdata/:courseid/:attempt',(req,res)=>{
    const courseid=req.params.courseid
    const courId=courseid+"-QB"
    const attempt=req.params.attempt
    console.log(courId)
    console.log(attempt)
  
        db.query("SELECT * FROM `slot-adm-db`.add_tfqs where attempt = ? and qb_id = ? ORDER BY RAND() LIMIT 5 ;",[attempt,courId],(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result)
            }
        })
   
})
//get tfqs data for attempt 2
app.get('/tfqsdata2/:courseid',(req,res)=>{
    const courseid=req.params.courseid
    const attempt1 = "attempt2"
    const courId=courseid+"-QB"
    db.query("SELECT * FROM `slot-adm-db`.add_tfqs where attempt = ? and qb_id = ? ORDER BY RAND() LIMIT 5 ;",[attempt1,courId],(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
})
//get tfqs data for attempt 3
app.get('/tfqsdata3/:courseid',(req,res)=>{
    const courseid=req.params.courseid
    const attempt1 = "attempt3"
    const courId=courseid+"-QB"
    db.query("SELECT * FROM `slot-adm-db`.add_tfqs where attempt = ? and qb_id = ? ORDER BY RAND() LIMIT 5 ;",[attempt1,courId],(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
})
//get tfqs data for course id 2 attempt 1
app.get('/tfqsdatac2/:courseid2/:attempt',(req,res)=>{
    const courseid2=req.params.courseid2
    const courId=courseid2+"-QB"
    const attempt=req.params.attempt
    console.log(courId)
    console.log(attempt)
    db.query("SELECT * FROM `slot-adm-db`.add_tfqs where attempt = ? and qb_id = ? ORDER BY RAND() LIMIT 5 ;",[attempt,courId],(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
})
//get tfqs data for course id 2 attempt 2
app.get('/tfqsdatac22/:courseid2',(req,res)=>{
    const courseid2=req.params.courseid2
    const attempt1 = "attempt2"
    const courId=courseid2+"-QB"
    db.query("SELECT * FROM `slot-adm-db`.add_tfqs where attempt = ? and qb_id = ? ORDER BY RAND() LIMIT 5 ;",[attempt1,courId],(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
})
//get tfqs data for course id 2 attempt 3
app.get('/tfqsdatac222/:courseid2',(req,res)=>{
    const courseid2=req.params.courseid2
    const attempt1 = "attempt3"
    const courId=courseid2+"-QB"
    db.query("SELECT * FROM `slot-adm-db`.add_tfqs where attempt = ? and qb_id = ? ORDER BY RAND() LIMIT 5 ;",[attempt1,courId],(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
})
//get orqs question 
app.get('/getorqsquesdata/:courseid/:attempt',(req,res)=>{
    const courseid=req.params.courseid
    const courid=courseid+"-QB"
    const attempt=req.params.attempt
    console.log(courid)
    console.log(attempt)
    
        db.query('SELECT * FROM `slot-adm-db`.add_orqs where attempt = ? and qb_id = ? ORDER BY RAND() LIMIT 5 ;',[attempt,courid],(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result)
            }
        })
    
    
})
//get orqs data for attempt 2
app.get('/getorqsquesdata2/:courseid',(req,res)=>{
    const courseid=req.params.courseid
    const attempt1="attempt2"
    const courid=courseid+"-QB"
    db.query('SELECT * FROM `slot-adm-db`.add_orqs where attempt = ? and qb_id = ? ORDER BY RAND() LIMIT 5 ;',[attempt1,courid],(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
})
//get orqs data for attempt 3
app.get('/getorqsquesdata3/:courseid',(req,res)=>{
    const courseid=req.params.courseid
    const attempt1="attempt3"
    const courid=courseid+"-QB"
    db.query('SELECT * FROM `slot-adm-db`.add_orqs where attempt = ? and qb_id = ? ORDER BY RAND() LIMIT 5 ;',[attempt1,courid],(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
})
//get orqs data for Course id 2 and attempt 1
app.get('/getorqsquesdatac2/:courseid2/:attempt',(req,res)=>{
    const courseid2=req.params.courseid2
    const courid=courseid2+"-QB"
    const attempt=req.params.attempt
    console.log(courid)
    console.log(attempt)
    db.query('SELECT * FROM `slot-adm-db`.add_orqs where attempt = ? and qb_id = ? ORDER BY RAND() LIMIT 5 ;',[attempt,courid],(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
})
//get orqs data for course id 2 and attempt 2
app.get('/getorqsquesdatac22/:courseid2',(req,res)=>{
    const courseid2=req.params.courseid2
    const attempt1="attempt2"
    const courid=courseid2+"-QB"
    db.query('SELECT * FROM `slot-adm-db`.add_orqs where attempt = ? and qb_id = ? ORDER BY RAND() LIMIT 5 ;',[attempt1,courid],(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
})
//get orqs data for course id 2 and attempt 3
app.get('/getorqsquesdatac222/:courseid2',(req,res)=>{
    const courseid2=req.params.courseid2
    const attempt1="attempt3"
    const courid=courseid2+"-QB"
    db.query('SELECT * FROM `slot-adm-db`.add_orqs where attempt = ? and qb_id = ? ORDER BY RAND() LIMIT 5 ;',[attempt1,courid],(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
})
// app.get('*', function (req, res) {
//     res.sendFile(__dirname+'index.html');});

// app.get('/random',(req,res)=>{
//     const custID = "ACERGRN9PE"
//     db.query("SELECT COUNT(cust_id) AS result FROM `slot-adm-db`.comp_cust_req_db WHERE cust_id = ?",[custID],(err,result)=>{
//         if(err){
//             console.log(err);
//         }else{
//             console.log(result[0].result);
           
//         }})
// })
//send scqs scored by user in result db
app.put('/sendscqsdatausr',(req,res)=>{
  
    const scqsScore=req.body.score
    const UID=req.body.getUid;
    const cust_id=req.body.CustId;
    const course_id = req.body.course_id;
    const attempt=req.body.attempt;

    console.log(course_id)
    console.log(attempt)

    
    if(course_id==="ISMS-IA" && attempt ==="attempt1"){
        db.query("UPDATE `slot-adm-db`.usr_result_db SET cust_id = ?, scq_sc_apt1 = ? where uid=?",[cust_id,scqsScore,UID],(err,result)=>{
            if(err){
                console.log(err)
    
            }else{
                console.log(result)
            }
        })

    }
    else if(course_id==="ISMS-IA" && attempt ==="attempt2"){
        db.query("UPDATE `slot-adm-db`.usr_result_db SET cust_id = ?, scq_sc_apt2 = ? where uid=?",[cust_id,scqsScore,UID],(err,result)=>{
            if(err){
                console.log(err)
    
            }else{
                console.log(result)
            }
        })
    }  
    else if(course_id==="ISMS-IA" && attempt ==="attempt3"){
        db.query("UPDATE `slot-adm-db`.usr_result_db SET cust_id = ?, scq_sc_apt3 = ? where uid=?",[cust_id,scqsScore,UID],(err,result)=>{
            if(err){
                console.log(err)
    
            }else{
                console.log(result)
            }
        })
    }
    // else if(course_id==="ISMS-IND" && attempt ==="attempt1"){
    //     db.query("UPDATE `slot-adm-db`.usr_result_db2 SET cust_id = ?, scq_sc_apt1 = ? where uid=?",[cust_id,scqsScore,UID],(err,result)=>{
    //         if(err){
    //             console.log(err)
    
    //         }else{
    //             console.log(result)
    //         }
    //     })
    // }
    // else if(course_id==="ISMS-IND" && attempt ==="attempt2"){
    //     db.query("UPDATE `slot-adm-db`.usr_result_db2 SET cust_id = ?, scq_sc_apt2 = ? where uid=?",[cust_id,scqsScore,UID],(err,result)=>{
    //         if(err){
    //             console.log(err)
    
    //         }else{
    //             console.log(result)
    //         }
    //     })
    // }
    // else if(course_id==="ISMS-IND" && attempt ==="attempt3"){
    //     db.query("UPDATE `slot-adm-db`.usr_result_db2 SET cust_id = ?, scq_sc_apt3 = ? where uid=?",[cust_id,scqsScore,UID],(err,result)=>{
    //         if(err){
    //             console.log(err)
    
    //         }else{
    //             console.log(result)
    //         }
    //     })
    // }
    

    
})
//send sqcs scored by user in attempt 2
app.put('/sendscqsdatausr2',(req,res)=>{
  
    const scqsScore=req.body.score
    const UID=req.body.getUid;
    const cust_id=req.body.CustId;
    

    db.query("UPDATE `slot-adm-db`.usr_result_db SET cust_id = ?, scq_sc_apt2 = ? where uid=?",[cust_id,scqsScore,UID],(err,result)=>{
        if(err){
            console.log(err)

        }else{
            console.log(result)
        }
    })
})
//send scqs scored by user in attempt 3
app.put('/sendscqsdatausr3',(req,res)=>{
  
    const scqsScore=req.body.score
    const UID=req.body.getUid;
    const cust_id=req.body.CustId;
    

    db.query("UPDATE `slot-adm-db`.usr_result_db SET cust_id = ?, scq_sc_apt3 = ? where uid=?",[cust_id,scqsScore,UID],(err,result)=>{
        if(err){
            console.log(err)

        }else{
            console.log(result)
        }
    })
})
//send scqs score by user in Course id 2 for attempt 1
app.put('/sendscqsdatausrc2',(req,res)=>{
  
    const scqsScore=req.body.score
    const UID=req.body.getUid;
    const cust_id=req.body.CustId;
    const course_id =req.body.courseid
    const attempt=req.body.attempt
    

    console.log(course_id)
    console.log(attempt)
    
    if(course_id==="ISMS-IND" && attempt==="attempt1"){
         db.query("UPDATE `slot-adm-db`.usr_result_db2 SET cust_id = ?, scq_sc_apt1 = ? where uid=?",[cust_id,scqsScore,UID],(err,result)=>{
        if(err){
            console.log(err)

        }else{
            console.log(result)
        }
    })
    }else if(course_id==="ISMS-IND" && attempt==="attempt2"){
        db.query("UPDATE `slot-adm-db`.usr_result_db2 SET cust_id = ?, scq_sc_apt2 = ? where uid=?",[cust_id,scqsScore,UID],(err,result)=>{
            if(err){
                console.log(err)
    
            }else{
                console.log(result)
            }
        })
    }
    else if(course_id==="ISMS-IND" && attempt==="attempt3"){
        db.query("UPDATE `slot-adm-db`.usr_result_db2 SET cust_id = ?, scq_sc_apt3 = ? where uid=?",[cust_id,scqsScore,UID],(err,result)=>{
            if(err){
                console.log(err)
    
            }else{
                console.log(result)
            }
        })
    }

   
})
//send scqs score by user in course id 2 for attempt 2
app.put('/sendscqsdatausrc22',(req,res)=>{
  
    const scqsScore=req.body.score
    const UID=req.body.getUid;
    const cust_id=req.body.CustId;
    

    db.query("UPDATE `slot-adm-db`.usr_result_db2 SET cust_id = ?, scq_sc_apt2 = ? where uid=?",[cust_id,scqsScore,UID],(err,result)=>{
        if(err){
            console.log(err)

        }else{
            console.log(result)
        }
    })
})
//send scqs score by user in course id 2 for attempt 3
app.put('/sendscqsdatausrc222',(req,res)=>{
    const scqsScore=req.body.score
    const UID=req.body.getUid;
    const cust_id=req.body.CustId;
    db.query("UPDATE `slot-adm-db`.usr_result_db2 SET cust_id = ?, scq_sc_apt3 = ? where uid=?",[cust_id,scqsScore,UID],(err,result)=>{
        if(err){
            console.log(err)

        }else{
            console.log(result)
        }
    })
})
//send tfqs scored by user in db
app.put('/sendtfqsdatausr',(req,res)=>{
    const tfqsScore=req.body.tfqsScore
    const UID = req.body.getUid
    const courseID=req.body.course_id
    const attempt=req.body.attempt

    console.log(courseID)
    console.log(attempt)

    if(courseID==="ISMS-IA" && attempt==="attempt1"){
    db.query("UPDATE `slot-adm-db`.usr_result_db SET  tfq_sc_apt1 = ?,course_id=? where uid=?",[tfqsScore,courseID,UID],(err,result)=>{
        if(err){
            console.log(err)

        }else{
            console.log(result)
        }
    })
}   
else if(courseID==="ISMS-IA" && attempt==="attempt2"){
    db.query("UPDATE `slot-adm-db`.usr_result_db SET  tfq_sc_apt2 = ?,course_id=? where uid=?",[tfqsScore,courseID,UID],(err,result)=>{
        if(err){
            console.log(err)

        }else{
            console.log(result)
        }
    })
}
else if(courseID==="ISMS-IA" && attempt==="attempt3"){
    db.query("UPDATE `slot-adm-db`.usr_result_db SET  tfq_sc_apt3 = ?,course_id=? where uid=?",[tfqsScore,courseID,UID],(err,result)=>{
        if(err){
            console.log(err)

        }else{
            console.log(result)
        }
    })
}
})
//send tfqs scored in attempt 2
app.put('/sendtfqsdatausr2',(req,res)=>{
    const tfqsScore=req.body.tfqsScore
    const UID = req.body.getUid
    const courseID=req.body.courseID
    db.query("UPDATE `slot-adm-db`.usr_result_db SET  tfq_sc_apt2 = ?,course_id=? where uid=?",[tfqsScore,courseID,UID],(err,result)=>{
        if(err){
            console.log(err)

        }else{
            console.log(result)
        }
    })
})
//send tfqs scored in attempt 3
app.put('/sendtfqsdatausr3',(req,res)=>{
    const tfqsScore=req.body.tfqsScore
    const UID = req.body.getUid
    const courseID=req.body.courseID
    db.query("UPDATE `slot-adm-db`.usr_result_db SET  tfq_sc_apt3 = ?,course_id=? where uid=?",[tfqsScore,courseID,UID],(err,result)=>{
        if(err){
            console.log(err)

        }else{
            console.log(result)
        }
    })
})
//send tfqs scored by user in Course id 2 in attempt 1
app.put('/sendtfqsdatausrc2',(req,res)=>{
    const tfqsScore=req.body.tfqsScore
    const UID = req.body.getUid
    const courseID=req.body.courseID
    const attempt =req.body.attempt

    if(courseID==="ISMS-IND" && attempt==="attempt1"){
        db.query("UPDATE `slot-adm-db`.usr_result_db2 SET  tfq_sc_apt1 = ?,course_id=? where uid=?",[tfqsScore,courseID,UID],(err,result)=>{
            if(err){
                console.log(err)
    
            }else{
                console.log(result)
            }
        })
    }
    else if(courseID==="ISMS-IND" && attempt==="attempt2"){
        db.query("UPDATE `slot-adm-db`.usr_result_db2 SET  tfq_sc_apt2 = ?,course_id=? where uid=?",[tfqsScore,courseID,UID],(err,result)=>{
            if(err){
                console.log(err)
    
            }else{
                console.log(result)
            }
        })
    }
    else if(courseID==="ISMS-IND" && attempt==="attempt3"){
        db.query("UPDATE `slot-adm-db`.usr_result_db2 SET  tfq_sc_apt3 = ?,course_id=? where uid=?",[tfqsScore,courseID,UID],(err,result)=>{
            if(err){
                console.log(err)
    
            }else{
                console.log(result)
            }
        })
    }
    
})
//send tfqs scored by user in Course id 2 in attempt 2
app.put('/sendtfqsdatausrc22',(req,res)=>{
    const tfqsScore=req.body.tfqsScore
    const UID = req.body.getUid
    const courseID=req.body.courseID
    db.query("UPDATE `slot-adm-db`.usr_result_db2 SET  tfq_sc_apt2 = ?,course_id=? where uid=?",[tfqsScore,courseID,UID],(err,result)=>{
        if(err){
            console.log(err)

        }else{
            console.log(result)
        }
    })
})
//send tfqs scored by user in Course id 2 in attempt 3
app.put('/sendtfqsdatausrc222',(req,res)=>{
    const tfqsScore=req.body.score
    const UID = req.body.getUid
    const courseID=req.body.courseID
    console.log(tfqsScore)
    console.log(UID)
    console.log(courseID)
    db.query("UPDATE `slot-adm-db`.usr_result_db2 SET  tfq_sc_apt3 = ?,course_id=? where uid=?",[tfqsScore,courseID,UID],(err,result)=>{
        if(err){
            console.log(err)

        }else{
            console.log(result)
        }
    })
})

//send orqs question and answer in evaluator db for marking
app.put('/sendusrorqsdata',(req,res)=>{
    const course_id=req.body.courseID
    const UID = req.body.uid
    const q1=req.body.q1
    const ans1=req.body.ans1
    const q2=req.body.q2
    const ans2=req.body.ans2
    const q3=req.body.q3
    const ans3=req.body.ans3
    const q4=req.body.q4
    const ans4=req.body.ans4
    const q5=req.body.q5
    const ans5=req.body.ans5
    const attempt=req.body.attempt


    if(course_id==="ISMS-IA" && attempt==="attempt1"){
        db.query("UPDATE `slot-adm-db`.usr_result_db SET ques_1_apt1 = ?, ans_1_apt1 = ?, ques_2_apt1 = ?, ans_2_apt1 = ?,ques_3_apt1 = ?, ans_3_apt1 = ?,ques_4_apt1 = ?,ans_4_apt1=?,ques_5_apt1 = ?,ans_5_apt1 = ? where uid = ?",[q1,ans1,q2,ans2,q3,ans3,q4,ans4,q5,ans5,UID],(err,result)=>{
            if(err){
                console.log(err)
    
            }else{
                res.json(result)
            }
        })
    }
    else if(course_id==="ISMS-IA" && attempt==="attempt2"){
        db.query("UPDATE `slot-adm-db`.usr_result_db SET ques_1_apt2 = ?, ans_1_apt2 = ?, ques_2_apt2 = ?, ans_2_apt2 = ?,ques_3_apt2 = ?, ans_3_apt2 = ?,ques_4_apt2 = ?,ans_4_apt2=?,ques_5_apt2 = ?,ans_5_apt2 = ? where uid = ?",[q1,ans1,q2,ans2,q3,ans3,q4,ans4,q5,ans5,UID],(err,result)=>{
            if(err){
                console.log(err)
    
            }else{
                res.json(result)
            }
        })
    }else if(course_id==="ISMS-IA" && attempt==="attempt3"){
        db.query("UPDATE `slot-adm-db`.usr_result_db SET ques_1_atp3 = ?, ans_1_atp3 = ?, ques_2_atp3 = ?, ans_2_atp3 = ?,ques_3_atp3 = ?, ans_3_atp3 = ?,ques_4_atp3 = ?,ans_4_atp3=?,ques_5_atp3 = ?,ans_5_atp3 = ? where uid = ?",[q1,ans1,q2,ans2,q3,ans3,q4,ans4,q5,ans5,UID],(err,result)=>{
            if(err){
                console.log(err)
    
            }else{
                res.json(result)
            }
        })
    }
  

    
})

//send orqs data in course 2 for attempt 1
app.put('/sendusrorqsdatac2',(req,res)=>{
    const UID = req.body.uid
    const q1=req.body.q1
    const ans1=req.body.ans1
    const q2=req.body.q2
    const ans2=req.body.ans2
    const q3=req.body.q3
    const ans3=req.body.ans3
    const q4=req.body.q4
    const ans4=req.body.ans4
    const q5=req.body.q5
    const ans5=req.body.ans5
    const attempt=req.body.attempt
    const course_id = req.body.course_id
    console.log(attempt)
    console.log(course_id)
  
    if(course_id==="ISMS-IND" && attempt ==="attempt1")
    {
        db.query("UPDATE `slot-adm-db`.usr_result_db2 SET ques_1_apt1 = ?, ans_1_apt1 = ?, ques_2_apt1 = ?, ans_2_apt1 = ?,ques_3_apt1 = ?, ans_3_apt1 = ?,ques_4_apt1 = ?,ans_4_apt1=?,ques_5_apt1 = ?,ans_5_apt1 = ? where uid = ?",[q1,ans1,q2,ans2,q3,ans3,q4,ans4,q5,ans5,UID],(err,result)=>{
            if(err){
                console.log(err)
    
            }else{
                console.log(result)
            }
        })
    }
    else if(course_id==="ISMS-IND" && attempt ==="attempt2")
    {
        db.query("UPDATE `slot-adm-db`.usr_result_db2 SET ques_1_apt2 = ?, ans_1_apt2 = ?, ques_2_apt2 = ?, ans_2_apt2 = ?,ques_3_apt2 = ?, ans_3_apt2 = ?,ques_4_apt2 = ?,ans_4_apt2=?,ques_5_apt2 = ?,ans_5_apt2 = ? where uid = ?",[q1,ans1,q2,ans2,q3,ans3,q4,ans4,q5,ans5,UID],(err,result)=>{
            if(err){
                console.log(err)
    
            }else{
                console.log(result)
            }
        })
    }
    else if(course_id==="ISMS-IND" && attempt ==="attempt3")
    {
        db.query("UPDATE `slot-adm-db`.usr_result_db2 SET ques_1_apt3 = ?, ans_1_apt3 = ?, ques_2_apt3 = ?, ans_2_apt3 = ?,ques_3_apt3 = ?, ans_3_apt3 = ?,ques_4_apt3 = ?,ans_4_apt3=?,ques_5_apt3 = ?,ans_5_apt3 = ? where uid = ?",[q1,ans1,q2,ans2,q3,ans3,q4,ans4,q5,ans5,UID],(err,result)=>{
            if(err){
                console.log(err)
    
            }else{
                console.log(result)
            }
        })
    }
    
})

//get scqs score 
app.get('/getscqsperquesdata',(req,res)=>{
    db.query('SELECT scqs_per_ques_marks FROM `slot-adm-db`.dfn_per_ques_mrks',(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
})
//get tfqs score
app.get('/gettfqsperquesdata',(req,res)=>{
    db.query('SELECT tfqs_per_ques_marks FROM `slot-adm-db`.dfn_per_ques_mrks',(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
})


//take result fridging values
app.get('/takeresult/:takeuser',(req,res)=>{
    const takeuser=req.params.takeuser
    console.log(takeuser)
    db.query("SELECT * FROM `slot-adm-db`.usr_result_db where uid = ?",[takeuser],(err,result)=>{
        if(err)
        {
            console.log(err)
        }else{
        res.send(result)
        }
    })
})

//for second course id
app.get('/takeresult2/:takeuser',(req,res)=>{
    const takeuser=req.params.takeuser
    console.log(takeuser)
    db.query("SELECT * FROM `slot-adm-db`.usr_result_db2 where uid = ?",[takeuser],(err,result)=>{
        if(err)
        {
            console.log(err)
        }else{
        res.send(result)
        }
    })
})


//examlist usr result
app.get('/getresultdatausr/:idValue/:getUid',(req,res)=>{
    const idValue=req.params.idValue
    const getUid=req.params.getUid

    if(idValue==="ISMS-IA"){
        db.query('SELECT * FROM `slot-adm-db`.usr_result_db where course_id=? and uid=?',[idValue,getUid],(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result)
            }
        })
    }
    else if(idValue==="ISMS-IND"){
        
        db.query('SELECT * FROM `slot-adm-db`.usr_result_db2 where course_id=? and uid=?',[idValue,getUid],(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result)
            }
        })
    }
})

//send course id in usr result table in db 
app.put('/sendcourseid1',(req,res)=>{
    const course_id=req.body.course_id1
    const uid=req.body.uid
    db.query('UPDATE `slot-adm-db`.usr_result_db SET course_id = ? where uid = ?',[course_id,uid],(err,result)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log(result)
        }
    })
})

app.put('/sendcourseid2',(req,res)=>{
    const course_id2=req.body.course_id2
    const uid=req.body.uid
    db.query('UPDATE `slot-adm-db`.usr_result_db2 SET course_id = ? where uid = ?',[course_id2,uid],(err,result)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log(result)
        }
    })

})


//for fridge button after attempt 1
app.get('/trackmarks/:courseID/:getUid',(req,res)=>{

    const courseID=req.params.courseID
    const getUId=req.params.getUid

    // if(courseID==="ISMS-IA"){
    //     db.query('SELECT * FROM `slot-adm-db`.usr_result_db where course_id = ? and uid = ? ',[courseID,getUId],(err,result)=>{
    //         if(err){
    //             console.log(err)
    //         }else{
    //             res.send(result)
    //         }
    //     })
    // }
    // if(courseID==="ISMS-IND"){
    //     db.query('SELECT * FROM `slot-adm-db`.usr_result_db2 where course_id = ? and uid = ? ',[courseID,getUId],(err,result)=>{
    //         if(err){
    //             console.log(err)
    //         }else{
    //             res.send(result)
    //         }
    //     })
    // }

   
})

//block button of tfq in course id 1 all attempts
app.get('/attempt1tfqblock/:getUid',(req,res)=>{
    const getUid=req.params.getUid
    db.query('SELECT * FROM `slot-adm-db`.usr_result_db where uid = ?',[getUid],(err,result)=>{
        if(err){
            console.log(err)
        }
        else{
            res.send(result)
        }
    })
})
//block button of tfq in course id 1 all attempts
app.get('/attempt2tfqblock/:takeuser',(req,res)=>{
    const takeuser=req.params.takeuser
    db.query('SELECT * FROM `slot-adm-db`.usr_result_db2 where uid = ?',[takeuser],(err,result)=>{
        if(err){
            console.log(err)
        }
        else{
            res.send(result)
        }
    })
})

app.get('/checkactive/:custId',(req,res)=>{
    const custId=req.params.custId

    db.query('SELECT * FROM `slot-adm-db`.comp_cust_req_db where cust_id = ?',[custId],(err,result)=>{
        if(err){
            console.log(err)
        }
        else{
            res.send(result)
        }
    })
})

//change all logos 
app.get('/getcomplogousr',(req,res)=>{
    db.query('SELECT * from `slot-adm-db`.upld_logo',(err,result)=>{
      if(err){
        console.log(err)
  
      }else{
        res.send(result)
      }
    })
  })

app.listen(3002,()=>{
    console.log('running on port 3002');
})
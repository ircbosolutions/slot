const mysql=require('mysql2');
const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"12345",
    database:"customerdatabase",
    // database:"slot-adm-db",
    port:"3306"
})

app.get('/random',(req,res)=>{
    const custID = "ACERGRN9PE"
    db.query("SELECT COUNT(cust_id) AS result FROM `slot-adm-db`.comp_cust_req_db WHERE cust_id = ?",[custID],(err,result)=>{
        if(err){
            console.log(err);
        }else{
            console.log(result[0].result);
           
        }})
})

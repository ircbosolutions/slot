import React,{useState,useEffect} from 'react';
import HomepageHead from '../userheader/HomepageHead';
import './helpdesk.css';
import FaultTicket from './FaultTicket';
import axios from 'axios';

const Helpdesk = () => {
    const [showTicket, setshowTicket] = useState(false);

    const [getFtData, setGetFtData] = useState([]);

    useEffect(() => {
       fetchFtData()
    }, []);

    const [status, setStatus] = useState([]);

    const fetchFtData=()=>{
        axios.get('http://localhost:3002/getftdata').then((response)=>{
            setGetFtData(response.data)
            let res= response.data;
            let status =res.map(function(e){return e.status})
            console.log(status)
            if(status.includes("0")){
                setStatus('In-Progress')
            }
            else{
                setStatus('done')
            }
        })
    }
    return (
        <>
            <HomepageHead/>
        <div className="table-big-container">
            <h2>List of Fault Tickets</h2>
            {showTicket && <FaultTicket closeftModal={setshowTicket}/>}
            <div className="table-container-help">
                <button onClick={()=>{
                    setshowTicket(true)
                }}>New Fault Ticket</button>
                <div>
            <table>

<thead>
  <tr>
    <th scope="col">Customer ID</th>
    <th scope="col">Fault Ticket</th>
    <th scope="col">Log Date</th>
    <th scope="col">Log Time</th>
    <th scope="col">Problem</th>
   
    <th scope="col">RCA Remark</th>
    <th scope="col">Action Remark</th>
    <th scope="col">ACT-Date</th>
    <th scope="col">ACT-Time</th>
    <th scope="col">Status</th>
  </tr>
</thead>
<tbody>
{
                    getFtData.map((val,key)=>{
                        return<>
  <tr>
              
                        <td>{val.cust_id}</td>
                        <td>{val.ft_id}</td>
                        <td>{val.date}</td>
                        <td>{val.time}</td>
                        <td>{val.prblm}</td>
                        <td>{val.rca_rm}</td>
                        <td>{val.ac_rm}</td>
                        <td>{val.ac_date}</td>
                        <td>{val.ac_time}</td>
                        <td>{status}</td>
                     
    
  </tr>
  </>
                    })
                }
    
 
 
</tbody>
</table>
</div>
            </div>
        </div>
     
        </>
    );
}

export default Helpdesk;

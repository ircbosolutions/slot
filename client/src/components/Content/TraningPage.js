import React, { useState,useEffect } from 'react';
import HomepageHead from '../userheader/HomepageHead';
import { Axios } from 'axios';
import vdo from '../images/vdo.mp4'
import './trainingpage.css'
import { Viewer } from '@react-pdf-viewer/core'; // install this library
// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; // install this library
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// Worker
import { Worker } from '@react-pdf-viewer/core'; // install this library

import pdf from '../images/salary.pdf'

function TraningPage() {

    // Create new plugin instance
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    const [pdfViewer, setPdfViewer] = useState(true);
    const [pptViewer, setPptViewer] = useState(false);
    const [vdoViewer, setVdoViewer] = useState(false);


    // useEffect(() => {
    //    getAdmCustId()
    // }, []);


    const [courseID, setcourseID] = useState(localStorage.getItem("cour_id1"));

    // const getAdmCustId =()=>{
    //     Axios.get('http://localhost:3002/getadmcustid').then((response)=>{
    //       let result = response.data
    //       let courseId = result.map(function(e){return e.course_id})
    //       setcourseID(courseId[0])
    //     })
    //   }

  
    const pdfViewerClick=()=>{
        setPdfViewer(true)
        setPptViewer(false)
        setVdoViewer(false)
    }
    const pptViewerClick=()=>{
        setPdfViewer(false)
        setPptViewer(true)
        setVdoViewer(false)
    }
    const vdoViewerClick=()=>{
        setPdfViewer(false)
        setPptViewer(false)
        setVdoViewer(true)
    }


  
    return (
        <>
            <HomepageHead/>
            <div className="train-big-container">
            <h3>Course ID :{courseID} </h3>
            
                 
           <div className="train-container">

                <div className="train-left-container">
              
                <div  className='workerPdf'>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.13.216/build/pdf.worker.min.js">
          <Viewer fileUrl={pdf}
            plugins={[defaultLayoutPluginInstance]} />
           </Worker>
           </div>
                </div>
                <div>
                        
                        </div>
                <div className="train-right-container">
                <div className="train-title-right">
                    
                    <div className="train-right-top-container">
                  
                    <button style={{color:'white'}} onClick={pdfViewerClick}>PDF</button>
                    <button style={{color:'white'}} onClick={pptViewerClick}>PPT</button>
                    <button style={{color:'white'}} onClick={vdoViewerClick}>Videos</button>
                     </div>
                    </div>
                   
                    <div className="train-right-bottom-container">
                        
                        {pdfViewer?
                        <div className="pdfViewer">
                                <h1>PDF Viewer</h1>
                        </div>
                            
                            
                        :null}
                        {pptViewer?
                        <div className="pptViewer">
                                <h1>PPT Viewer</h1>
                        </div>
                            
                        :null}
                        {vdoViewer?
                        <div className="vdoFrame">
                                <video height={200} width={500}  controls autoPlay>
                                <source src={vdo} />
                            </video>
                        </div>
                            
                        :null}
                            
                     </div>
                </div>

           </div>
           </div>
            {/* <Frame scroll="true" width={500} height={500}>
                <Standard/>
            </Frame> */}
          
           <div className="trg-bottom-text">
               <p>Empowered By SLOT </p>
           </div>
            
        </>
    )
}

export default TraningPage

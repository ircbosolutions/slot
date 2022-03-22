import React, { useState } from 'react';
import HomepageHead from '../userheader/HomepageHead';
import loginuser from '../loginuser/Loginuser'
import Standard from './Standard';
import Frame from 'react-frame-component';
import vdo from '../images/vdo.mp4'
import './trainingpage.css'
import pdf from '../images/salary.pdf'

function TrainingPage2() {

    const [pdfViewer, setPdfViewer] = useState(true);
    const [pptViewer, setPptViewer] = useState(false);
    const [vdoViewer, setVdoViewer] = useState(false);


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
            <h3>Course ID : IRCBO/ISMS/IND</h3>
           <div className="train-container">

                <div className="train-left-container">
                 <iframe src={pdf} frameborder="1"></iframe>
                  
                      
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

export default TrainingPage2

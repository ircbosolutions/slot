import React, { Component, useState } from 'react';
import Webcam from 'react-webcam';
import { FaCamera, FaRedoAlt } from 'react-icons/fa';
import '../user_registration/captureimg.css';
import reclickedImg from '../images/reclick.png';
import clickImg from '../images/clicked.png';

const WebcamComponent = () => <Webcam />;


const videoConstraints = {
    width: 130,
    height: 130,
    facingMode: "user"
  };

    

const Captureimg = () => {

    const [image,setImage]=useState('');
    const webcamRef = React.useRef(null);
    
    const capture = React.useCallback(
      () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImage(imageSrc);
        localStorage.setItem('user_image',imageSrc)
      },
      [webcamRef]
    );
    // console.log(image)
    return (
        <>
        <div className="webcam-section">
        <div className="webcam-container">
              <div className="webcam-img">
 
                  {image===''?<Webcam
                     audio={false}
                     height={140}
                     ref={webcamRef}
                     screenshotFormat="image/jpeg"
                     width={140}
                     
                    videoConstraints={videoConstraints}
                  />:<img src={image}/>}
                </div>
      
            </div>

            {/* buttons */}
            <div className='button-section'>
               {image!==''?
                 <button onClick={(e)=>
                    {
                     e.preventDefault();
                     setImage('')
                     localStorage.removeItem("user_image")
                    }}
                    className="webcam-btn1"><img src={reclickedImg} alt="" />
                   </button>:
                <button onClick={(e)=>{
                   e.preventDefault();
                    capture();
                   
                 }}
                id='webcam-btn1' className="webcam-btn"> <img src={clickImg} alt="" /></button>
                }
            </div>
        </div>
           

          

        </>
    );
}

export default Captureimg;

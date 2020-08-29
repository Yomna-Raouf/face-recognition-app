import React from 'react';
import './FaceRecognitionBox.css';

function FaceRecognitionBox( { imageURL, faceBox } ) {
    return (
        <div className="FaceRecognitionBox">
            <div className="FaceRecognitionBox__imageContainer">
                <img id='inputImage' className="FaceRecognitionBox__image" src={ imageURL } alt="" />
                <div 
                 className="FaceRecognitionBox_imageBoundingBox"
                 style={{ 
                    top:faceBox.topRow, 
                    right: faceBox.rightCol, 
                    bottom: faceBox.bottomRow, 
                    left: faceBox.leftCol  
                    }}
                ></div>
            </div>
        </div>
    )
}

export default FaceRecognitionBox


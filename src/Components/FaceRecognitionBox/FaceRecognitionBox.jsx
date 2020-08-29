import React from 'react';
import './FaceRecognitionBox.css';

function FaceRecognitionBox( { imageURL } ) {
    return (
        <div className="FaceRecognitionBox">
            <img src={ imageURL } alt="" />
        </div>
    )
}

export default FaceRecognitionBox


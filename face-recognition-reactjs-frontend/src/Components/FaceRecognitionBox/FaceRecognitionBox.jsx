import React from "react";
import "./FaceRecognitionBox.css";

function FaceRecognitionBox({ imageURL, faceBox }) {
  return (
    <div className="FaceRecognitionBox">
      <div className="FaceRecognitionBox__imageContainer">
        <img
          id="inputImage"
          className="FaceRecognitionBox__image"
          src={imageURL}
          alt=""
        />

        {faceBox.length &&
          faceBox.map((face, index) => (
            <div
              className="FaceRecognitionBox_imageBoundingBox"
              key={index}
              style={{
                top: face.topRow,
                right: face.rightCol,
                bottom: face.bottomRow,
                left: face.leftCol,
              }}
            ></div>
          ))}
      </div>
    </div>
  );
}

export default FaceRecognitionBox;

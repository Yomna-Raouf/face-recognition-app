import React from "react";
import Tilt from "react-tilt";

import "./Logo.css";
import faceDetection from "./identity.svg";

function Logo() {
  return (
    <div className="Logo">
      <Tilt className="Tilt" options={{ max: 45 }}>
        <div className="Tilt-inner">
          <img src={faceDetection} alt="Logo" />
        </div>
      </Tilt>
    </div>
  );
}

export default Logo;

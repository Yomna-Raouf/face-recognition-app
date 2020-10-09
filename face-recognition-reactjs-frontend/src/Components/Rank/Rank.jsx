import React from "react";

import "./Rank.css";

function Rank({ name, rank }) {
  return (
    <div className="Rank">
      <div className="Rank__user">
        <p>{name}, your entry count is </p>
      </div>
      <div className="Rank__score">
        <p>{rank}</p>
      </div>
    </div>
  );
}

export default Rank;

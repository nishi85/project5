import React from "react";

const Leaderboard = props => {
  return (
  <div className = "lbcc">
    <p>Team Name: {props.data.teamName}</p>
    <p>Score: {props.data.score}</p>
    <div className = "imgcontainer">
      <img src={props.data.teamMemberB} alt="" />
    </div>

      <div className ="imgcontainer">
          <img src={props.data.teamMemberA} alt="" />
      </div>
  
  
  </div>
  );
};

export default Leaderboard;

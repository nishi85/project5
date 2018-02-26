import React from "react";

const Leaderboard = props => {
  return (
  <div>
    <p>Team Name: {props.data.teamName}</p>
    <p>Score: {props.data.score}</p>
    <div>
      <img src={props.data.teamMemberA} alt="" />
      <img src={props.data.teamMemberB} alt="" />
    </div>
  </div>
  );
};

export default Leaderboard;

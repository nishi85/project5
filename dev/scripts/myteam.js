import React from "react";
import Roster from "./roster";

const Myteam = (props) => {
    return (
        <div className ="versusPlayer">
                <img src={props.data.img} alt="" />
        </div>
    );
};

export default Myteam;

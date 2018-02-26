import React from "react";

const Roster = (props) => {
    return (
        <div className = "playerCard">
           <p>{props.data.name}</p>
           <img src={props.data.img} alt=""/>
            <p>offence: {props.data.offence} defence:{props.data.defence} </p>
           <button onClick={() => props.addPlayer(props.data)}>Select Player </button>
        </div>
    );
};


export default Roster;
import React from "react";

const Roster = (props) => {
    return (
        <div>
           <p>{props.data.name} offence: {props.data.offence} defence:{props.data.defence} 
           <img src={props.data.img} alt=""/>
           </p>
           <button onClick={() => props.addPlayer(props.data)}>Select button </button>
        </div>
    );
};


export default Roster;
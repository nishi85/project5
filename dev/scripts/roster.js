import React from "react";

const Roster = (props) => {
    return (
        <div className = "playerCard">
           <h3>{props.data.name}</h3>
           <div className ="playerimg">
               <img src={props.data.img} alt=""/>
           </div>
            <p>offence: {props.data.offence} defence:{props.data.defence} </p>
           <button onClick={() => props.addPlayer(props.data)}>Select Player </button>
        </div>
    );
};


export default Roster;
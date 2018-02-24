import React from "react";
import Roster from "./roster";

const Myteam = (props) => {
    return (
        <div>
            <p>{props.data[0].name} offence: {props.data[0].offence} defence:{props.data[0].defence}
                <img src={props.data[0].img} alt="" />
            </p>
        </div>
    );
};

export default Myteam;

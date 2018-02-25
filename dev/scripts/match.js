import React from "react";


function finalOffence(x,y) {
    return x - y;
}

function finalDefence(x, y) {
    return x - y;
}

function pointsFor(x) {
   return Math.floor(Math.random() * (20 + x*1.5) + 100);
}

function pointsAgainst(x) {
    return Math.floor(Math.random() * ((-x) * 2) + 100);
}

function outcome(x,y) {
    if (x >= y) {
        return <p>You scored {x} points and your opponent scored {y}. Congrats you won!</p>;
    }
    return <p>You scored {x} points and your opponent scored {y}. You lost!</p>;
}

class Match extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const teamAOffence = this.props.myTeamOffence;
        const teamADefence = this.props.myTeamDefence;
        const teamBOffence = this.props.oppTeamOffence;
        const teamBDefence = this.props.oppTeamDefence;
        const offenceDifference = finalOffence(teamAOffence, teamBOffence);
        const defenceDifference = finalDefence(teamADefence, teamBDefence);
        const finalPointsFor = pointsFor(offenceDifference);
        const finalPointsAgainst = pointsAgainst(defenceDifference);
        const finalOutcome = outcome(finalPointsFor, finalPointsAgainst);
        return (
            <div>
                <p>My team offence: {teamAOffence}</p>
                <p>My team defence: {teamADefence}</p>
                <p>Opposing team offence: {teamBOffence}</p>
                <p>Opposing team defence: {teamBDefence}</p>
                <p>Difference is {offenceDifference}</p>
                <p>Difference is {defenceDifference}</p>
                <p>{finalOutcome}</p>
            </div>
        );
    }
}


export default Match;
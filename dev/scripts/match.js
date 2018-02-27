import React from "react";


function finalOffence(x,y) {
    return x - y;
}

function finalDefence(x, y) {
    return x - y;
}

function pointsFor(x) {
   return Math.floor(Math.random() * (10 + x*1.5) + 100);
}

function pointsAgainst(x) {
    return Math.floor(Math.random() * ((-x) * 2) + 100);
}

// ---------------

class Match extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            offenceDifference: 0,
            defenceDifference: 0,
            finalPointsFor : 0, 
            finalPointsAgainst : 0, 
            finalOutcome : 0,
            loadReady: false,

        }
        this.loadData = this.loadData.bind(this);
    }

    componentWillReceiveProps(NewProps) {
        if (NewProps.teamsGenerated === true) {
            this.loadData()
        }
    }

    componentWillMount() {
    }
    
     loadData() {
        let { myTeamOffence, myTeamDefence, oppTeamOffence, oppTeamDefence } = this.props;

       const offenceDifference = finalOffence(myTeamOffence, oppTeamOffence);
       const defenceDifference = finalDefence(myTeamDefence, oppTeamDefence);
       const finalPointsFor = pointsFor(offenceDifference);
       const finalPointsAgainst = pointsAgainst(defenceDifference);

       this.setState(
         {
           offenceDifference: offenceDifference,
           defenceDifference: defenceDifference,
           finalPointsFor: finalPointsFor,
           finalPointsAgainst: finalPointsAgainst,
         },
         () => {
           this.setState({ loadReady: true });
         }
        )
        
        this.props.seasonRecord(finalPointsFor, finalPointsAgainst, 1);
     }
    
    render() {
        let { myTeamOffence, myTeamDefence, oppTeamOffence, oppTeamDefence } = this.props;        
        let {offenceDifference, defenceDifference, finalPointsFor, finalPointsAgainst, finalOutcome } = this.state;

        return (
            <div>
                {this.state.loadReady && 
                    <div>
                        <h3>{this.props.message}</h3>
                        <p>Wins: {this.props.wins}</p>
                        <p>Losses:{this.props.losses}</p>
                </div>}
            </div>
            )
    }
}


export default Match;
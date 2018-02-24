import React from 'react';
import ReactDOM from 'react-dom';
import Header from "./header";
import Roster from "./roster";
import Start from "./start";



  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCtLM9zxI65vNJj2HTT-Mf41ZCCBUvpeq8",
    authDomain: "project5nishi.firebaseapp.com",
    databaseURL: "https://project5nishi.firebaseio.com",
    projectId: "project5nishi",
    storageBucket: "",
    messagingSenderId: "400610847898"
  };
  firebase.initializeApp(config);

class App extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        myTeam: [],
        oppTeam: [],
        players:[
                {
                  name: "Nishi",
                  offence: 98,
                  defence: 99,
                  img: "https://files.gamebanana.com/img/ico/sprays/nu8_2.png"
                },

                {
                  name: "Ferd",
                  offence: 95,
                  defence: 95,
                  img: "https://files.gamebanana.com/img/ico/sprays/nu8_2.png"
                },

                {
                  name: "Goku",
                  offence: 99,
                  defence: 90,
                  img: "https://files.gamebanana.com/img/ico/sprays/nu8_2.png"
                },

                {
                  name: "Luffy",
                  offence: 90,
                  defence: 99,
                  img: "https://files.gamebanana.com/img/ico/sprays/nu8_2.png"
                }
       ]
      }
      this.addPlayer = this.addPlayer.bind(this);
      this.generateOppTeam = this.generateOppTeam.bind(this);  
    }


addPlayer(player) {
  if (this.state.myTeam.length <2) {
  console.log('add player');
  const myTeamState = Array.from(this.state.myTeam);
  myTeamState.push(player);
  console.log(myTeamState);
  this.setState({
    myTeam: myTeamState
  })}
}    

generateOppTeam(){
  const oppTeamState = Array.from(this.state.oppTeam);
  for (let i = 0; i < this.state.players.length; i++) {
    if (this.state.players[i] !== this.state.myTeam[i]) {
        oppTeamState.push(this.state.players[i]);
      }
    }
    this.setState({
      oppTeam: oppTeamState
    })
    console.log(this.state.oppTeam);
  }

    render() {
      return (
        <div>
          <Header />

            {this.state.players.map((player) =>{
              return (
              <Roster data={player} key={player.name} addPlayer={this.addPlayer}/>
              )
            })}

            <button onClick={this.generateOppTeam}>Opposing Team</button>

        </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));

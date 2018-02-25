import React from 'react';
import ReactDOM from 'react-dom';
import Header from "./header";
import Roster from "./roster";
import Start from "./start";
import Myteam from "./myteam";
import Match from "./match";



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
        availablePlayers: [],
        myTeamOffence: 0,
        myTeamDefence: 0,
        oppTeam: [],
        oppTeamOffence: 0,
        oppTeamDefence: 0,
        players:[
                {
                  name: "Nishi",
                  offence: 90,
                  defence: 85,
                  id: 1,
                  img: "https://a.wattpad.com/useravatar/Son_Gohan_.256.37706.jpg"
                },

                {
                  name: "Ferd",
                  offence: 95,
                  defence: 95,
                  id: 2,
                  img: "https://pm1.narvii.com/6011/5cc246c01891ff4cba6ea71ddd3dd8b26023abdb_128.jpg"
                },

                {
                  name: "Goku",
                  offence: 99,
                  defence: 90,
                  id: 3,
                  img: "https://files.gamebanana.com/img/ico/sprays/nu8_2.png"
                },

                {
                  name: "Luffy",
                  offence: 90,
                  defence: 99,
                  id: 4,
                  img: "https://files.gamebanana.com/img/ico/sprays/50849c6883a45.png"
                }
       ]
      }
      this.addPlayer = this.addPlayer.bind(this);
      this.generateOppTeam = this.generateOppTeam.bind(this);  
    }


addPlayer(player) {
  if (this.state.myTeam.length <2) {
  const myTeamState = Array.from(this.state.myTeam);
  myTeamState.push(player);
  const availablePlayersState = Array.from(this.state.players);
  availablePlayersState.splice(player, 2)
  this.setState({
    myTeam: myTeamState,
    availablePlayers: availablePlayersState
  }, () => {
     if (this.state.myTeam.length > 1) {
    let defence = [];
    let offence = [];
    this.state.myTeam.map(player => {
        offence.push(player.offence)        
        defence.push(player.defence)
      });
      this.setState({
        myTeamOffence: offence.reduce( (prev, curr) => prev + curr ),
        myTeamDefence: defence.reduce( (prev, curr) => prev + curr )
      } )
    }
  })
  }
}    

generateOppTeam(){
  const oppTeamState = Array.from(this.state.availablePlayers);
  // for (let i = 0; i < this.state.availablePlayers.length - 1; i++) {
  //   if (this.state.availablePlayers[i].id !== this.state.myTeam[i].id) {
  //       oppTeamState.push(this.state.availablePlayers[i]);
  //     }
  //   }
    this.setState({
      oppTeam: oppTeamState
    }, () => {
    let defence = [];
    let offence = [];
    this.state.oppTeam.map(opponent => {
        offence.push(opponent.offence)        
        defence.push(opponent.defence)
      });
      this.setState({
        oppTeamOffence: offence.reduce( (prev, curr) => prev + curr ),
        oppTeamDefence: defence.reduce( (prev, curr) => prev + curr )
      } )
  }
  
  )
    
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
           
            {this.state.myTeam.map((player) =>{
              return (
              <Myteam data={player} key={player.name}/>
              )
            })}

            <h3>vs</h3>
            {this.state.oppTeam.map((player) =>{
              return (
              <Myteam data={player} key={player.name}/>
              )
            })}

            <Match myTeamOffence ={this.state.myTeamOffence}
                   myTeamDefence ={this.state.myTeamDefence}
                   oppTeamOffence ={this.state.oppTeamOffence}
                   oppTeamDefence ={this.state.oppTeamDefence}
            />
            

        </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));


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

// -------

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wins: 0,
      losses: 0,
      message: '',
      calculatedSeasonRecord: false,
      myTeam: [],
      myTeamOffence: 0,
      myTeamDefence: 0,
      oppTeam: [],
      oppTeamOffence: 0,
      oppTeamDefence: 0,
      teamsGenerated: false,
      data: [
        {userName: 'Joe', highscore: 52}
      ],
      players: [
        {
          name: "Nishi",
          offence: 90,
          defence: 80,
          id: 1,
          img: "https://a.wattpad.com/useravatar/Son_Gohan_.256.37706.jpg"
        },

        {
          name: "Ferd",
          offence: 95,
          defence: 75,
          id: 2,
          img:
            "https://pm1.narvii.com/6011/5cc246c01891ff4cba6ea71ddd3dd8b26023abdb_128.jpg"
        },

        {
          name: "Goku",
          offence: 99,
          defence: 80,
          id: 3,
          img: "https://files.gamebanana.com/img/ico/sprays/nu8_2.png"
        },

        {
          name: "Luffy",
          offence: 80,
          defence: 99,
          id: 4,
          img: "https://files.gamebanana.com/img/ico/sprays/50849c6883a45.png"
        }
      ]
    };
    this.addPlayer = this.addPlayer.bind(this);
    this.generateOppTeam = this.generateOppTeam.bind(this);
    this.seasonRecord = this.seasonRecord.bind(this)
    this.resetGame = this.resetGame.bind(this)
  }

  seasonRecord(x, y, times) {
    if (this.state.calculatedSeasonRecord === false) {
      this.setState({ calculatedSeasonRecord: true });

      let winsState, lossState, message;

      winsState = this.state.wins;
      lossState = this.state.losses;

      Array(times)
        .fill()
        .map((_, i) => {

          if (x >= y) {
            winsState = winsState + 1;
            message = (<p>You scored {x} points and your opponent scored {y}. Congrats you won!</p>);
          } else {
            lossState = lossState + 1;
            message = (<p>You scored {x} points and your opponent scored {y}. You lost!</p>)
          }
        })
    
      this.setState({
        wins: winsState,
        losses: lossState,
        message: message
      });

    }
  }

  addPlayer(player) {
    if (this.state.myTeam.length < 2) {
      const myTeamState = Array.from(this.state.myTeam);
      myTeamState.push(player);
      this.setState(
        {
          myTeam: myTeamState
        },
        () => {
          if (this.state.myTeam.length > 1) {
            let defence = [];
            let offence = [];
            this.state.myTeam.map(player => {
              offence.push(player.offence);
              defence.push(player.defence);
            });
            this.setState({
              myTeamOffence: offence.reduce((prev, curr) => prev + curr),
              myTeamDefence: defence.reduce((prev, curr) => prev + curr)
            });
          }
        }
      );
    }
  }

  generateOppTeam() {
    const oppTeamState = [];
    for (let i = 0; i < 2; i++) {
      console.log(i);
      oppTeamState.push(this.state.players[Math.floor(Math.random() * this.state.players.length)]);
      }
    this.setState(
      {
        oppTeam: oppTeamState
      },
      () => {
        let defence = [];
        let offence = [];
        this.state.oppTeam.map(opponent => {
          offence.push(opponent.offence);
          defence.push(opponent.defence);
        });
        this.setState(
          {
            oppTeamOffence: offence.reduce((prev, curr) => prev + curr),
            oppTeamDefence: defence.reduce((prev, curr) => prev + curr)
          },
          () => {
            this.setState({ teamsGenerated: true });
          }
        );
        
      }
    );
  }

  resetGame() {
    this.setState({
      message: '',
      calculatedSeasonRecord: false,
      oppTeam: [],
      teamsGenerated: false
    })
  }

  render() {

    return <div>
        <Header />
        {/* <Leaderboard data={this.state.data} sortBy='highscore' labelBy='username' /> */}
        {this.state.players.map(player => {
          return <Roster data={player} key={player.name} addPlayer={this.addPlayer} />;
        })}
        <button onClick={this.generateOppTeam}>Opposing Team</button>

        {this.state.myTeam.map(player => {
          return <Myteam data={player} key={player.name} />;
        })}

        <h3>vs</h3>
        {this.state.oppTeam.map(player => {
          return <Myteam data={player} key={player.name} />;
        })}

        <Match 
          myTeamOffence={this.state.myTeamOffence} 
          myTeamDefence={this.state.myTeamDefence} 
          oppTeamOffence={this.state.oppTeamOffence} 
          oppTeamDefence={this.state.oppTeamDefence} 
          teamsGenerated={this.state.teamsGenerated} 
          seasonRecord={this.seasonRecord} 
          wins={this.state.wins} 
          losses={this.state.losses} 
          message={this.state.message} />

        <button onClick={this.resetGame}>Reset Game</button>

      </div>;
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

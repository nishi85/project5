
import React from 'react';
import ReactDOM from 'react-dom';
import Header from "./header";
import Roster from "./roster";
import Start from "./start";
import Myteam from "./myteam";
import Match from "./match";
import Leaderboard from "./leaderboard";


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
      h3: '',
      calculatedSeasonRecord: false,
      myTeam: [],
      myTeamOffence: 0,
      myTeamDefence: 0,
      oppTeam: [],
      oppTeamOffence: 0,
      oppTeamDefence: 0,
      teamsGenerated: false,
      score: 0,
      leaderboard: [],
      teamName: '',
      teamMemberA: '',
      teamMemberB:'',
      players: [
        {
          name: "Nishi",
          offence: 90,
          defence: 80,
          id: 1,
          img: "public/assets/nishi.jpg"
        },

        {
          name: "Ferd",
          offence: 95,
          defence: 75,
          id: 2,
          img: "public/assets/ferd.jpg"
        },

        {
          name: "Aaron",
          offence: 99,
          defence: 80,
          id: 3,
          img: "public/assets/aaron.jpg"
        },

        {
          name: "Aathavan",
          offence: 80,
          defence: 99,
          id: 4,
          img: "public/assets/aath.jpg"
        },

        {
          name: "Carolyn",
          offence: 99,
          defence: 80,
          id: 3,
          img: "public/assets/carolyn.jpg"
        },

                {
          name: "Cece",
          offence: 99,
          defence: 80,
          id: 3,
          img: "public/assets/cece.jpg"
        },
        {
          name: "Brent",
          offence: 99,
          defence: 80,
          id: 3,
          img: "public/assets/brent.jpg"
        },
        {
          name: "Joey",
          offence: 99,
          defence: 80,
          id: 3,
          img: "public/assets/Joey.jpg"
        },
        {
          name: "Linda",
          offence: 99,
          defence: 80,
          id: 3,
          img: "public/assets/linda.jpg"
        },
        {
          name: "Natalie R",
          offence: 99,
          defence: 80,
          id: 3,
          img: "public/assets/natalie.jpg"
        },
       {
          name: "Natasha",
          offence: 99,
          defence: 80,
          id: 3,
          img: "public/assets/nat.jpg"
        },
       {
          name: "Natalie V D",
          offence: 99,
          defence: 80,
          id: 3,
          img: "public/assets/nvd.jpg"
        }
      ]
    };
    this.addPlayer = this.addPlayer.bind(this);
    this.generateOppTeam = this.generateOppTeam.bind(this);
    this.seasonRecord = this.seasonRecord.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.addLeaderboard = this.addLeaderboard.bind(this);
  }

  handleChange(e) {
      this.setState({
        [e.target.id]: e.target.value
      });
    }

  seasonRecord(x, y, times) {
    if (this.state.calculatedSeasonRecord === false) {
      this.setState({ calculatedSeasonRecord: true });

      let winsState, lossState, message, scoreState;
      winsState = this.state.wins;
      lossState = this.state.losses;
      scoreState = this.state.score;
          if (x >= y) {
            winsState = winsState + 1;
            message = (<p>You scored {x} points and your opponent scored {y}. Congrats you won!</p>);
            scoreState = scoreState + x;
          } else {
            lossState = lossState + 1;
            message = (<p>You scored {x} points and your opponent scored {y}. You lost!</p>)
            scoreState = scoreState + x;
          }
      this.setState({
        wins: winsState,
        losses: lossState,
        message: message,
        score: scoreState
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


      componentDidMount() {
      const dbref= firebase.database().ref().orderByChild('score');
      // .limitToLast(100);

      dbref.on('value', (snapshot) => {
        const data = snapshot.val();
        const state = [];
        for(let key in data) {
          
          data[key].key = key;
          state.push(data[key]);
        }
        console.log(state);
        this.setState({
          leaderboard: state
        })
      });
    }

  addLeaderboard(e) {
  e.preventDefault();
  const leaderboard = {
    score: this.state.score,
    teamName: this.state.teamName,
    teamMemberA: this.state.myTeam[0].img,
    teamMemberB: this.state.myTeam[1].img,
  };
  const dbref = firebase.database().ref();
  dbref.push(leaderboard);
  this.setState({
    teamName: '',
    teamMemberA: '',
    teamMemberB:'',
    score: 0,
    wins: 0,
    myTeam: []

  });
}

  render() {

    return <div>
        <Header />
        <main>
          <h2>Select your team. Choose 2 players.</h2>
          {this.state.players.map(player => {
            return <Roster data={player} key={player.name} addPlayer={this.addPlayer} />;
          })}
         </main>
         <section className ="versus">
         
          
          {this.state.myTeam.map(player => {
            return <Myteam data={player} key={player.name} />;
          })}

           <div className="btnContainer">
            <button onClick={this.generateOppTeam}>Face off!</button>
         </div>

          <h3>vs</h3>
          {this.state.oppTeam.map(player => {
            return <Myteam data={player} key={player.id} />;
          })}
        </section>

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

        <form onSubmit ={this.addLeaderboard}>
            <label htmlFor="teamName">Team Name:</label>
            <input type="text" value ={this.state.teamName} onChange ={this.handleChange} id="teamName"/>
            <input type="submit" value="Add to Leaderboard" />
          </form>

  {this.state.leaderboard.map((leader) =>{
              return (
               <Leaderboard data={leader} key={leader.key} />
              )
            })}

      </div>
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

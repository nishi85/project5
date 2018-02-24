import React from "react";
import Roster from "./roster";

class Myteam extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <p>
          {this.props.name} offence: {this.props.offence} defence:{
            this.props.defence
          }
          <img src={this.props.img} alt="" />
        </p>
        <button onClick={this.test.bind(this)}>Select player</button>
      </div>
    );
  }
}

export default Myteam;

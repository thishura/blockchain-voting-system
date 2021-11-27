import React, { Component } from 'react';
import './App.css';
import Identicon from 'identicon.js';
import Form from "./Form";
import VoteButton from "./VoteButton";
const bytes32 = require('bytes32');

class Main extends Component {

  render() {
    return (
      <div className="container">
        <Form />
          <button type="button" onClick={(event) => {
              let id = 2
              this.props.vote(id)
          }} className="btn btn-primary vote-button">Проголосовать</button>

          <button type="button" onClick={(event) => {

              const Winner = this.props.getWinner().then(function(result) {
                  console.log(bytes32({ input: result }))

              }, function(err) {
                  console.log(err);
              });



          }} className="btn btn-danger ml-2 vote-button">Результат</button>

          <button type="button" onClick={(event) => {
              this.props.getVotes(0)
              this.props.getVotes(1)
              this.props.getVotes(2)

          }} className="btn btn-success ml-2 vote-button">Голоса</button>

          <button type="button" onClick={(event) => {
              let voters = ["0xDbfC21F511e9f5883aa6461F8f58D777791c236E","0xd7DB3438b3209bBfb6B9745a62A1919490abd527",
                  "0xC5b9fBAd6DA33A475618F2353813239f29435496","0xdA8D9158D368DD5dbA676865E2EB061036ae592a"]

              voters.forEach((voter) => {
                  this.props.giveRight(voter)
              } )
              this.props.giveRight(voters[0])
          }} className="btn btn-warning ml-2 vote-button">Дать права</button>


      </div>
    );
  }
}

export default Main;
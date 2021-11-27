import React from "react";
import './App.css';
import vote from "./App";
const VoteButton = () => {
    return(
    <button type="button" onClick={(event) => {
        let id = 1
      // this.props.vote(id)
        console.log(id)
    }} className="btn btn-primary vote-button">Проголосовать</button>
    );
};

export default VoteButton
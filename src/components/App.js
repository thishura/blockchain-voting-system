import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import Navbar from './Navbar'
import Main from './Main'
import Election from '../abis/Election.json'
import {CandidatesList} from "../CandidatesList"
const bytes32 = require('bytes32');

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }
  async loadBlockchainData() {
    const web3 = window.web3

    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    //const networkId = await web3.eth.net.getId()
    const networkId = await web3.eth.net.getId()

    // Load Election
    const electionData = Election.networks[networkId]
    if (electionData){
      const election = new web3.eth.Contract(Election.abi, electionData.address)
      this.setState({election})

      // Load candidate's votes
       for (let i=0;i<CandidatesList.length;i++) {
         const votes = this.state.election.methods.getCandidateVotes(i).call().then(res => {
           this.setState({
             counted_votes: [...this.state.counted_votes, res.toString(16)]
           })
         })
       }
    }else {
      window.alert('Election contract not deployed to detected network.')
    }

    this.setState({ loading: false })
  }

  giveRight = (address) => {
    this.setState({ loading: true })
    if (this.state.account === '0x4D5438862Aea2b3B854346f31545aC8F03cD57Ea'){
      this.state.election.methods.giveRightToVote(address).send({ from: this.state.account }).on('transactionHash', (hash) => {
      })
    }
    this.setState({ loading: false })
  }
  vote = (id) => {

    console.log(this.state.account)

    this.setState({ loading: true })

    this.state.election.methods.vote(id).send({ from: this.state.account }).on('transactionHash', (hash) => {
    })
    this.setState({ loading: false })
  }

  getWinner = () =>  {
    this.setState({ loading: true })
    let name = this.state.election.methods.winnerName().call().then(res =>
        this.setState({winner_name: bytes32({ input: res })})
    )
    console.log(this.state.winner_name)
    this.setState({ loading: false })
    return name
  }

getVotes = (id)  => {
  console.log(this.state.counted_votes[id])
  }




  constructor(props) {
    super(props)
    this.state = {
      account: '0x00000000000000000000',
      loading: true,
      counted_votes: []
    }
    this.vote = this.vote.bind(this)
  }


  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        { this.state.loading
          ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
          : <Main
                account = {this.state.account}
                vote={this.vote}
                getWinner = {this.getWinner}
                giveRight = {this.giveRight}
                getVotes = {this.getVotes}
                counted_votes = {this.state.counted_votes}
                winner_name = {this.state.winner_name}

            />
          }

      </div>
    );
  }
}

export default App;
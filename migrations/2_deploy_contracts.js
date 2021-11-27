const candidatesList = require("../src/CandidatesList")
const Election = artifacts.require("Election");
const bytes32 = require('bytes32');


let Candidates = []

candidatesList.CandidatesList.forEach((el) => {Candidates.push(bytes32({ input: el }))} )



module.exports = function(deployer) {
    deployer.deploy(Election, Candidates);

};
var SessionContract = artifacts.require("SessionContract");

module.exports = function(deployer) {
  deployer.deploy(SessionContract);
};

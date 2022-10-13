var UsersInformation = artifacts.require("UsersInformation");

module.exports = function(deployer) {
  deployer.deploy(UsersInformation);
};

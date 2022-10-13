var CRPatologicalHistory = artifacts.require("CRPatologicalHistory");

module.exports = function(deployer) {
  deployer.deploy(CRPatologicalHistory);
};

var CRClinicalAssessment = artifacts.require("CRClinicalAssessment");

module.exports = function(deployer) {
  deployer.deploy(CRClinicalAssessment);
};

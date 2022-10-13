// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "./Ownable.sol";
import "./SessionContract.sol";
import "./ProfileModifier.sol";
import "./UsersInformation.sol";
import "./CRSickness.sol";
import "./CRBiologicFunctions.sol";
import "./CRPatologicalHistory.sol";
import "./CRPhysicalExam.sol";
import "./CRSyndromesGeriatricProblems.sol";
import "./CRClinicalAssessment.sol";
import "./CRCommentary.sol";

/**
 * @author Blockchain Clinic Records Team
 * @dev inherits from Ownable to use modifiers
 * @title Controller
 * @notice Contract to mantain the deployed contract addresses on the environment
 */
contract Controller is Ownable {
    SessionContract sessionContract;
    UsersInformation usersInformation;
    CRSickness crSickness;
    CRBiologicFunctions crBiologicFunctions;
    CRPatologicalHistory crPatologicalHistory;
    CRPhysicalExam crPhysicalExam;
    CRSyndromesGeriatricProblems crSyndromesGeriatricProblems;
    CRClinicalAssessment crClinicalAssessment;
    CRCommentary crCommentary;

    // constructor() Ownable(msg.sender) {
    //     sessionContract = new SessionContract();
    //     usersInformation = new UsersInformation();
    // }

    constructor(
        address _sessionContract,
        address _usersInformation,
        address _crSickness,
        address _crBiologicFunctions,
        address _crPatologicalHistory,
        address _crPhysicalExam,
        address _crSyndromeGeriatricProblems,
        address _crClinicalAssessment,
        address _crCommentary
    ) Ownable(msg.sender) {
        sessionContract = SessionContract(_sessionContract);
        usersInformation = UsersInformation(_usersInformation);
        crSickness = CRSickness(_crSickness);
        crBiologicFunctions = CRBiologicFunctions(_crBiologicFunctions);
        crPatologicalHistory = CRPatologicalHistory(_crPatologicalHistory);
        crPhysicalExam = CRPhysicalExam(_crPhysicalExam);
        crSyndromesGeriatricProblems = CRSyndromesGeriatricProblems(
            _crSyndromeGeriatricProblems
        );
        crClinicalAssessment = CRClinicalAssessment(_crClinicalAssessment);
        crCommentary = CRCommentary(_crCommentary);
    }

    function getSessionContractAddress() external view returns (address) {
        return address(sessionContract);
    }

    function getUsersInfoAddress() external view returns (address) {
        return address(usersInformation);
    }
}

// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.7;

import "./ProfileModifier.sol";

struct SyndromesGeriatricProblems {
    int256 date;
    string delirium;
    string vertigo;
    string syncope;
    string incontinence;
    string hearingDeprivation;
    string chronicProtraction;
    string insomnia;
    string constipation;
    string falls;
    string prostatism;
    string chronicPain;
}

/**
 * @author Blockchain Clinic Records Team
 * @dev inherits from ProfileModifier to use modifiers
 * @title CRSyndromesGeriatricProblems
 * @notice Contract to mantain and manage a Clinical Record's Syndromes ang Geriatric Problems of patients
 */
contract CRSyndromesGeriatricProblems is ProfileModifier {
    //maps from patient identifier to SyndromesGeriatricProblems
    mapping(uint256 => SyndromesGeriatricProblems[]) crSyndromesGeriatricProblemsMap;
    uint256 crSyndromesGeriatricProblemsMapLength;

    constructor() {}

    /**
     * @notice retrieves the SyndromesGeriatricProblems info by a given identification of patient
     * @param sessionContractAddress address of the deployed SessionContract instance
     * @param _identification identification of the patient
     * @return SyndromesGeriatricProblems SyndromesGeriatricProblems array
     */
    function getSyndromesGeriatricProblemsByIdentification(
        address sessionContractAddress,
        uint256 _identification
    )
        external
        view
        isMedical(msg.sender, sessionContractAddress)
        returns (SyndromesGeriatricProblems[] memory)
    {
        return crSyndromesGeriatricProblemsMap[_identification];
    }

    /**
     * @notice register a new SyndromesGeriatricProblems info by a given identification of patient
     * @param sessionContractAddress address of the deployed SessionContract instance
     * @param _identification identification of the patient
     * @param _syndromesGeriatricProblems information value with SyndromesGeriatricProblems struct
     * @return SyndromesGeriatricProblems SyndromesGeriatricProblems array
     */
    function addSyndromesGeriatricProblems(
        address sessionContractAddress,
        uint256 _identification,
        SyndromesGeriatricProblems memory _syndromesGeriatricProblems
    )
        external
        isMedical(msg.sender, sessionContractAddress)
        returns (SyndromesGeriatricProblems[] memory)
    {
        crSyndromesGeriatricProblemsMap[_identification].push(
            _syndromesGeriatricProblems
        );
        crSyndromesGeriatricProblemsMapLength;
        return crSyndromesGeriatricProblemsMap[_identification];
    }
}

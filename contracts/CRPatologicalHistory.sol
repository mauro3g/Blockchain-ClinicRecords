// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.7;

import "./ProfileModifier.sol";

struct PatologicalHistory {
    uint256 date;
    string congenitalDiseases;
    string childhoodDiseases;
    string surgicals;
    string transfusions;
    string drugAllergy;
    string harmfullHabits;
    string hospitalizations;
    string other;
}

/**
 * @author Blockchain Clinic Records Team
 * @dev inherits from ProfileModifier to use modifiers
 * @title CRPatologicalHistory
 * @notice Contract to mantain and manage a Clinical Record's Patologycal History of patients
 */
contract CRPatologicalHistory is ProfileModifier {
    mapping(uint256 => PatologicalHistory[]) crPatologicalHistoryMap;
    uint256 crPatologicalHistoryMapLength;

    constructor() {}

    /**
     * @notice retrieves the PatologicalHistory info by a given identification of patient
     * @param sessionContractAddress address of the deployed SessionContract instance
     * @param _identification identification of the patient
     * @return SyndromesGeriatricProblems PatologicalHistory array
     */
    function getPatologicalHistoryByIdentification(
        address sessionContractAddress,
        uint256 _identification
    )
        external
        view
        isMedical(msg.sender, sessionContractAddress)
        returns (PatologicalHistory[] memory)
    {
        return crPatologicalHistoryMap[_identification];
    }

    /**
     * @notice register a new PatologicalHistory info by a given identification of patient
     * @param sessionContractAddress address of the deployed SessionContract instance
     * @param _identification identification of the patient
     * @param _patologicalHistory information value with PatologicalHistory struct
     * @return PatologicalHistory PatologicalHistory array
     */
    function addPatologicalHistory(
        address sessionContractAddress,
        uint256 _identification,
        PatologicalHistory memory _patologicalHistory
    )
        external
        isMedical(msg.sender, sessionContractAddress)
        returns (PatologicalHistory[] memory)
    {
        crPatologicalHistoryMap[_identification].push(_patologicalHistory);
        crPatologicalHistoryMapLength++;
        return crPatologicalHistoryMap[_identification];
    }
}

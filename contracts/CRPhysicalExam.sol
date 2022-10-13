// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.7;

import "./ProfileModifier.sol";

struct PhysicalExam {
    uint256 date;
    string bloodPressure;
    string heartRate;
    string breathingFrequency;
    string weight;
    string size;
    string imc;
    string skin;
    string headNeck;
    string oral;
    string chestLungs;
    string cardiovascular;
    string abdomen;
    string genitourinary;
    string rectalTract;
    string nervousSystem;
    string musculoskeletalSystem;
    string temperature;
}

/**
 * @author Blockchain Clinic Records Team
 * @dev inherits from ProfileModifier to use modifiers
 * @title CRPhysicalExam
 * @notice Contract to mantain and manage a Clinical Record's Physical Exams of patients
 */
contract CRPhysicalExam is ProfileModifier {
    //maps from patient identifier to PhysicalExam
    mapping(uint256 => PhysicalExam[]) crPhysicalExamMap;
    uint256 crPhysicalExamMapLength;

    constructor() {}

    /**
     * @notice retrieves the PhysicalExam info by a given identification of patient
     * @param sessionContractAddress address of the deployed SessionContract instance
     * @param _identification identification of the patient
     * @return PhysicalExam PhysicalExam array
     */
    function getPhysicalExamByIdentification(
        address sessionContractAddress,
        uint256 _identification
    )
        external
        view
        isMedical(msg.sender, sessionContractAddress)
        returns (PhysicalExam[] memory)
    {
        return crPhysicalExamMap[_identification];
    }

    /**
     * @notice register a new PhysicalExam info by a given identification of patient
     * @param sessionContractAddress address of the deployed SessionContract instance
     * @param _identification identification of the patient
     * @param _physicalExam information value with PhysicalExam struct
     * @return PhysicalExam PhysicalExam array
     */
    function addPhysicalExam(
        address sessionContractAddress,
        uint256 _identification,
        PhysicalExam memory _physicalExam
    )
        external
        isMedical(msg.sender, sessionContractAddress)
        returns (PhysicalExam[] memory)
    {
        crPhysicalExamMap[_identification].push(_physicalExam);
        crPhysicalExamMapLength++;
        return crPhysicalExamMap[_identification];
    }
}

// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.7;

import "./ProfileModifier.sol";

struct ClinicalAssessment {
    int256 date;
    bool bath;
    bool dress;
    bool hygienicService;
    bool movilization;
    bool incontinence;
    bool feeding;
}

/**
 * @author Blockchain Clinic Records Team
 * @dev inherits from ProfileModifier to use modifiers
 * @title CRClinicalAssessment
 * @notice Contract to mantain and manage a Clinical Record's Clinical Assessments of patients
 */
contract CRClinicalAssessment is ProfileModifier {
    //maps from patient identifier to ClinicalAssessment
    mapping(uint256 => ClinicalAssessment[]) crClinicalAssessmentMap;
    uint256 crClinicalAssessmentMapLength;

    constructor() {}

    /**
     * @notice retrieves the ClinicalAssessment info by a given identification of patient
     * @param sessionContractAddress address of the deployed SessionContract instance
     * @param _identification identification of the patient
     * @return ClinicalAssessment ClinicalAssessment array
     */
    function getClinicalAssessmentByIdentification(
        address sessionContractAddress,
        uint256 _identification
    )
        external
        view
        isMedical(msg.sender, sessionContractAddress)
        returns (ClinicalAssessment[] memory)
    {
        return crClinicalAssessmentMap[_identification];
    }

    /**
     * @notice register a new ClinicalAssessment info by a given identification of patient
     * @param sessionContractAddress address of the deployed SessionContract instance
     * @param _identification identification of the patient
     * @param _clinicalAssessment information value with ClinicalAssessment struct
     * @return ClinicalAssessment ClinicalAssessment array
     */
    function addClinicalAssessment(
        address sessionContractAddress,
        uint256 _identification,
        ClinicalAssessment memory _clinicalAssessment
    )
        external
        isMedical(msg.sender, sessionContractAddress)
        returns (ClinicalAssessment[] memory)
    {
        crClinicalAssessmentMap[_identification].push(_clinicalAssessment);
        crClinicalAssessmentMapLength++;
        return crClinicalAssessmentMap[_identification];
    }
}

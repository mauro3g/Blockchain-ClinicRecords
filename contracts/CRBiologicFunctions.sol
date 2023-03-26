// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.7;

import "./ProfileModifier.sol";

struct BiologicFunctions {
    int256 date;
    string urination;
    string stools;
    string appetite;
    string thirst;
    string sleep;
    string other;
}

/**
 * @author Blockchain Clinic Records Team
 * @dev inherits from ProfileModifier to use modifiers
 * @title CRBiologicFunctions
 * @notice Contract to mantain and manage a Clinical Record's Biologic Functions of patients
 */
contract CRBiologicFunctions is ProfileModifier {
    //maps from patient identifier to BiologicFunctions
    mapping(uint256 => BiologicFunctions[]) crBiologicFunctionsMap;
    uint256 crBiologicFunctionsMapLength;

    constructor() {}

    /**
     * @notice retrieves the BiologicFunctions info by a given identification of patient
     * @param sessionContractAddress address of the deployed SessionContract instance
     * @param _identification identification of the patient
     * @return BiologicFunctions BiologicFunctions array
     */
    function getBiologicFunctionsByIdentification(
        address sessionContractAddress,
        uint256 _identification
    )
        external
        view
        isMedical(msg.sender, sessionContractAddress)
        returns (BiologicFunctions[] memory)
    {
        return crBiologicFunctionsMap[_identification];
    }

    /**
     * @notice register a new BiologicFunctions info by a given identification of patient
     * @param sessionContractAddress address of the deployed SessionContract instance
     * @param _identification identification of the patient
     * @param _biologicFunctions information value with BiologicFunctions struct
     * @return BiologicFunctions BiologicFunctions array
     */
    function addBiologicFunctions(
        address sessionContractAddress,
        uint256 _identification,
        BiologicFunctions memory _biologicFunctions
    )
        external
        isMedical(msg.sender, sessionContractAddress)
        returns (BiologicFunctions[] memory)
    {
        crBiologicFunctionsMap[_identification].push(_biologicFunctions);
        crBiologicFunctionsMapLength++;
        return crBiologicFunctionsMap[_identification];
    }
}

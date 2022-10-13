// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.7;

import "./ProfileModifier.sol";

struct Commentary {
    uint256 date;
    string comment;
}

/**
 * @author Blockchain Clinic Records Team
 * @dev inherits from ProfileModifier to use modifiers
 * @title CRCommentary
 * @notice Contract to mantain and manage a Clinical Record's Commentaires about patients or Sickness
 */
contract CRCommentary is ProfileModifier {
    //maps from user identification to Comentaries
    mapping(uint256 => Commentary[]) crCommentaryMap;
    uint256 crCommentaryMapLength;

    //maps from sicknessIdentifier to Commentaries
    mapping(string => Commentary[]) crCommentarySicknessMap;
    uint256 crCommentarySicknessMapLength;

    constructor() {}

    /**
     * @notice retrieves the Commentary info by a given identification of patient
     * @param sessionContractAddress address of the deployed SessionContract instance
     * @param _identification identification of the patient
     * @return Commentary Commentary array
     */
    function getCommentaryByIdentification(
        address sessionContractAddress,
        uint256 _identification
    )
        external
        view
        isMedical(msg.sender, sessionContractAddress)
        returns (Commentary[] memory)
    {
        return crCommentaryMap[_identification];
    }

    /**
     * @notice register a new Commentary info by a given identification of patient
     * @param sessionContractAddress address of the deployed SessionContract instance
     * @param _identification identification of the patient
     * @param _commentary information value with Commentary struct
     * @return Commentary Commentary array
     */
    function addCommentary(
        address sessionContractAddress,
        uint256 _identification,
        Commentary memory _commentary
    )
        external
        isMedical(msg.sender, sessionContractAddress)
        returns (Commentary[] memory)
    {
        crCommentaryMap[_identification].push(_commentary);
        crCommentaryMapLength++;
        return crCommentaryMap[_identification];
    }

    /**
     * @notice retrieves the Commentary info by a given identification of a sickness
     * @param sessionContractAddress address of the deployed SessionContract instance
     * @param _sicknessIdentifier identification of the sickness
     * @return Commentary Commentary array
     */
    function getCommentaryBySicknessIdentifier(
        address sessionContractAddress,
        string memory _sicknessIdentifier
    )
        external
        view
        isMedical(msg.sender, sessionContractAddress)
        returns (Commentary[] memory)
    {
        return crCommentarySicknessMap[_sicknessIdentifier];
    }

    /**
     * @notice register a new Commentary info by a given identification of a sickness
     * @param sessionContractAddress address of the deployed SessionContract instance
     * @param _sicknessIdentifier identification of the sickness
     * @param _commentary information value with Commentary struct
     * @return Commentary Commentary array
     */
    function addCommentarySickness(
        address sessionContractAddress,
        string memory _sicknessIdentifier,
        Commentary memory _commentary
    )
        external
        isMedical(msg.sender, sessionContractAddress)
        returns (Commentary[] memory)
    {
        crCommentarySicknessMap[_sicknessIdentifier].push(_commentary);
        crCommentarySicknessMapLength++;
        return crCommentarySicknessMap[_sicknessIdentifier];
    }
}

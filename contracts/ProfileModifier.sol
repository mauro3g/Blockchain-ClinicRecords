// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "./RoleTypes.sol";
import "./SessionContract.sol";

/**
 * @author Blockchain Clinic Records Team
 * @title ProfileModifier
 * @notice Contract to use modifiers which validates users roles
 */
contract ProfileModifier {
    constructor() {}

    /**
     * @notice modifier that validates if a user has an administrator role
     * @param _sender user address eoa
     * @param sessionContract address of the deployed SessionContract instance
     */
    modifier isAdmin(address _sender, address sessionContract) {
        require(
            SessionContract(sessionContract).validateUser(
                _sender,
                uint256(RoleTypes.ADMIN)
            ),
            "sender is not an admin"
        );
        _;
    }

    /**
     * @notice modifier that validates if a user has a doctor role
     * @param _sender user address eoa
     * @param sessionContract address of the deployed SessionContract instance
     */
    modifier isDoctor(address _sender, address sessionContract) {
        require(
            SessionContract(sessionContract).validateUser(
                _sender,
                uint256(RoleTypes.DOCTOR)
            ),
            "sender is not a doctor"
        );
        _;
    }

    /**
     * @notice modifier that validates if a user has a nurse role
     * @param _sender user address eoa
     * @param sessionContract address of the deployed SessionContract instance
     */
    modifier isNurse(address _sender, address sessionContract) {
        require(
            SessionContract(sessionContract).validateUser(
                _sender,
                uint256(RoleTypes.NURSE)
            ),
            "sender is not a nurse"
        );
        _;
    }

    /**
     * @notice modifier that validates if a user has a nurse or doctor role
     * @param _sender user address eoa
     * @param sessionContract address of the deployed SessionContract instance
     */
    modifier isMedical(address _sender, address sessionContract) {
        require(
            SessionContract(sessionContract).validateUser(
                _sender,
                uint256(RoleTypes.DOCTOR)
            ) ||
                SessionContract(sessionContract).validateUser(
                    _sender,
                    uint256(RoleTypes.NURSE)
                ),
            "sender is not a medical"
        );
        _;
    }
}

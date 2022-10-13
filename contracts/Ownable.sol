// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

/**
 * @author Blockchain Clinic Records Team
 * @title Ownable
 * @notice Contract to mantain a contract owner
 */
contract Ownable {
    address internal ownerAddress;
    
    constructor(address _ownerAddress){
        ownerAddress = _ownerAddress;
    }
    
    modifier isOwner(){
        require(ownerAddress == msg.sender, 'you are not the owner');
        _;
    }
}
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.7;

import "./ProfileModifier.sol";

struct PersonalInformation {
    string name;
    uint256 identificationNumber;
    uint256 birthDate;
    string gender;
}

struct Patient {
    PersonalInformation personalInformation;
    string maritalStatus;
    string occupation;
    string direction;
    string contactPerson;
    string phone;
}

struct Medical {
    uint256 userId;
    PersonalInformation personalInformation;
    string speciality;
}

/**
 * @author Blockchain Clinic Records Team
 * @dev inherits from ProfileModifier to use modifiers
 * @title SessionContract
 * @notice Contract to mantain and manage Users, Roles and Sessions
 */
contract UsersInformation is ProfileModifier {
    Patient[] patients;
    Medical[] medicals;

    //mapping from identification to patients index
    //index saves the next value to avoid point to zero
    mapping(uint256 => uint256) patientsMap;
    //mapping from user id to medicals index
    //index saves the next value to avoid point to zero
    mapping(uint256 => uint256) medicalsMap;

    constructor() {}

    /**
     * @notice internal function to create a PersonalInformation struct
     * @param _name client name
     * @param _identificationNumber identification of the client
     * @param _birthDate birth date as uint value
     * @param _gender client gender
     * @return PersonalInformation PersonalInformation struct
     */
    function putPersonalInformation(
        string memory _name,
        uint256 _identificationNumber,
        uint256 _birthDate,
        string memory _gender
    ) internal pure returns (PersonalInformation memory) {
        PersonalInformation memory _personalInformation;
        _personalInformation.name = _name;
        _personalInformation.identificationNumber = _identificationNumber;
        _personalInformation.birthDate = _birthDate;
        _personalInformation.gender = _gender;

        return _personalInformation;
    }

    /**
     * @notice register a new patient with its identification data
     * @dev msg.sender addres should be from a doctor or nurse role
     * @param sessionContractAddress address of the deployed SessionContract instance
     * @param _identificationNumber identification of the client
     * @param _name patient name
     * @param _birthDate patient birth date as uint
     * @param _gender patient gender
     * @param _maritalStatus patient marital status
     * @param _occupation patient occupation
     * @param _direction patient direction
     * @param _contactPerson person to contact for patients eventuelities
     * @param _phone contact phone
     * @custom:modifier isMedical from ProfileModifier
     */
    function addPatient(
        address sessionContractAddress,
        uint256 _identificationNumber,
        string memory _name,
        uint256 _birthDate,
        string memory _gender,
        string memory _maritalStatus,
        string memory _occupation,
        string memory _direction,
        string memory _contactPerson,
        string memory _phone
    ) external isMedical(msg.sender, sessionContractAddress) {
        Patient memory _patient;
        _patient.personalInformation = putPersonalInformation(
            _name,
            _identificationNumber,
            _birthDate,
            _gender
        );
        _patient.maritalStatus = _maritalStatus;
        _patient.occupation = _occupation;
        _patient.direction = _direction;
        _patient.contactPerson = _contactPerson;
        _patient.phone = _phone;

        patients.push(_patient);
        patientsMap[_identificationNumber] = patients.length;
    }

    /**
     * @notice retrieves all patients
     * @dev msg.sender addres should be from a doctor or nurse role
     * @param sessionContractAddress address of the deployed SessionContract instance
     * @custom:modifier isMedical from ProfileModifier
     * @return Patient patients array
     */
    function getPatients(address sessionContractAddress)
        external
        view
        isMedical(msg.sender, sessionContractAddress)
        returns (Patient[] memory)
    {
        return patients;
    }

    /**
     * @notice retrieves a patiens by a given user identification
     * @dev msg.sender addres should be from a doctor or nurse role
     * @param sessionContractAddress address of the deployed SessionContract instance
     * @param userIdentification patients identification
     * @custom:modifier isMedical from ProfileModifier
     * @return Patient patient
     */
    function getPatient(
        address sessionContractAddress,
        uint256 userIdentification
    )
        external
        view
        isMedical(msg.sender, sessionContractAddress)
        returns (Patient memory)
    {
        return patients[patientsMap[userIdentification] - 1];
    }

    /**
     * @notice register a new medical with its identification data
     * @dev msg.sender addres should be from an administrator role
     * @param sessionContractAddress address of the deployed SessionContract instance
     * @param userId id from the created user for the medical
     * @param _identificationNumber identification of the medical
     * @param _name medical name
     * @param _birthDate medical birth date as uint
     * @param _gender medical gender
     * @param _speciality medical specialization
     * @custom:modifier isAdmin from ProfileModifier
     */
    function addMedical(
        address sessionContractAddress,
        uint256 userId,
        string memory _name,
        uint256 _identificationNumber,
        uint256 _birthDate,
        string memory _gender,
        string memory _speciality
    ) external isAdmin(msg.sender, sessionContractAddress) {
        Medical memory _medical;
        _medical.userId = userId;
        _medical.personalInformation = putPersonalInformation(
            _name,
            _identificationNumber,
            _birthDate,
            _gender
        );
        _medical.speciality = _speciality;

        medicals.push(_medical);
        medicalsMap[userId] = medicals.length;
    }

    /**
     * @notice retrieves all medicals
     * @dev msg.sender addres should be from an administrator role
     * @param sessionContractAddress address of the deployed SessionContract instance
     * @custom:modifier isAdmin from ProfileModifier
     * @return Medical medical array
     */
    function getMedicals(address sessionContractAddress)
        external
        view
        isAdmin(msg.sender, sessionContractAddress)
        returns (Medical[] memory)
    {
        return medicals;
    }

    /**
     * @notice retrieves a medical by a given userId
     * @dev msg.sender addres should be from an administrator role
     * @param sessionContractAddress address of the deployed SessionContract instance
     * @param userId user id from SessionsContrtact Users
     * @custom:modifier isAdmin from ProfileModifier
     * @return Medical medical
     */
    function getMedical(address sessionContractAddress, uint256 userId)
        external
        view
        isAdmin(msg.sender, sessionContractAddress)
        returns (Medical memory)
    {
        return medicals[medicalsMap[userId] - 1];
    }
}

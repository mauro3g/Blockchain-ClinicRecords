// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.7;

import "./ProfileModifier.sol";

struct Sickness {
    uint256 registerDate;
    uint256 initialDate;
    string sicknessName;
    string diagnostic;
    string startWay;
    string course;
    string signsSymtoms;
    string treatment;
    string sicknessIdentifier;
}

struct Exam {
    uint256 date;
    string examName;
    string examDetail;
}

struct Result {
    uint256 date;
    string examName;
    string resultDetail;
}

/**
 * @author Blockchain Clinic Records Team
 * @dev inherits from ProfileModifier to use modifiers
 * @title CRSickness
 * @notice Contract to mantain and manage a Clinical Record's Sickness, Exams and Results
 */
contract CRSickness is ProfileModifier {
    // map patient identifier (cedula) to Sickness
    mapping(uint256 => Sickness[]) crSicknessesMap;
    uint256 crSicknessesMapLength;

    // map from uint sicknessIdentifier to Exam
    mapping(string => Exam[]) crExamMap;
    uint256 crExamMapLength;

    // map from uint sicknessIdentifier to Exam
    mapping(string => Result[]) crResultMap;
    uint256 crResultMapLength;

    constructor() {}

    /**
     * @notice retrieves Exams info by a given sickness identifier
     * @param sessionContractAddress address of the deployed SessionContract instance
     * @param _sicknessIdentifier identification of a sickness related with the exams
     * @return Exam Exam array
     */
    function getExamBysicknessIdentifier(
        address sessionContractAddress,
        string memory _sicknessIdentifier
    )
        external
        view
        isMedical(msg.sender, sessionContractAddress)
        returns (Exam[] memory)
    {
        return crExamMap[_sicknessIdentifier];
    }

    /**
     * @notice register a new Exam info by a given sickness identifier
     * @param sessionContractAddress address of the deployed SessionContract instance
     * @param _sicknessIdentifier identification of a sickness related with the exams
     * @param _exam information value with Exam struct
     * @return Exam Exam array
     */
    function addExam(
        address sessionContractAddress,
        string memory _sicknessIdentifier,
        Exam memory _exam
    )
        external
        isMedical(msg.sender, sessionContractAddress)
        returns (Exam[] memory)
    {
        crExamMap[_sicknessIdentifier].push(_exam);
        crExamMapLength++;
        return crExamMap[_sicknessIdentifier];
    }

    /**
     * @notice retrieves Results info by a given sickness identifier
     * @param sessionContractAddress address of the deployed SessionContract instance
     * @param _sicknessIdentifier identification of a sickness related with the retults
     * @return Result Result array
     */
    function getResultBysicknessIdentifier(
        address sessionContractAddress,
        string memory _sicknessIdentifier
    )
        external
        view
        isMedical(msg.sender, sessionContractAddress)
        returns (Result[] memory)
    {
        return crResultMap[_sicknessIdentifier];
    }

    /**
     * @notice register a new Result info by a given  sickness identifier
     * @param sessionContractAddress address of the deployed SessionContract instance
     * @param _sicknessIdentifier identification of a sickness related with the retults
     * @param _result information value with Result struct
     * @return Result Result array
     */
    function addResult(
        address sessionContractAddress,
        string memory _sicknessIdentifier,
        Result memory _result
    )
        external
        isMedical(msg.sender, sessionContractAddress)
        returns (Result[] memory)
    {
        crResultMap[_sicknessIdentifier].push(_result);
        crResultMapLength++;
        return crResultMap[_sicknessIdentifier];
    }

    /**
     * @notice retrieves the Sickness info by a given identification of patient
     * @param sessionContractAddress address of the deployed SessionContract instance
     * @param _identification identification of the patient
     * @return SyndromesGeriatricProblems Sickness array
     */
    function getSicknessByIdentification(
        address sessionContractAddress,
        uint256 _identification
    )
        external
        view
        isMedical(msg.sender, sessionContractAddress)
        returns (Sickness[] memory)
    {
        return crSicknessesMap[_identification];
    }

    /**
     * @notice register a new Sickness info by a given identification of patient
     * @param sessionContractAddress address of the deployed SessionContract instance
     * @param _identification identification of the patient
     * @param _sickness information value with Sickness struct
     * @return Sickness Sickness array
     */
    function addSickness(
        address sessionContractAddress,
        uint256 _identification,
        Sickness memory _sickness
    )
        external
        isMedical(msg.sender, sessionContractAddress)
        returns (Sickness[] memory)
    {
        crSicknessesMap[_identification].push(_sickness);
        crSicknessesMapLength++;
        return crSicknessesMap[_identification];
    }
}

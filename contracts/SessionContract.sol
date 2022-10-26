// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.7;

import "./RoleTypes.sol";

struct Permisions {
    bool create;
    bool modify;
    bool visualize;
}
struct Module {
    uint256 id;
    string name;
}
struct Role {
    uint256 id;
    string name;
    string description;
}
struct User {
    address userAddress;
    uint256 id;
    string username;
    bytes32 password;
    bool state;
}

struct UserRole {
    uint256 userId;
    uint256 roleId;
}

struct ModulePermissions {
    uint256 moduleId;
    Permisions permisions;
}

struct RoleModules {
    uint256 roleId;
    ModulePermissions[] modulePermissions;
}

//interface for returning a session value
struct Session {
    uint256 userId;
    string username;
    bool state;
    uint256 roleId;
}

// Describe identificators for all modules as uint values
enum ModuleIdentificator {
    NONE,
    USERS_MANAGE,
    DOCTORS_MANAGE,
    NURSE_MANAGE,
    PATIENTS_INFO,
    MEDICALS_INFO,
    CR_EXAM_RESULT,
    CR_SICKNESS,
    CR_BIOLOGIC_FUNCTIONS,
    CR_PATOLOGICAL_HISTORY,
    CR_PHYSYCAL_EXAM,
    CR_SYNDROMES_GERIATRIC,
    CR_CLINICAL_ASSESSMENT,
    CR_COMMENTARY
}

/**
 * @author Blockchain Clinic Records Team
 * @title SessionContract
 * @notice Contract to mantain and manage Users, Roles and Sessions
 */
contract SessionContract {
    Module[] modules;
    Role[] roles;
    User[] users;

    //mapping Role id to module id list
    mapping(uint256 => ModulePermissions[]) roleModulesMap;

    //map user address to User index
    //index saves the next value to avoid point to zero
    mapping(address => uint256) usersMap;

    //map user id to RoleIndex
    //index saves the next value to avoid point to zero
    mapping(uint256 => uint256) userRoleMap;

    //initialUser first user address
    address constant initialUser =
        address(0x4ECbd9540F79A38f58d79336D16eC59a0dA247E8);

    /**
     * @dev initialize the Modules, Roles and a first Administrator User
     * @dev first user initializes with the param address and uses admin as a encrypted password, to change it please modify @initialUser values
     */
    constructor() {
        //modulos
        Module memory usersModule = Module(
            uint256(ModuleIdentificator.USERS_MANAGE),
            "Usuarios"
        );
        Module memory doctorsModule = Module(
            uint256(ModuleIdentificator.DOCTORS_MANAGE),
            "Doctores"
        );
        Module memory nurseModule = Module(
            uint256(ModuleIdentificator.NURSE_MANAGE),
            "Enfermeras"
        );
        Module memory patientsModule = Module(
            uint256(ModuleIdentificator.PATIENTS_INFO),
            "Pacientes"
        );
        Module memory medicalsModule = Module(
            uint256(ModuleIdentificator.MEDICALS_INFO),
            "Informacion de Medicos"
        );
        Module memory examResultModule = Module(
            uint256(ModuleIdentificator.CR_EXAM_RESULT),
            "Examenes - Resultados"
        );
        Module memory sicknessResultModule = Module(
            uint256(ModuleIdentificator.CR_SICKNESS),
            "Enfermedades"
        );
        Module memory biologicResultModule = Module(
            uint256(ModuleIdentificator.CR_BIOLOGIC_FUNCTIONS),
            "Funciones Biologicas"
        );
        Module memory patologicResultModule = Module(
            uint256(ModuleIdentificator.CR_PATOLOGICAL_HISTORY),
            "Historial Patologico"
        );
        Module memory physicalResultModule = Module(
            uint256(ModuleIdentificator.CR_PHYSYCAL_EXAM),
            "Examen Fisico"
        );
        Module memory syndromeResultModule = Module(
            uint256(ModuleIdentificator.CR_SYNDROMES_GERIATRIC),
            "Sindromes y problemas geriatricos"
        );
        Module memory clinicalResultModule = Module(
            uint256(ModuleIdentificator.CR_CLINICAL_ASSESSMENT),
            "Registro Clinico"
        );
        Module memory commentaryResultModule = Module(
            uint256(ModuleIdentificator.CR_COMMENTARY),
            "Comentarios"
        );

        modules.push(usersModule);
        modules.push(doctorsModule);
        modules.push(nurseModule);
        modules.push(patientsModule);
        modules.push(medicalsModule);
        modules.push(examResultModule);
        modules.push(sicknessResultModule);
        modules.push(biologicResultModule);
        modules.push(patologicResultModule);
        modules.push(physicalResultModule);
        modules.push(syndromeResultModule);
        modules.push(clinicalResultModule);
        modules.push(commentaryResultModule);

        //roles (mantener ese orden)
        Role memory adminRole = Role(
            uint256(RoleTypes.ADMIN),
            "Administrador",
            "Permisos para gestionar usuarios"
        );
        Role memory doctorRole = Role(
            uint256(RoleTypes.DOCTOR),
            "Doctor",
            "Usuario para agregar historias clinicas"
        );
        Role memory nurseRole = Role(
            uint256(RoleTypes.NURSE),
            "Enfermera",
            "Usuario asignado para enfermeras"
        );

        roles.push(adminRole);
        roles.push(doctorRole);
        roles.push(nurseRole);
        roleModulesMap[adminRole.id].push(
            ModulePermissions(
                uint256(ModuleIdentificator.USERS_MANAGE),
                Permisions(true, true, true)
            )
        );
        roleModulesMap[adminRole.id].push(
            ModulePermissions(
                uint256(ModuleIdentificator.DOCTORS_MANAGE),
                Permisions(true, true, true)
            )
        );
        roleModulesMap[adminRole.id].push(
            ModulePermissions(
                uint256(ModuleIdentificator.NURSE_MANAGE),
                Permisions(true, true, true)
            )
        );
        roleModulesMap[adminRole.id].push(
            ModulePermissions(
                uint256(ModuleIdentificator.MEDICALS_INFO),
                Permisions(true, true, true)
            )
        );

        roleModulesMap[doctorRole.id].push(
            ModulePermissions(
                uint256(ModuleIdentificator.PATIENTS_INFO),
                Permisions(true, true, true)
            )
        );
        roleModulesMap[nurseRole.id].push(
            ModulePermissions(
                uint256(ModuleIdentificator.PATIENTS_INFO),
                Permisions(true, true, true)
            )
        );

        roleModulesMap[doctorRole.id].push(
            ModulePermissions(
                uint256(ModuleIdentificator.CR_EXAM_RESULT),
                Permisions(true, true, true)
            )
        );
        roleModulesMap[nurseRole.id].push(
            ModulePermissions(
                uint256(ModuleIdentificator.CR_EXAM_RESULT),
                Permisions(false, false, true)
            )
        );

        roleModulesMap[doctorRole.id].push(
            ModulePermissions(
                uint256(ModuleIdentificator.CR_SICKNESS),
                Permisions(true, true, true)
            )
        );
        roleModulesMap[nurseRole.id].push(
            ModulePermissions(
                uint256(ModuleIdentificator.CR_SICKNESS),
                Permisions(false, false, true)
            )
        );

        roleModulesMap[doctorRole.id].push(
            ModulePermissions(
                uint256(ModuleIdentificator.CR_BIOLOGIC_FUNCTIONS),
                Permisions(true, true, true)
            )
        );

        roleModulesMap[nurseRole.id].push(
            ModulePermissions(
                uint256(ModuleIdentificator.CR_BIOLOGIC_FUNCTIONS),
                Permisions(true, true, true)
            )
        );

        roleModulesMap[doctorRole.id].push(
            ModulePermissions(
                uint256(ModuleIdentificator.CR_PATOLOGICAL_HISTORY),
                Permisions(true, true, true)
            )
        );

        roleModulesMap[nurseRole.id].push(
            ModulePermissions(
                uint256(ModuleIdentificator.CR_PATOLOGICAL_HISTORY),
                Permisions(false, false, true)
            )
        );

        roleModulesMap[doctorRole.id].push(
            ModulePermissions(
                uint256(ModuleIdentificator.CR_PHYSYCAL_EXAM),
                Permisions(true, true, true)
            )
        );

        roleModulesMap[nurseRole.id].push(
            ModulePermissions(
                uint256(ModuleIdentificator.CR_PHYSYCAL_EXAM),
                Permisions(true, true, true)
            )
        );

        roleModulesMap[doctorRole.id].push(
            ModulePermissions(
                uint256(ModuleIdentificator.CR_SYNDROMES_GERIATRIC),
                Permisions(true, true, true)
            )
        );
        
        roleModulesMap[nurseRole.id].push(
            ModulePermissions(
                uint256(ModuleIdentificator.CR_SYNDROMES_GERIATRIC),
                Permisions(false, false, true)
            )
        );

        roleModulesMap[doctorRole.id].push(
            ModulePermissions(
                uint256(ModuleIdentificator.CR_CLINICAL_ASSESSMENT),
                Permisions(true, true, true)
            )
        );
        roleModulesMap[nurseRole.id].push(
            ModulePermissions(
                uint256(ModuleIdentificator.CR_CLINICAL_ASSESSMENT),
                Permisions(true, true, true)
            )
        );

        roleModulesMap[doctorRole.id].push(
            ModulePermissions(
                uint256(ModuleIdentificator.CR_COMMENTARY),
                Permisions(true, true, true)
            )
        );
        roleModulesMap[nurseRole.id].push(
            ModulePermissions(
                uint256(ModuleIdentificator.CR_COMMENTARY),
                Permisions(true, true, true)
            )
        );

        //@initialUser
        users.push(
            User(
                initialUser,
                1,
                "admin",
                0xf23ec0bb4210edd5cba85afd05127efcd2fc6a781bfed49188da1081670b22d8, //password admin
                true
            )
        );
        usersMap[initialUser] = 1;
        userRoleMap[users[0].id] = 1;
    }

    /**
     * @notice validates if a user has a determined role
     * @param _sender user address
     * @param _roleType role given by RoleTypes enum order
     * @return bool true if user has the role
     */
    function validateUser(address _sender, uint256 _roleType)
        external
        view
        returns (bool)
    {
        uint256 userIndex = usersMap[_sender];
        if (userIndex > 0) {
            uint256 userId = users[userIndex - 1].id;
            uint256 roleId = roles[userRoleMap[userId] - 1].id;
            if (roleId > 0 && roleId == uint256(_roleType)) {
                return true;
            }
        }

        return false;
    }

    /**
     * @notice validates if a user has a determined administrator role
     * @dev the msg.sender address determines the user to validate
     * @return bool true if user has the role
     */
    function isAdmin() internal view returns (bool) {
        uint256 userIndex = usersMap[msg.sender];
        if (userIndex > 0) {
            uint256 userId = users[userIndex - 1].id;
            uint256 roleId = roles[userRoleMap[userId] - 1].id;
            if (roleId > 0 && roleId == uint256(RoleTypes.ADMIN)) {
                return true;
            }
        }

        return false;
    }

    /**
     * @notice add a new user with an specific role
     * @param _userAddress user eoa
     * @param _id identificator for the user
     * @param _username username
     * @param _password password
     * @param _roleType role given by RoleTypes enum order
     * @dev the msg.sender address should be an administrator user
     */
    function addUser(
        address _userAddress,
        uint256 _id,
        string memory _username,
        string memory _password,
        uint256 _roleType
    ) external {
        require(isAdmin(), "sender is not an admin");
        users.push(
            User(
                _userAddress,
                _id,
                _username,
                keccak256(abi.encodePacked(_password)),
                true
            )
        );
        usersMap[_userAddress] = users.length;
        userRoleMap[users[users.length - 1].id] = _roleType;
    }

    /**
     * @notice disables user changing the state
     * @param _userAddress user eoa
     * @dev the msg.sender address should be an administrator user
     */
    function disableUser(address _userAddress) external {
        require(isAdmin(), "sender is not an admin");
        uint256 userIndex = usersMap[_userAddress];
        users[userIndex - 1].state = false;
    }

    /**
     * @notice enables user changing the state
     * @param _userAddress user eoa
     * @dev the msg.sender address should be an administrator user
     */
    function enableUser(address _userAddress) external {
        require(isAdmin(), "sender is not an admin");
        uint256 userIndex = usersMap[_userAddress];
        users[userIndex - 1].state = true;
    }

    /**
     * @notice retrieves all the users
     * @dev the msg.sender address should be an administrator user
     * @return User user array
     */
    function getUsers() external view returns (User[] memory) {
        require(isAdmin(), "sender is not an admin");
        return users;
    }

    function getSender() external view returns (address) {
        return msg.sender;
    }

    /**
     * @notice retrieves all the modules
     * @return Module module array
     */
    function getModules() external view returns (Module[] memory) {
        return modules;
    }

    /**
     * @notice retrieves all the roles
     * @return Role role array
     */
    function getRoles() external view returns (Role[] memory) {
        return roles;
    }

    /**
     * @notice retrieves all the users roles
     * @dev the msg.sender address should be an administrator user
     * @return UserRole array given by the UserRole struct
     */
    function getUserRoles() external view returns (UserRole[] memory) {
        require(isAdmin(), "sender is not an admin");
        UserRole[] memory _userRoleList = new UserRole[](users.length);
        for (uint256 i = 0; i < users.length; i++) {
            uint256 _userId = users[i].id;
            UserRole memory _userRole = UserRole(
                _userId,
                roles[userRoleMap[_userId] - 1].id
            );
            _userRoleList[i] = _userRole;
        }
        return _userRoleList;
    }

    /**
     * @notice retrieves all the role modules
     * @dev the msg.sender address should be an administrator user
     * @return RoleModules array given by the RoleModules struct
     */
    function getRoleModules() external view returns (RoleModules[] memory) {
        RoleModules[] memory _roleModulesList = new RoleModules[](roles.length);
        for (uint256 i = 0; i < roles.length; i++) {
            uint256 _roleId = roles[i].id;
            RoleModules memory _roleModules = RoleModules(
                _roleId,
                roleModulesMap[_roleId]
            );
            _roleModulesList[i] = _roleModules;
        }
        return _roleModulesList;
    }

    /**
     * @notice retrieves a session data if credentials exists
     * @dev the sent user should be valid and enabled
     * @return Session the session value given by the Session struct
     */
    function login(string memory _username, string memory _password)
        external
        view
        returns (Session memory)
    {
        bool usernamePasswordValid = false;
        for (uint256 i = 0; i < users.length; i++) {
            if (
                keccak256(abi.encodePacked(_username)) ==
                keccak256(abi.encodePacked(users[i].username)) &&
                keccak256(abi.encodePacked(_password)) == users[i].password
            ) {
                usernamePasswordValid = true;
                User memory userSession = users[i];
                require(userSession.state, "Disabled user");
                uint256 userId = userSession.id;
                return
                    Session(
                        userId,
                        users[i].username,
                        users[i].state,
                        roles[userRoleMap[userId] - 1].id
                    );
            }
        }
        require(usernamePasswordValid, "Invalid username or password");
        return Session(0, "", false, 0);
    }
}

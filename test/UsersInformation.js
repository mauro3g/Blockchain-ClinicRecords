const UsersInformation = artifacts.require("UsersInformation")
const SessionContract = artifacts.require("SessionContract")

const objectsEqual = (o1, o2) => {
    const kr = Object.keys(o1).every(p => {
        return o1[p] === o2[p]
    });
    return kr
}

const arraysEqual = (a1, a2) => {
    return a1.length === a2.length && a1.every((o, idx) => objectsEqual(o, a2[idx]));
}

contract("UsersInformation", (accounts) => {
    before(async () => {
        this.usersInformation = await UsersInformation.deployed()
        this.sessionContract = await SessionContract.deployed()
    })

    it('contract deployed successfully', async () => {
        const address = this.usersInformation.address
        assert.notEqual(address, null)
        assert.notEqual(address, undefined)
        assert.notEqual(address, 0x0)
        assert.notEqual(address, "")
    })

    it('should add medical', async () => {
        const sender = accounts[0]
        const userAccount = accounts[1]
        const id = 2
        const username = "doctorUser1"
        const password = "1234"
        const doctorRole = 2
        const resultContract = await this.sessionContract.addUser(userAccount, id, username, password, doctorRole, { from: sender })
        assert.equal(resultContract.receipt.status, true)
    })

    it('should add patient', async () => {
        const sessionAddress = this.sessionContract.address
        const sender = accounts[1]
        const patient = {
            personalInformation: {
                name: "Juan Peres",
                identificationNumber: 1723503233,
                birthDate: 794034000000,
                gender: "Masculino",
            },
            maritalStatus: "Soltero",
            occupation: "Programador",
            direction: "Calle 123",
            contactPerson: "Jose Peres",
            phone: "0982439491"
        }
        const patient2 = {
            personalInformation: {
                name: "Juan Almeida",
                identificationNumber: 1723503234,
                birthDate: 794034000000,
                gender: "Masculino",
            },
            maritalStatus: "Soltero",
            occupation: "Programador",
            direction: "Calle 123",
            contactPerson: "Jose Peres",
            phone: "0982439491",

        }

        const resultContract = await this.usersInformation.addPatient(
            sessionAddress,
            patient.personalInformation.identificationNumber,
            patient.personalInformation.name,
            patient.personalInformation.birthDate,
            patient.personalInformation.gender,
            patient.maritalStatus,
            patient.occupation,
            patient.direction,
            patient.contactPerson,
            patient.phone,
            { from: sender }
        )
        const resultContract2 = await this.usersInformation.addPatient(
            sessionAddress,
            patient2.personalInformation.identificationNumber,
            patient2.personalInformation.name,
            patient2.personalInformation.birthDate,
            patient2.personalInformation.gender,
            patient2.maritalStatus,
            patient2.occupation,
            patient2.direction,
            patient2.contactPerson,
            patient2.phone,
            { from: sender }
        )

        assert.equal(resultContract.receipt.status, true)
        assert.equal(resultContract2.receipt.status, true)
    })

    it('should not add patient', async () => {
        const sessionAddress = this.sessionContract.address
        const sender = accounts[0]
        const patient = {
            personalInformation: {
                name: "Pepe Peres",
                identificationNumber: 1723503235,
                birthDate: 794034000000,
                gender: "Masculino",
            },
            maritalStatus: "Soltero",
            occupation: "Programador",
            direction: "Calle 123",
            contactPerson: "Jose Peres",
            phone: "0982439491",

        }

        let err = null
        let errMessage = ""

        try {
            await this.usersInformation.addPatient(
                sessionAddress,
                patient.personalInformation.identificationNumber,
                patient.personalInformation.name,
                patient.personalInformation.birthDate,
                patient.personalInformation.gender,
                patient.maritalStatus,
                patient.occupation,
                patient.direction,
                patient.contactPerson,
                patient.phone,
                { from: sender }
            )
        } catch (error) {
            err = error
            errMessage = errMessage + error.toString()
        }

        assert.ok(err instanceof Error)
        assert.equal(errMessage.includes("sender is not a medical"), true)
    })

    it('should retrieve patients', async () => {
        const sessionAddress = this.sessionContract.address
        const sender = accounts[1]
        const resultContract = await this.usersInformation.getPatients(sessionAddress, { from: sender })
        const patient = {
            maritalStatus: "Soltero",
            occupation: "Programador",
            direction: "Calle 123",
            contactPerson: "Jose Peres",
            phone: "0982439491",
        }
        const patient2 = {
            maritalStatus: "Soltero",
            occupation: "Programador",
            direction: "Calle 123",
            contactPerson: "Jose Peres",
            phone: "0982439491",
        }

        const mockArray = []
        mockArray.push(patient)
        mockArray.push(patient2)

        assert.equal(arraysEqual(mockArray, resultContract), true)
    })

    it('should not retrieve patients', async () => {
        const sessionAddress = this.sessionContract.address
        const sender = accounts[0]

        let err = null
        let errMessage = ""

        try {
            await this.usersInformation.getPatients(sessionAddress, { from: sender })
        } catch (error) {
            err = error
            errMessage = errMessage + error.toString()
        }

        assert.ok(err instanceof Error)
        assert.equal(errMessage.includes("sender is not a medical"), true)
    })

    it('should retrieve patient by identification', async () => {
        const sessionAddress = this.sessionContract.address
        const sender = accounts[1]
        const userIdentification = 1723503233
        const resultContract = await this.usersInformation.getPatient(sessionAddress, userIdentification, { from: sender })

        const personalInformation = {
            name: "Juan Peres",
            identificationNumber: "1723503233",
            birthDate: "794034000000",
            gender: "Masculino",
        }
        const patient = {
            maritalStatus: "Soltero",
            occupation: "Programador",
            direction: "Calle 123",
            contactPerson: "Jose Peres",
            phone: "0982439491"
        }

        assert.equal(objectsEqual(patient, resultContract), true)
        assert.equal(objectsEqual(personalInformation, resultContract.personalInformation), true)
    })

    it('should add medical information', async () => {
        const sessionAddress = this.sessionContract.address
        const sender = accounts[0]
        const medical1 = {
            personalInformation: {
                name: "Juan Peres",
                identificationNumber: 1723503241,
                birthDate: 794034000000,
                gender: "Masculino",
            },
            speciality: "Cirujano",
        }
        const medical2 = {
            personalInformation: {
                name: "Juan Almeida",
                identificationNumber: 1723503242,
                birthDate: 794034000000,
                gender: "Masculino",
            },
            speciality: "General",
        }

        const resultContract = await this.usersInformation.addMedical(
            sessionAddress,
            1,
            medical1.personalInformation.name,
            medical1.personalInformation.identificationNumber,
            medical1.personalInformation.birthDate,
            medical1.personalInformation.gender,
            medical1.speciality,
            { from: sender }
        )
        const resultContract2 = await this.usersInformation.addMedical(
            sessionAddress,
            2,
            medical2.personalInformation.name,
            medical2.personalInformation.identificationNumber,
            medical2.personalInformation.birthDate,
            medical2.personalInformation.gender,
            medical2.speciality,
            { from: sender }
        )

        assert.equal(resultContract.receipt.status, true)
        assert.equal(resultContract2.receipt.status, true)
    })

    it('should not add medical information', async () => {
        const sessionAddress = this.sessionContract.address
        const sender = accounts[1]
        const medical1 = {
            personalInformation: {
                name: "Juan Peres",
                identificationNumber: 1723503241,
                birthDate: 794034000000,
                gender: "Masculino",
            },
            speciality: "Cirujano",
        }

        let err = null
        let errMessage = ""

        try {
            await this.usersInformation.addMedical(
                sessionAddress,
                1,
                medical1.personalInformation.name,
                medical1.personalInformation.identificationNumber,
                medical1.personalInformation.birthDate,
                medical1.personalInformation.gender,
                medical1.speciality,
                { from: sender }
            )
        } catch (error) {
            err = error
            errMessage = errMessage + error.toString()
        }

        assert.ok(err instanceof Error)
        assert.equal(errMessage.includes("sender is not an admin"), true)
    })

    it('should retrieve medicals', async () => {
        const sessionAddress = this.sessionContract.address
        const sender = accounts[0]
        const resultContract = await this.usersInformation.getMedicals(sessionAddress, { from: sender })
        const medical1 = {
            speciality: "Cirujano",
        }
        const medical2 = {
            speciality: "General",
        }

        const mockArray = []
        mockArray.push(medical1)
        mockArray.push(medical2)

        assert.equal(arraysEqual(mockArray, resultContract), true)
    })

    it('should not retrieve medicals', async () => {
        const sessionAddress = this.sessionContract.address
        const sender = accounts[1]

        let err = null
        let errMessage = ""

        try {
            await this.usersInformation.getMedicals(sessionAddress, { from: sender })
        } catch (error) {
            err = error
            errMessage = errMessage + error.toString()
        }

        assert.ok(err instanceof Error)
        assert.equal(errMessage.includes("sender is not an admin"), true)
    })

    it('should retrieve medical by identification', async () => {
        const sessionAddress = this.sessionContract.address
        const sender = accounts[0]
        const userIdentification = 1
        const resultContract = await this.usersInformation.getMedical(sessionAddress, userIdentification, { from: sender })

        const personalInformation = {
            name: "Juan Peres",
            identificationNumber: "1723503241",
            birthDate: "794034000000",
            gender: "Masculino",
        }

        const medical1 = {
            speciality: "Cirujano",
        }

        assert.equal(objectsEqual(medical1, resultContract), true)
        assert.equal(objectsEqual(personalInformation, resultContract.personalInformation), true)
    })

})
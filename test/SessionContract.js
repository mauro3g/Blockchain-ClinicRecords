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

contract("SessionContract", (accounts) => {

    before(async () => {
        this.sessionContract = await SessionContract.deployed()
    })

    it('contract deployed successfully', async () => {
        const address = this.sessionContract.address
        assert.notEqual(address, null)
        assert.notEqual(address, undefined)
        assert.notEqual(address, 0x0)
        assert.notEqual(address, "")
    })

    it('should validate admin user', async () => {
        const userAccount = accounts[0]
        const adminRole = 1
        const resultContract = await this.sessionContract.validateUser(userAccount, adminRole, { from: userAccount })
        assert.equal(resultContract, true)
    })

    it('should add user', async () => {
        const sender = accounts[0]
        const userAccount = accounts[1]
        const id = 2
        const username = "doctorUser1"
        const password = "1234"
        const doctorRole = 2
        const resultContract = await this.sessionContract.addUser(userAccount, id, username, password, doctorRole, { from: sender })
        assert.equal(resultContract.receipt.status, true)
    })

    it('should disable user', async () => {
        const sender = accounts[0]
        const userAccount = accounts[1]
        const resultContract = await this.sessionContract.disableUser(userAccount, { from: sender })
        assert.equal(resultContract.receipt.status, true)
    })

    it('should enable user', async () => {
        const sender = accounts[0]
        const userAccount = accounts[1]
        const resultContract = await this.sessionContract.enableUser(userAccount, { from: sender })
        assert.equal(resultContract.receipt.status, true)
    })

    it('should retrieve users', async () => {
        const sender = accounts[0]
        const resultContract = await this.sessionContract.getUsers({ from: sender })
        const userAdmin = {
            userAddress: '0x4ECbd9540F79A38f58d79336D16eC59a0dA247E8',
            id: '1',
            username: 'admin',
            password: '0xf23ec0bb4210edd5cba85afd05127efcd2fc6a781bfed49188da1081670b22d8',
            state: true
        }
        const userDoctor = {
            userAddress: '0x20654900f4a755aAcaC025d605A2C27Af3511234',
            id: '2',
            username: 'doctorUser1',
            password: '0x387a8233c96e1fc0ad5e284353276177af2186e7afa85296f106336e376669f7',
            state: true
        }

        const mockArray = []
        mockArray.push(userAdmin)
        mockArray.push(userDoctor)

        assert.equal(arraysEqual(mockArray, resultContract), true)
        // wrap what you want to debug with `debug()`:
        //await debug(this.sessionContract.getUsers({ from: accounts[0] }));
    })

    it('should not retrieve users', async () => {
        const userAccount = accounts[1]
        let err = null
        let errMessage = ""

        try {
            await this.sessionContract.getUsers({ from: userAccount })
        } catch (error) {
            err = error
            errMessage = errMessage + error.toString()
        }

        assert.ok(err instanceof Error)
        assert.equal(errMessage.includes("sender is not an admin"), true)
    })

    it('should retrieve modules', async () => {
        const sender = accounts[0]
        const resultContract = await this.sessionContract.getModules({ from: sender })

        const mockArray = [
            {
                id: "1",
                name: "Usuarios"
            },
            {
                id: "2",
                name: "Doctores"
            },
            {
                id: "3",
                name: "Enfermeras"
            },
            {
                id: "4",
                name: "Pacientes"
            },
            {
                id: "5",
                name: "Informacion de Medicos"
            },
            {
                id: "6",
                name: "Examenes - Resultados"
            },
            {
                id: "7",
                name: "Enfermedades"
            },
            {
                id: "8",
                name: "Funciones Biologicas"
            },
            {
                id: "9",
                name: "Historial Patologico"
            },
            {
                id: "10",
                name: "Examen Fisico"
            },
            {
                id: "11",
                name: "Sindromes y problemas geriatricos"
            },
            {
                id: "12",
                name: "Registro Clinico"
            },
            {
                id: "13",
                name: "Comentarios"
            },
        ]

        assert.equal(arraysEqual(mockArray, resultContract), true)
    })

    it('should retrieve roles', async () => {
        const sender = accounts[0]
        const resultContract = await this.sessionContract.getRoles({ from: sender })

        const mockArray = [
            {
                id: "1",
                name: "Administrador",
                description: "Permisos para gestionar usuarios"
            },
            {
                id: "2",
                name: "Doctor",
                description: "Usuario para agregar historias clinicas"
            },
            {
                id: "3",
                name: "Enfermera",
                description: "Usuario asignado para enfermeras"
            },
        ]

        assert.equal(arraysEqual(mockArray, resultContract), true)
    })

    it('should retrieve user roles', async () => {
        const sender = accounts[0]
        const resultContract = await this.sessionContract.getUserRoles({ from: sender })

        const mockArray = [
            {
                userId: "1",
                roleId: "1",
            },
            {
                userId: "2",
                roleId: "2",
            },
        ]

        assert.equal(arraysEqual(mockArray, resultContract), true)
    })

    it('should not retrieve user roles', async () => {
        const userAccount = accounts[1]
        let err = null
        let errMessage = ""

        try {
            await this.sessionContract.getUserRoles({ from: userAccount })
        } catch (error) {
            err = error
            errMessage = errMessage + error.toString()
        }

        assert.ok(err instanceof Error)
        assert.equal(errMessage.includes("sender is not an admin"), true)
    })

    it('should retrieve role modules', async () => {
        const sender = accounts[0]
        const resultContract = await this.sessionContract.getRoleModules({ from: sender })

        const mockArray = [
            {
                roleId: "1",
                modulePermissions: [
                    {
                        moduleId: "1",
                        permisions: {
                            create: true,
                            modify: true,
                            visualize: true
                        }
                    },
                    {
                        moduleId: "2",
                        permisions: {
                            create: true,
                            modify: true,
                            visualize: true
                        }
                    },
                    {
                        moduleId: "3",
                        permisions: {
                            create: true,
                            modify: true,
                            visualize: true
                        }
                    },
                    {
                        moduleId: "5",
                        permisions: {
                            create: true,
                            modify: true,
                            visualize: true
                        }
                    },
                ]
            },
            {
                roleId: "2",
                modulePermissions: [
                    {
                        moduleId: "4",
                        permisions: {
                            create: true,
                            modify: true,
                            visualize: true
                        }
                    },
                    {
                        moduleId: "6",
                        permisions: {
                            create: true,
                            modify: true,
                            visualize: true
                        }
                    },
                    {
                        moduleId: "7",
                        permisions: {
                            create: true,
                            modify: true,
                            visualize: true
                        }
                    },
                    {
                        moduleId: "8",
                        permisions: {
                            create: true,
                            modify: true,
                            visualize: true
                        }
                    },
                    {
                        moduleId: "9",
                        permisions: {
                            create: true,
                            modify: true,
                            visualize: true
                        }
                    },
                    {
                        moduleId: "10",
                        permisions: {
                            create: true,
                            modify: true,
                            visualize: true
                        }
                    },
                    {
                        moduleId: "11",
                        permisions: {
                            create: true,
                            modify: true,
                            visualize: true
                        }
                    },
                    {
                        moduleId: "12",
                        permisions: {
                            create: true,
                            modify: true,
                            visualize: true
                        }
                    },
                    {
                        moduleId: "13",
                        permisions: {
                            create: true,
                            modify: true,
                            visualize: true
                        }
                    },
                ]
            },
            {
                roleId: "3",
                modulePermissions: [
                    {
                        moduleId: "4",
                        permisions: {
                            create: true,
                            modify: true,
                            visualize: true
                        }
                    },
                    {
                        moduleId: "6",
                        permisions: {
                            create: false,
                            modify: false,
                            visualize: true
                        }
                    },
                    {
                        moduleId: "7",
                        permisions: {
                            create: false,
                            modify: false,
                            visualize: true
                        }
                    },
                    {
                        moduleId: "8",
                        permisions: {
                            create: true,
                            modify: true,
                            visualize: true
                        }
                    },
                    {
                        moduleId: "9",
                        permisions: {
                            create: false,
                            modify: false,
                            visualize: true
                        }
                    },
                    {
                        moduleId: "10",
                        permisions: {
                            create: true,
                            modify: true,
                            visualize: true
                        }
                    },
                    {
                        moduleId: "11",
                        permisions: {
                            create: false,
                            modify: false,
                            visualize: true
                        }
                    },
                    {
                        moduleId: "12",
                        permisions: {
                            create: true,
                            modify: true,
                            visualize: true
                        }
                    },
                    {
                        moduleId: "13",
                        permisions: {
                            create: true,
                            modify: true,
                            visualize: true
                        }
                    },
                ]
            },
        ]

        assert.equal(resultContract[0].roleId, mockArray[0].roleId)
        assert.equal(resultContract[1].roleId, mockArray[1].roleId)
        assert.equal(resultContract[2].roleId, mockArray[2].roleId)
    })

    it('should retrieve success login', async () => {
        const sender = accounts[0]
        const resultContract = await this.sessionContract.login("admin", "admin", { from: sender })

        const mockResult = {
            userId: "1",
            username: "admin",
            state: true,
            roleId: "1"
        }

        assert.equal(objectsEqual(mockResult, resultContract), true)
    })
})
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

    it('migrate deployed successfully', async () => {
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

        //assert.equal(objectsEqual(userAdmin, resultContract[0]), true)
        assert.equal(arraysEqual(mockArray, resultContract), true)
        // wrap what you want to debug with `debug()`:
        //await debug(this.sessionContract.getUsers({ from: accounts[0] }));
    })

    it('should not retrieve users', async () => {
        const userAccount = accounts[1]
        let err = null
        let errMessage = "asdas"

        try {
            await this.sessionContract.getUsers({ from: userAccount })
        } catch (error) {
            err = error
            errMessage = errMessage + error.toString()
        }

        assert.ok(err instanceof Error)
        assert.equal(errMessage.includes("sender is not an admin"), true)
    })
})
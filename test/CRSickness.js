const CRSickness = artifacts.require("CRSickness")
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

contract("CRSickness", (accounts) => {

    before(async () => {
        this.cRSickness = await CRSickness.deployed()
        this.sessionContract = await SessionContract.deployed()
    })

    it('contract deployed successfully', async () => {
        const address = this.cRSickness.address
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

    it('should add sickness', async () => {
        const sessionAddress = this.sessionContract.address
        const sender = accounts[1]
        const userIdentification = "1723503241"
        const sicknessValues = [794034000000, 794034000000, "Gripe", "Resfriado", "Progresivo", "Incidioso", "Fiebre", "Paracetamol", "GP1"]
        const resultContract = await this.cRSickness.addSickness(sessionAddress, userIdentification, sicknessValues, { from: sender })
        assert.equal(resultContract.receipt.status, true)
    })

})
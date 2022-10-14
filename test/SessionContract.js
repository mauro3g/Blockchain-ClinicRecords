const SessionContract = artifacts.require("SessionContract")

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

    it('should retrieve users', async () => {
        // wrap what you want to debug with `debug()`:
        await debug(this.sessionContract.getUsers( { from: accounts[0] }));
    })
})
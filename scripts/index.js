// scripts/index.js
module.exports = async function main(callback) {
    try {
        // Retrieve accounts from the local node
        // const accounts = await web3.eth.getAccounts();
        // console.log(accounts)

        const DWME = artifacts.require("DudeWheresMyEth");
        const dwme = await DWME.deployed();   

        value = await dwme.getRule();
        console.log(value);

        await dwme.addRule(3, [
            '0xFFcf8FDEE72ac11b5c542428B35EEF5769C409f0',
            '0x22d491Bde2303f2f43325b2108D26f1eAbA1e32b',
            '0xE11BA2b4D45Eaed5996Cd0823791E0C93114882d',
        ]);

         value = await dwme.getRule();
         console.log(value);

        callback(0);
    } catch (error) {
        console.error(error);
        callback(1);
    }
  }
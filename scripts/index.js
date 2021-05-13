// scripts/index.js
module.exports = async function main(callback) {
    try {
        // Retrieve accounts from the local node
        // const accounts = await web3.eth.getAccounts();
        // console.log(accounts)

        const DWME = artifacts.require("DudeWheresMyEth");
        const dwme = await DWME.deployed();   

        // await dwme.addRule([
        //     '0xFFcf8FDEE72ac11b5c542428B35EEF5769C409f0',
        //     '0x22d491Bde2303f2f43325b2108D26f1eAbA1e32b',
        //     '0xE11BA2b4D45Eaed5996Cd0823791E0C93114882d',
        // ], {value: web3.utils.toWei('5', 'ether')});

        // await dwme.modifyRuleAccounts([
        //     '0x22d491Bde2303f2f43325b2108D26f1eAbA1e32b',
        //     '0xE11BA2b4D45Eaed5996Cd0823791E0C93114882d',
        //     '0xd03ea8624C8C5987235048901fB614fDcA89b117',
        // ]);

        // await dwme.addEthToRule({value: web3.utils.toWei('5', 'ether')});
        // await dwme.requestEthBack(web3.utils.toWei('2', 'ether'));

        // await dwme.removeRule();


        value = await dwme.getRule();
        console.log("accounts: ", value['0'], "\n", "wei: ", value['1'].toString(), '\n', 'votes: ', value['2'].toString() );

        var accounts = await web3.eth.getAccounts();
        
        // await dwme.voteToWithdraw(accounts[0], {from: accounts[1]});
        // await dwme.voteToWithdraw(accounts[0], {from: accounts[1]});
        // await dwme.voteToWithdraw(accounts[0], {from: accounts[3]});

        console.log(accounts[0])
        var balance = await web3.eth.getBalance(accounts[0]);
        console.log(balance)

        console.log(accounts[1])
        balance = await web3.eth.getBalance(accounts[1]);
        console.log(balance)

        console.log(accounts[2])
        balance = await web3.eth.getBalance(accounts[2]);
        console.log(balance)

        value = await dwme.getRule();
        console.log("accounts: ", value['0'], "\n", "wei: ", value['1'].toString(), '\n', 'votes: ', value['2'].toString() );

        callback(0);
    } catch (error) {
        console.error(error);
        callback(1);
    }
  }
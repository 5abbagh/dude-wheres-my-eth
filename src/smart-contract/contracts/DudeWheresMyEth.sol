pragma solidity 0.8.4;


contract DudeWheresMyEth {

    struct Rule {
        address[] accounts;
        bool active;
        uint totalEth;
        uint withdrawVotesCount;
    }

    mapping(address => Rule) internal trusteesData;
    mapping(address => mapping(address => bool)) internal accountsVoted;
    uint internal contractTotalEth; 

    function addRule(address[] memory accounts) public payable {
        require(msg.value > 0, "< zero eth value");
        require(accounts.length >= 3 && accounts.length <= 7, "account count not in range: 7 >= count >=3");
        require(isUnique(msg.sender, accounts), "accounts specified not unique");
        require(trusteesData[msg.sender].active == false && trusteesData[msg.sender].totalEth == 0, "a rule already exists for this address");
        trusteesData[msg.sender] = Rule(accounts, true, msg.value, 0);
        contractTotalEth += msg.value;
    }

    function modifyRuleAccounts(address[] memory accounts) public {
        require(trusteesData[msg.sender].active == true, "rule not active");
        require(accounts.length >= 3 && accounts.length <= 7, "account count not in range: 7 >= count >=3");
        require(isUnique(msg.sender, accounts), "accounts specified not unique");
        trusteesData[msg.sender].accounts = accounts;
        resetVotes(msg.sender);
    }

    function addEthToRule() public payable {
        require(msg.value > 0, "< zero eth value");
        require(trusteesData[msg.sender].active == true, "rule not active");
        trusteesData[msg.sender].totalEth += msg.value;
        contractTotalEth += msg.value;
    }

    function requestEthBack(uint ethRequested) public {
        require(ethRequested > 0, "requested amount <= 0");
        require(trusteesData[msg.sender].active == true, "rule not active");
        refundAmount(ethRequested);
    }

    function getRule() public view returns(address[] memory, uint, uint) {
        if (trusteesData[msg.sender].active) {
            return (trusteesData[msg.sender].accounts, trusteesData[msg.sender].totalEth, 
                    trusteesData[msg.sender].withdrawVotesCount);
        }
    }

    function removeRule() public {
        trusteesData[msg.sender].active = false;
        resetVotes(msg.sender);
        delete trusteesData[msg.sender].accounts;
        refundAccount();
    }

    function voteToWithdraw(address ruleAddress) public {
        require(trusteesData[ruleAddress].active == true, "rule not active");

        bool trusteeRegistered = false;
        for (uint index = 0; index < trusteesData[ruleAddress].accounts.length; index++) {
            if (trusteesData[ruleAddress].accounts[index] == msg.sender) {
                trusteeRegistered = true;
            }
        }
        require(trusteeRegistered, "voter not registered");
        require(accountsVoted[ruleAddress][msg.sender] == false, "voter already voted");
        trusteesData[ruleAddress].withdrawVotesCount += 1;
        accountsVoted[ruleAddress][msg.sender] = true;

        if (trusteesData[ruleAddress].withdrawVotesCount > trusteesData[ruleAddress].accounts.length / 2) {
            triggerWithdraw(ruleAddress);
        }
    }

    function isUnique(address sender, address[] memory accounts) internal returns(bool) {
        // TODO:: check for uniqueness of accounts
        for (uint i = 0; i < accounts.length; i++) {
            require(sender != accounts[i], "accounts not unique");
        }
        return true;
    }

    function refundAccount() internal {
        uint amount = trusteesData[msg.sender].totalEth;
        if (amount > 0) {

            // subtract from contract total;
            trusteesData[msg.sender].totalEth = 0;
            contractTotalEth -= amount;

            // initiate transfer of eth to msg.sender
            payable(msg.sender).transfer(amount);
        }
    }

    function refundAmount(uint ethRequested) internal {
        require(trusteesData[msg.sender].totalEth >= ethRequested, "refund amount > balance");
        
        // subtract from totals;
        trusteesData[msg.sender].totalEth -= ethRequested;
        contractTotalEth -= ethRequested;

        // initiate transfer of eth to msg.sender
        payable(msg.sender).transfer(ethRequested);
    }

    function triggerWithdraw(address ruleAddress) internal {
        uint amount = trusteesData[ruleAddress].totalEth;
        if (amount > 0) {
            address payable receiver = payable(trusteesData[ruleAddress].accounts[0]);

            trusteesData[ruleAddress].totalEth = 0;
            trusteesData[ruleAddress].active = false;
            resetVotes(ruleAddress);
            delete trusteesData[ruleAddress].accounts;

            receiver.transfer(amount);
        }
    }

    function resetVotes(address ruleOwner) internal {
        address[] memory accounts = trusteesData[ruleOwner].accounts;
        for (uint8 index = 0; index < accounts.length; index++) {
            address voter = accounts[index];
            accountsVoted[ruleOwner][voter] = false;
        }
        trusteesData[ruleOwner].withdrawVotesCount = 0;
    }
}

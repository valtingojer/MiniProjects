pragma solidity >= 0.7.0 < 0.9.0;

contract LedgerBalance{
    mapping(address => uint) balance;

    function UpdatesBalance(uint newBalance) public{
        balance[msg.sender] = newBalance;
    }

    function GetCurrentBalance() public returns(uint){
        return balance[msg.sender];
    }
}

contract Updated{

    LedgerBalance ledgerBalance = new LedgerBalance();

    function UpdateBalance(uint v) public{
        uint prevBalance = ledgerBalance.GetCurrentBalance();
        uint newBalance = prevBalance + v;
        ledgerBalance.UpdatesBalance(newBalance);
        uint updatedBalance = ledgerBalance.GetCurrentBalance();
    }

    function GetBalance() public returns(uint){
        return ledgerBalance.GetCurrentBalance();
    }
}
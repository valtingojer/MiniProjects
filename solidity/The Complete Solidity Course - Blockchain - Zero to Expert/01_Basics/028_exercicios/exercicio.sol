pragma solidity >= 0.7.0 < 0.9.0;

contract LearnFunctions {
    uint chocolateBar = 10;
    uint storeOwner = 300;
    bool lieDetector = true;
    string errorMessageText = "Error! There has been a mistake!";

    uint public wallet = 500;
    bool spend = false;
    string notifyMessage = "you have spent money";

    function RemoteControlOpen(bool closedDoor) public view returns(bool){
        return !closedDoor;
    }

    function MultiplyCalculator(uint a, uint b) public view returns(uint){
        uint result = a*b;
        return result;
    }

    function IncrementWalletLocal() public view returns(uint){
        //wallet = wallet + 1;
        //uint result = wallet;
        return wallet + 1;
    }

    function IncrementWalletGlobal() public returns(uint){
        //wallet = wallet + 1;
        //uint result = wallet;
        return wallet++;
    }

    function CompareValues(uint a, uint b) public view{
        require(a == b, "A and B are different");
    }
}
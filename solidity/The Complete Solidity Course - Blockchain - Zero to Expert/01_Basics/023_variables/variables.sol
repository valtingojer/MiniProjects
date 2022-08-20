pragma solidity >= 0.7.0 < 0.9.0;

contract LearnVariables {
    uint chocolateBar = 10;
    uint storeOwner = 300;
    bool lieDetector = true;
    string errorMessageText = "Error! There has been a mistake!";

    uint wallet = 500;
    bool spend = false;
    string notifyMessage = "you have spent money";

    function RemoteControlOpen(bool closedDoor) public view returns(bool){
        return !closedDoor;
    }
}
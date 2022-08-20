pragma solidity >= 0.7.0 < 0.9.0;

contract FirstSmartContract {
    constructor() public{}
    function GetResult() public view returns(uint){
        uint a = 1;
        uint b = 2;
        uint result = a + b;
        return result;
    }
}


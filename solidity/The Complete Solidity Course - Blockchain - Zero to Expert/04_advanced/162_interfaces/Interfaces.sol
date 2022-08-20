pragma solidity >= 0.7.0 < 0.9.0;

/*
Interfaces
    can not have any function with implementation
    functions of an interface can be only of type external
    can not haev constructor
    can not have state variables
    can have
        enum and structs
*/

contract Counter{
    uint public Count;

    function Increment() external{
        Count += 1;
    }
}

interface ICounter{
    function Count() external view returns(uint);
    function Increment() external;
}

contract MyContract{
    address counterAddr;
    constructor(address _counterAddr){
        counterAddr = _counterAddr;
    }
    function IncrementCounter() external {
        ICounter(counterAddr).Increment();
    }
    function GetCount() external view returns(uint){
        return ICounter(counterAddr).Count();
    }
}
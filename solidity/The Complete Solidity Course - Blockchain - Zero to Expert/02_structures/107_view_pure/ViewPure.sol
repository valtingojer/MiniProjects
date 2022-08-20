pragma solidity >= 0.7.0 < 0.9.0;

contract MyContract{
    uint value;

    //ReadOnly function that returns a value
    function GetValue() external view returns(uint){
        return value;
    }

    //pure allow us to return operation
    function GetNewValue() external pure returns(uint){
        return 3+3;
    }

    //Modify value state
    function SetValue(uint v) external{
        value = v;
    }

    function Multiply() external pure returns(uint){
        return 3 * 7;
    }

    function ValuePlusThree() external view returns(uint){
        return value + 3;
    }
}




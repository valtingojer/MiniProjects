pragma solidity ^0.8.4;


contract C {
    uint private data;
    uint public info;

    constructor(){
        info = 10;
    }
    function Increment(uint a) private pure returns(uint){
        return a + 1;
    }
    function UpdateData(uint a) public {
        data = a;
    }
    function GetData()public view returns(uint){
        return data;
    }
    function Compute(uint a, uint b) pure internal returns(uint){
        return a + b;
    }

}

contract D {

    C c = new C();

    function ReadInfo() public view returns(uint){
        return c.info();
    }

}

contract E is C {

    uint private result;
    C private c;

    constructor(){
        c = new C();
    }

    function GetComputedResult() public {
        result = Compute(23, 5);
    }

    function GetResults() public view returns(uint){
        return result;
    }

    function GetNewInfo() public view returns(uint){
        return c.info();
    }
    
}

pragma solidity >= 0.7.0 < 0.9.0;


abstract contract FirstContract{ 
    function y() public virtual returns(uint);
}
contract SecondContract is FirstContract{ 
    function y() public override view returns(uint){
        return 1;
    }
}

contract FirstOtherContract{ 
    function y() public virtual returns(uint){}
}
contract SecondOtherContract is FirstOtherContract{ 
    function y() public override view returns(uint){
        return 1;
    }
}
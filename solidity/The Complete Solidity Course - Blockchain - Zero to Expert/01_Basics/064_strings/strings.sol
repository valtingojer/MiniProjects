pragma solidity >= 0.7.0 < 0.9.0;

contract StringsAndBytes{
    function StringLenght() public view returns(uint){
        string memory xpto = "xpto";
        bytes memory xptoByte = bytes(xpto);
        return xptoByte.length;
    }
}
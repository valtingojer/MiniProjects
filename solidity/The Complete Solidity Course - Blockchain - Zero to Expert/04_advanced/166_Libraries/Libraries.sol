pragma solidity >= 0.7.0 < 0.9.0;

/*

Libraries
    Functions can be called directaly if they do not modify state.
        pure and veiw can only be called from outside the library.
    It is statless, so, it cant be destroyed
    Cannot have state variables
    cannot inherit any element
    cannot be inherited

*/


library Search{
    function IndexOf(uint [] storage self, uint value) public view returns(uint){
        uint result = 0;
        for(uint i = 0; i < self.length; i++){
            if(self[i] == value){
                result = i + 1;
            }
        }
        return result;
    }

}

contract Test{
    using Search for uint[];
    uint[] data;

    constructor() public{
        data.push(11); data.push(22); data.push(33); data.push(44); data.push(55);
    }

    function ValueAtArrayIndexByOne(uint val) external view returns(uint){
        return Search.IndexOf(data, val);
    }

    function ValueUsingArrayIndexByOne(uint val) external view returns(uint){
        return data.IndexOf(val);
    }

}

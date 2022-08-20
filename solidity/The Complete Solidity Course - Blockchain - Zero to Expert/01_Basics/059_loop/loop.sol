pragma solidity >= 0.7.0 < 0.9.0;

contract loopContract{
    
    function NMultiples(uint num) public view returns(uint){
        
        uint result = 0;
        
        for(uint i = 1; i < num; i++){
            if(num % i == 0){
                result++;
            }
        }


        return result;
    }
}
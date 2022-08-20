pragma solidity >= 0.7.0 < 0.9.0;


//Oracle dynamic feeds a database system 
//is not only used for storing the data but to effectively manage it
//and provides high performance, authrized access and failure recovery features.

contract Oracle{
    address admin;
    uint public rand;

    constructor(){
        admin = msg.sender;
    }

    function FeedRand(uint v) external{
        require(msg.sender == admin);
        rand = v;
    }
    
}


contract GenerateRandomNumber{
    Oracle oracle;

    constructor(address oracleAddress){
        oracle = Oracle(oracleAddress);
    }

    function RandMod(uint max) private view returns(uint){
        

        uint time = block.timestamp;
        uint difficult = block.difficulty;
        uint blockNumber = block.number;
        uint price = tx.gasprice;
        //uint rand = uint(keccak256(abi.encodePacked(time, max, msg.sender, blockNumber, price, gasleft(), difficult, msg.sender)));
        uint rand = uint(sha256(abi.encodePacked(time, max, oracle.rand, msg.sender, blockNumber, price, gasleft(), difficult, msg.sender)));
        uint result = rand % max; //produce number from 0 to max
        return result;
    }
    function RandomBetween(uint min, uint max) public view returns(uint){
        uint mmax = max - min;
        uint rand = RandMod(mmax);
        uint result = rand + min;
        return result;
    }
}
pragma solidity >= 0.7.0 < 0.9.0;


contract learnMapping{

    struct Movie{
        string title;
        string director;
    }

    //mapping(key => value)
    mapping(address => uint) public myMap;
    mapping(uint => Movie) public movie;
    mapping(address => mapping(uint => Movie)) public myMovie;
    

    function StoreWalletCoins(address wallet, uint coins) public {
        myMap[wallet] = coins;
    }

    function StoreMyCoins(uint coins) public {
        myMap[msg.sender] = coins;
        //msg.sender -> "the caller address" as a global variable
        //captured and acessible throughout solidity
    }

    function ViewCoins(address wallet) public view returns(uint){
        uint coins = myMap[wallet];
        return coins;
    }

    function removeWallet(address wallet) public{
        delete myMap[wallet];
    }

    function AddMovie(uint id, string memory title, string memory director) public{
        movie[id] = Movie(title, director);
    }

    function AddMyMovie(uint id, string memory title, string memory director) public{

        myMovie[msg.sender][id] = Movie(title, director);

        //msg.sender -> "the caller address" as a global variable
        //captured and acessible throughout solidity
    }
}
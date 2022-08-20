pragma solidity >= 0.7.0 < 0.9.0;

contract Owner{

    address owner;

    constructor() public{
        owner = msg.sender;
    }

    modifier OnlyOwner {
        require(msg.sender == owner);
        _; //allow the function being modified to continue   
    }

    modifier Costs(uint price){
        require(msg.value >= price);
        _;
    }

}

contract RegisterMe is Owner{

    mapping(address => bool) registeredAddresses;
    uint price;

    constructor(uint inicialPrice) public{
        price = inicialPrice;
    }

    function Register() public payable Costs(price){
        registeredAddresses[msg.sender] = true;
    }

    function ChangePrice(uint sentPrice) public OnlyOwner{
        price = sentPrice;
    }

}
pragma solidity ^0.8.4;

contract Coin{
    address public minter;
    mapping (address => uint) public balances;

    event Sent(address from, address to, uint amount);

    error InsufficientBalance(uint requested, uint avaliable);

    constructor(){
        minter = msg.sender;
    }

    function Mint(address receiver, uint amount) public {
        require(msg.sender == minter);
        require(receiver == minter);
        balances[receiver] += amount;
    }

    function send(address receiver, uint amount) public{
        if(amount > balances[msg.sender]){
            revert InsufficientBalance({
                requested: amount,
                avaliable: balances[msg.sender]
            });
        }

        balances[msg.sender] -= amount;
        balances[receiver] += amount;
    }

}

contract Victim{
    function isItAContract() public view returns(bool){
        uint size;
        address a = msg.sender;
        assembly {
            size := extcodesize(a)
        }
        return size > 0;
    }
}

contract Attacker{
    bool public trickedYOu;
    Victim victim;

    constructor(address _v) public{
        victim = Victim(_v);
        trickedYOu = !victim.isItAContract();
    }
}
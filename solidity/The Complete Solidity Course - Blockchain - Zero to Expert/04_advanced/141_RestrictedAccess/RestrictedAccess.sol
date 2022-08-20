pragma solidity >= 0.7.0 < 0.9.0;

//onlyBy - only the mentioned caller
//onlyAfter - called after certain time period
//costs - only if some value is provided


contract RestrictedAccess{

    address public owner = msg.sender;
    uint public creationTime = block.timestamp;
    uint public disownCooldown = 3 weeks;

    modifier onlyBy(address _account){
        require(msg.sender == _account, "sender not authorized!");
        _;
    }

    modifier onlyAfter(uint t){
        require(block.timestamp >= t, "It is too early!");
        _;
    }

    modifier costs(uint v){
        require(msg.value >= v, "Not enough Ether provided");
        _;
    }

    function changeOwnerAddress(address addr) public onlyBy(owner){
        owner = addr;
    }

    function disown() public onlyBy(owner) onlyAfter(creationTime + disownCooldown){
        delete owner;
    }

    function payForNewOwner(address addr) public payable costs(200 ether){
        owner = addr;
    }
}
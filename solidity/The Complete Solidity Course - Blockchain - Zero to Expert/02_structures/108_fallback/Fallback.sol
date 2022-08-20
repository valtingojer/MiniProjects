pragma solidity >= 0.7.0 < 0.9.0;

contract FallBack {
    //Fallback functions has no name, they are anonymous
    //Does not take inputs
    //Does not return values
    //Must be external

    //Used when you call functions that does not exist, or send, transfer, call ether
    //send and transfer recives 2300 gas, but call recives more (all of the gas)

    event Log(uint gas);

    fallback() external payable{
        //should not have much code
        //the function will fail if it uses too much gas

        //invoke send: we get 2300 gas, enough to emit a log
        emit Log(gasleft());
    }

    function GetBalance() public view returns(uint){
        return address(this).balance;
    }
}

contract SendToFallback{
    function TransferToFallback(address payable _to) public payable{
        //send ether with the transfer method
        //automatically transfer will transfer 2300 gas amount
        _to.transfer(msg.value);
    }
    
    function callFallback(address payable _to) public payable{
        (bool sent, ) = _to.call{ value: msg.value }('');
        require(sent, 'Falhou ao enviar');
    }
}
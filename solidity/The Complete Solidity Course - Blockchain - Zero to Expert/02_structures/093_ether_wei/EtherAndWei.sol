pragma solidity >= 0.7.0 < 0.9.0;

contract EtherUnits{

    function test() public{

        //wei is the smallest denomination of ether
        assert(1000000000000000000 wei == 1 ether); //10^18 wei = 1 eth

        assert(1 wei == 1); //1 wei == 1

        assert(1 ether == 1e18);
        assert(1000000000000000000 wei == 1 ether);
        assert(2 ether == 2e18);
        assert(2000000000000000000 wei == 2 ether);
        
    }

}
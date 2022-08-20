pragma solidity >= 0.7.0 < 0.9.0;
/*

solidity provides an option to use assembly language to write inline assembly within solidity.

assembly is a low level lang that allows you to directly manipulate the EVM

*/

contract LearnAssembly{
    function addToEVM() external {
        uint x;
        uint y;
        uint zz;


        assembly {
            //define variable and value
            let z := add(x,y)
            
            //define only value of existent variable
            zz := z

            //load data for specific slot
            let a := mload(9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f40)

            //store something temporaly to memory (value, payload)
            mstore(a,4)

            // persistence storage
            sstore(a,100)

            //each evm store is 256bits

        }
    
    }


    function addToEVM2(address addr) public view returns(bool success){
        uint size;
        //check whether an address contains any code
        assembly {
            size := extcodesize(addr)
        }
        return size > 0;
    }

    function convertByteToBytes32() public view returns(uint){
        bytes memory data = new bytes(10);

        assembly{
            let dataB32 := mload(add(data, 32))
        }

        return 1;
    }
    
}
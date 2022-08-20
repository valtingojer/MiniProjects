// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "./SimpleStorage.sol";

contract StorageFactory is SimpleStorage{

    SimpleStorage[] public simpleStorageArray;

    function CreateSimpleStorageContract() public {
        SimpleStorage simpleStorage = new SimpleStorage();
        simpleStorageArray.push(simpleStorage);
    }

    function sfAddPerson(uint256 _simpleStorageIndex, string memory _simpleStorageName, uint256 _simpleStorageNumber) public{
        address _simpleStorageReferenceAddr = address(simpleStorageArray[_simpleStorageIndex]);
        SimpleStorage _simpleStorage = SimpleStorage(_simpleStorageReferenceAddr);
        _simpleStorage.AddPerson(_simpleStorageName, _simpleStorageNumber);
    }

    // function getFirst() public view returns(uint256){
    //     return uint256(SimpleStorage(address(simpleStorageArray[0])).people[0].favoriteNumber);
    // }

}
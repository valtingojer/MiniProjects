// SPDX-License-Identifier: MIT
pragma solidity >= 0.6.0 < 0.9.0;

contract SimpleStorage{

    struct Person{
        string name;
        uint256 favoriteNumber;
    }

    Person[] public people;
    mapping(string => uint256) public nameToFavoriteNumber;

    
    function AddPerson(string memory _name, uint256 _favoriteNumber) public{
        people.push(Person(_name, _favoriteNumber));
        nameToFavoriteNumber[_name] = _favoriteNumber;
    }

    function FavoriteNumberMultipliedBy(string memory _name, uint256 _multiply) public view returns(uint256){
        uint256 result = nameToFavoriteNumber[_name] * _multiply;
        return result;
    }
    
}
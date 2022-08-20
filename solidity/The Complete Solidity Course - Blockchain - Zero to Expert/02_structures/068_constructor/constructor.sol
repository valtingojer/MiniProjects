pragma solidity >= 0.7.0 < 0.9.0;

contract Member{
    string name;
    uint age;

    constructor(string memory _name, uint _age) public {
        name = _name;
        age = _age;
    }
}

contract Teacher is Member ('Rachel', 28){

    function GetName() public view returns(string memory){
        return name;
    }
}

contract TeacherDinamic is Member //('Rachel', 28)
{
    constructor(string memory n, uint a) Member(n, a) public{}

    function GetName() public view returns(string memory){
        return name;
    }
}
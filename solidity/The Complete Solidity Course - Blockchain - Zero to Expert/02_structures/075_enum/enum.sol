pragma solidity >= 0.7.0 < 0.9.0;

contract enumLearn{

    enum frenchFriesSize {
        NONE,
        LARGE,
        MEDIUM,
        SMALL
    }

    
    frenchFriesSize public choice;
    frenchFriesSize public defaultChoice = frenchFriesSize.SMALL;

    function SetChoice(frenchFriesSize c) public{
        choice = c;
    }

}
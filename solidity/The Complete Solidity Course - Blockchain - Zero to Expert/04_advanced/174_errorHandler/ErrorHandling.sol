pragma solidity >= 0.7.0 < 0.9.0;

/*
assert(bool condition) - Internal error handling
    false causes the revert to original state and invalid upcode
    usually for inputs and external components
    used to be sure that things never reppens

require(bool condition, string memory message = "") - External/Internal error handling
    false causes the revert to original state
    usually used for inputs or external components
    the message will be delivered as error message
    used to require som condition

revert(string memory message = "") - abort execution
    it causes the revert to original state
   the message will be delivered as reaseon
*/

contract LearnErrorHandling{
    bool isItSunny = true;
    bool needsUmbrella = false;
    uint public finalCalculation = 0;
    uint maxCalculationValueExclusive = 6;

    modifier onlySunny(){
        require(isItSunny, "Come back when it is sunny");
        _;
    }

    function CalcOnlyWhenItIsSunny() public onlySunny{
        finalCalculation += 3;
        assert(finalCalculation < maxCalculationValueExclusive);
    }

    function WeatherChanger() public {
        isItSunny = !isItSunny;
        needsUmbrella = !isItSunny;
    }

    function BringUmbrella() public{
        if(!needsUmbrella){
            revert("No needs for umbrealla");
        }
    }

}
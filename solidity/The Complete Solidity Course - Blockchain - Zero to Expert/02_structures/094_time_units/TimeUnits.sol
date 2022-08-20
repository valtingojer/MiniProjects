pragma solidity >= 0.7.0 < 0.9.0;

contract TimeUnits{
    function timeUnits() public view returns(uint){
        assert(1 minutes == 60 seconds);
        assert(1 hours == 60 minutes);
        assert(24 hours == 60 minutes * 24);
        assert(1 days == 24 hours);
        assert(1 weeks == 7 days);

        return 1 hours;
    }
}
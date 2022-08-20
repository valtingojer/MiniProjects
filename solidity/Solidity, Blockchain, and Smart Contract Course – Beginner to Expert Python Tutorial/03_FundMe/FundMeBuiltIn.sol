// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/*
Versions under 0.8 of solidity, has an number feature for overflow,
where it resets the number and start to count over again from the start.
ie. uint8 x = uint8(255) + uint8(100)
    will result in x = 99.

to avoid that in lowers versions of solidity we can use SafeMath

import "chainlink/contracts/src/v0.6/vendor/SafeMathChainlink.sol";
and use it whith the desired type

using SafeMathChainlink for uint8;
//using A for B, is a solidity way of attach library to types

*/


interface AggregatorV3Interface {
  function decimals() external view returns (uint8);

  function description() external view returns (string memory);

  function version() external view returns (uint256);

  // getRoundData and latestRoundData should both raise "No data present"
  // if they do not have data to report, instead of returning unset values
  // which could be misinterpreted as actual reported values.
  function getRoundData(uint80 _roundId) external view
    returns ( uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound );

  function latestRoundData() external view
    returns ( uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound );
}

contract FundMe{

    /**
     * Network: Kovan
     * Aggregator: ETH/USD
     * Address: 0xf9f9f9f9f9f9f9f9f9f9f9f9f
     */
    AggregatorV3Interface internal priceFeed = AggregatorV3Interface(0xf9f9f9f9f9f9f9f9f9f9f9f9f);
    
    uint256 _minimumUSD = 1;
    uint256 minimumUSD = _minimumUSD * (10 ** 18); //minimmumUSD in 18 digits


    mapping(address => uint256) public addressToAmountFunded;
    address[] public funders;
    address public owner;

    modifier OnlyOwner(){
        require(msg.sender == owner);
        _;
    }

    constructor(){
        owner = msg.sender;
    }


    function fund() public payable {
        require(GetConversionRate(msg.value) >= minimumUSD, "The minimum value is 50USD in eth");
        
        if(addressToAmountFunded[msg.sender] == 0){
            funders.push(msg.sender);
        }
        addressToAmountFunded[msg.sender] += msg.value;
    }

    
    function GetLatestPriceData() public view returns (uint80 roundID, int price, uint startedAt, uint timeStamp, uint80 answeredInRound) {
        (uint80 _roundID, int _price, uint _startedAt, uint _timeStamp, uint80 _answeredInRound) = priceFeed.latestRoundData();
        return (_roundID, _price, _startedAt, _timeStamp, _answeredInRound);
    }

    function GetLatestPrice() public view returns (int) {
        (/*uint80 roundID*/, int price, /*uint startedAt*/, /*uint timeStamp*/, /*uint80 answeredInRound*/) = priceFeed.latestRoundData();
        return price;
    }

    function GetLatestPriceToWai() public view returns (uint256) {
        uint256 gwaiPrice = uint256(GetLatestPrice());
        return uint256(gwaiPrice * 10 ** 10);
    }

    function GetVersion() public view returns(uint256){
        return priceFeed.version();
    }

    function GetConversionRate(uint256 waiAmount) public view returns(uint256){
        uint256 waiPrice = GetLatestPriceToWai();
        uint256 waiAmountInUsd = (waiPrice * waiAmount) / (10 ** 18);
        return waiAmountInUsd; //18 digits for 1 dolar
    }

    function WaiToUsd(uint256 waiAmount) public view returns(uint256){
        uint256 waiPrice = GetConversionRate(waiAmount);
        uint256 dolarPrice = waiPrice / (10 ** 18);
        return dolarPrice;
    }

    function withdrawAll() payable public OnlyOwner{
        address payable me = payable(msg.sender);
        uint amount = address(this).balance;

        for(uint256 i = 0; i < funders.length; i++){
            address funder = funders[i];
            addressToAmountFunded[funder] = 0;
        }

        funders = new address[](0);

        me.transfer(amount);
    }
}
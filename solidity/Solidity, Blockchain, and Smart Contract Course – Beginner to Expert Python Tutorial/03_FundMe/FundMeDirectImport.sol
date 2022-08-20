// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
//pragma solidity ^0.6.6 < 0.9.0;


import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract FundMe{

    /**
     * Network: Kovan
     * Aggregator: ETH/USD
     * Address: 0xf9f9f9f9f9f9f9f9f9f9f9f9f
     */
    AggregatorV3Interface internal priceFeed = AggregatorV3Interface(0xf9f9f9f9f9f9f9f9f9f9f9f9f);
    


    mapping(address => uint256) public addressToAmountFunded;

    function fund() public payable {
        addressToAmountFunded[msg.sender] += msg.value;
    }

    
    function getLatestPriceData() public view returns (uint80 roundID, int price, uint startedAt, uint timeStamp, uint80 answeredInRound) {
        return priceFeed.latestRoundData();
    }

    function getLatestPrice() public view returns (int) {
        (/*uint80 roundID*/, int price, /*uint startedAt*/, /*uint timeStamp*/, /*uint80 answeredInRound*/) = priceFeed.latestRoundData();
        return price;
    }
}
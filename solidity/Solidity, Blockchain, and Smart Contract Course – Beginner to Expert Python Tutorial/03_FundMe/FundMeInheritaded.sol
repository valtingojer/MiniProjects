// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
//pragma solidity ^0.6.6 < 0.9.0;


import "./PriceConsumerV3.Sol";

contract FundMe is PriceConsumerV3{

    mapping(address => uint256) public addressToAmountFunded;

    function fund() public payable {
        addressToAmountFunded[msg.sender] += msg.value;
    }

    
}
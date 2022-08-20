pragma solidity ^0.8.4;

contract Auction {
    address payable public beneficiary;
    uint public auctionEndTime;

    // current state of the auction
    address highestBidder;
    uint highestBid;
    bool ended = false;

    mapping(address => uint) pendingReturns;

    event highestBidIncreased(address bidder, uint amount);
    event auctionEnded(address winner, uint amount);

    constructor(uint _biddingTime, address payable _beneficiary){
        beneficiary = _beneficiary;
        auctionEndTime = block.timestamp + _biddingTime;
    }

    function Bid() public payable{
        if(block.timestamp > auctionEndTime){
            revert("The auction has ended");
        }
        if(msg.value <= highestBid){
            revert("Bid is not high enough");
        }

        //Add to pending returns the old highest bid
        if(highestBid != 0){
            pendingReturns[highestBidder] += highestBid;
        }

        highestBidder = msg.sender;
        highestBid = msg.value;
        emit highestBidIncreased(highestBidder, highestBid);
    }

    function Withdraw() public payable returns(bool){
        uint amount = pendingReturns[msg.sender];
        require(amount > 0, "There are no founds to be returned");

        pendingReturns[msg.sender] = 0;

        bool hasSent = payable(msg.sender).send(amount);

        if(!hasSent){
            pendingReturns[msg.sender] = amount;
        }
        
        return hasSent;
    }

    function auctionEnd() public{
        require(block.timestamp > auctionEndTime, "The acution is running");
        require(!ended, "The acution is already over");

        ended = true;
        emit auctionEnded(highestBidder, highestBid);

        //beneficiary.transfer(highestBid); //if want to pay instead of register to refound (not recomended may bug everything)
        pendingReturns[beneficiary] += highestBid;

    }
}
pragma solidity ^0.8.0;

contract SamplePegasusNFT {
    struct NFT {
        uint256 id;
        address owner;
        string name;
        string symbol;
        uint8 decimals;
        uint256 totalSupply;
        uint256 balanceOf;
    }

    mapping(uint256 => NFT) public nfts;

    function createNFT(uint256 id, address owner, string name, string symbol, uint8 decimals, uint256 totalSupply) public {
        NFT nft;
        nft.id = id;
        nft.owner = owner;
        nft.name = name;
        nft.symbol = symbol;
        nft.decimals = decimals;
        nft.totalSupply = totalSupply;
        nft.balanceOf = totalSupply;
        nfts[id] = nft;
    }

    function transfer(uint256 id, address to) public {
        NFT nft = nfts[id];
        nft.owner = to;
        nfts[id] = nft;
    }

    function transferFrom(uint256 id, address from, address to) public {
        NFT nft = nfts[id];
        nft.owner = to;
        nfts[id] = nft;
    }

    function approve(uint256 id, address spender, uint256 value) public {
        NFT nft = nfts[id];
        nft.balanceOf = value;
        nfts[id] = nft;
    }

    function transferApproval(uint256 id, address from, address to, uint256 value) public {
        NFT nft = nfts[id];
        nft.balanceOf = value;
        nfts[id] = nft;
    }

    function burn(uint256 id) public {
        NFT nft = nfts[id];
        nft.balanceOf = 0;
        nfts[id] = nft;
    }
}
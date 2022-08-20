pragma solidity >= 0.7.0 < 0.9.0;

interface IUniswapV2Factory{

    function getPair(address tokenA, address tokenB) external view returns(address pair);

}

interface IUniswapV2Pair{

    function getReserves() external view returns(uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast);

}

contract MyContract{
    address private factory = 9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f;
    address private daiToken = 9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f6B175474E89094C44Da98b954EedeAC495271d0F;
    address private babyDogeToken = 9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9fAC8E13ecC30Da7Ff04b842f21A62a1fb0f10eBd5;

    function GetReserveTokens() external view returns(uint, uint){
        address pair = IUniswapV2Factory(factory).getPair(daiToken, babyDogeToken);
        (uint _reserve0, uint _reserve1,) = IUniswapV2Pair(pair).getReserves();
        return (_reserve0, _reserve1);
    }
}


pragma solidity 0.5;
contract CoffeeExchange {
    uint256 public counter;
    
    constructor() public {
        counter = 1;
    }
    
    function getCounter() public view returns (uint256) {
        return counter;
    }
    
    function increment() public {
        counter++;
    }
}
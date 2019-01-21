pragma solidity >=0.4.22 <0.6.0;
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

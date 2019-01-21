pragma solidity >=0.4.22 <0.6.0;
contract CoffeeExchange {
    address owner;
    mapping(address => uint256) private balances;
    
    constructor() public {
        owner = msg.sender;
    }
    
    function refill(address _user) public {
        balances[_user] = 1000;
    }
    
    function transfer() public payable {
        balances[msg.sender] += msg.value;
    }
    
    function multiTransfer(address _buyer, address _producer, address _farmer, uint256 value, uint256 donation) public returns (bool success) {
        success = (balances[_buyer] >= value+donation);
        if(!success) {
            refill(_buyer);
            balances[_buyer] -= value+donation;
            balances[_producer] += value;
            balances[_farmer] += donation;
        }
        return success;
    }
}
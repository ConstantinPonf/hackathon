pragma solidity ^0.4.24;
contract CoffeeExchangeInterface {
    function transfer(address _from, address _producer, address _donatedTo, uint256 _value, uint256 _donation) public returns (bool success);
    
    function balanceOf(address _owner) public view returns (uint256 balance);
    
    function registerUser(address _user, uint256 _initialBalance) public;
    
    event Transfer(address indexed _from, address indexed _to, uint256 _value);
}
contract CoffeeExchange is CoffeeExchangeInterface {
    string public constant NAME = "Token";
    string public constant SYMBOL = "T";
    uint8 public constant DECIMALS = 18;
    uint256 public constant INITIAL_AMOUNT = 100000;
    address public owner;
    mapping (address => uint256) public balances;
    constructor() public {
        balances[msg.sender] = INITIAL_AMOUNT;
        owner = msg.sender;
    }
    
    function registerUser(address _user, uint256 _initialBalance) public {
        balances[_user] = _initialBalance;
    }
    
    function balanceOf(address _owner) public view returns (uint256 balance) {
        return balances[_owner];
    }
    
    function transfer(address _from, address _producer, address _donatedTo,uint256 _value, uint256 _donation) public returns (bool success) {
        require(balances[_from] >= (_donation + _value), "Not enough Token");
        
        balances[_from] -= _value + _donation;
        balances[_producer] += _value;
        balances[_donatedTo] += _donation;
        
        emit Transfer(_from, _producer, _value);
        emit Transfer(_from, _donatedTo, _donation);
        
        return true;
    }
}
pragma solidity >=0.4.22 <0.6.0;

contract CoffeeBuggy {
    mapping (address => uint) private balance;

    uint private constant MIN_VALUE = 10000;
    uint private constant MAX_VALUE = 1 ether;

    event Trans(address _from, address _to, uint256 value);


    function deposit() public payable {
        require(msg.value+balance[msg.sender] <= MAX_VALUE, "Deposit exceeds accounts limit.");
        balance[msg.sender] += msg.value;
    }

    function withdraw() public returns (uint256){

        uint userDepo = balance[msg.sender];
        balance[msg.sender] = 0;
        msg.sender.transfer(userDepo);
        return userDepo;
    }

    function pay(address _producer, address _farmer, uint256 value) public returns (bool success) {
        require(value <= MAX_VALUE, "Value exceeds MAX_VALUE.");
        require(balance[msg.sender] >= value, "Not enough balance. Buy new credit first.");
        balance[msg.sender] -= value;

        if(balance[_producer] == 0) { balance[_producer] = value/2; }
        else balance[_producer] += value/2;
        emit Trans(msg.sender, _producer, value/2);

        if(balance[_farmer] == 0) { balance[_farmer] = value/2; }
        else { balance[_farmer] += value/2; }
        emit Trans(msg.sender, _farmer, value/2);

        uint256 rest = value - value/2*2;
        if(rest > 0) { balance[msg.sender] += rest; }
        return true;
    }

    function purchase(address payable _producer, address payable _farmer) public payable {
        _producer.transfer(msg.value/2);
        _farmer.transfer(msg.value/2);
    }
}
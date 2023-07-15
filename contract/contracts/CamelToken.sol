pragma solidity ^0.8.0;
// SPDX-License-Identifier: MIT

//interface IUSDT {
   // function transfer(address to, uint256 amount) external returns (bool);
//}

contract CamelToken {
    string public constant symbol = "CMLT";
    mapping (address => uint256) public balances;
    mapping (address => mapping (address => uint256)) public allowed;
    uint256 public totalSupply = 100000000000;
    uint256 public fixedTotalSupply = 100000000000;
    bool public paused = false;
    address public owner;

    // Event for vote
    event Voted(address voter, uint256 choice);

    constructor()  {
        owner = msg.sender;
    }

    function transfer(address recipient, uint256 amount) public {
        require(!paused, "Contract is paused");
        require(balances[msg.sender] >= amount, "Not enough balance");
        balances[msg.sender] -= amount;
        balances[recipient] += amount;
    }

    function transferFrom(address sender, address recipient, uint256 amount) public {
        require(!paused, "Contract is paused");
        require(balances[sender] >= amount, "Not enough balance");
        require(allowed[sender][msg.sender] >= amount, "Not enough allowed");
        balances[sender] -= amount;
        allowed[sender][msg.sender] -= amount;
        balances[recipient] += amount;
    }

    function approve(address spender, uint256 amount) public {
        allowed[msg.sender][spender] = amount;
    }

    function buy() public payable {
        require(!paused, "Contract is paused");
        uint256 amount;
       // if (msg.value > 0) {
            // Buy using Ether
            amount = msg.value;
        //} else {
            // Buy using USDT
           // require(usdt.transfer(address(this), msg.value), "USDT transfer failed");
            //amount = msg.value;
       // }
        require(amount > 0, "Amount must be greater than 0");
        balances[msg.sender] += amount;
        totalSupply += amount;
    }

    function mint(address recipient, uint256 amount) public {
        require(msg.sender == owner, "Only contract owner can mint");
        require(!paused, "Contract is paused");
        require(totalSupply + amount <= fixedTotalSupply, "Exceeds fixed total supply");
        balances[recipient] += amount;
        totalSupply += amount;
    }

    function burn(uint256 amount) public {
        require(balances[msg.sender] >= amount, "Not enough balance");
        balances[msg.sender] -= amount;
        totalSupply -= amount;
    }

    function pause() public {
        require(msg.sender == owner, "Only contract owner can pause");
        paused = true;
    }

    function unpause() public {
        require(msg.sender == owner, "Only contract owner can unpause");
        paused = false;
    }

    function vote(uint256 choice) public {
        require(balances[msg.sender] > 0, "You must have tokens to vote");
        emit Voted(msg.sender, choice);
    }

    
}

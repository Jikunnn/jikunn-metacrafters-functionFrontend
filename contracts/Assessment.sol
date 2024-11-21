// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Assessment {
    address payable public owner;
    uint256 public balance;
    string public message;

    event Deposit(uint256 amount);
    event Withdraw(uint256 amount);
    event MessageChanged(string newMessage);

    constructor(uint256 initBalance, string memory initMessage) payable {
        owner = payable(msg.sender);
        balance = initBalance;
        message = initMessage;
    }

    function getBalance() public view returns (uint256) {
        return balance;
    }

    function getMessage() public view returns (string memory) {
        return message;
    }

    function getOwner() public view returns (address) {
        return owner;
    }

    function setMessage(string memory newMessage) public {
        require(msg.sender == owner, "Only the owner can set the message");
        message = newMessage;
        emit MessageChanged(newMessage);
    }

    function deposit(uint256 _amount) public {
        require(msg.sender == owner, "You are not the owner of this account");
        uint256 previousBalance = balance;
        balance += _amount;
        require(balance == previousBalance + _amount, "Balance mismatch after deposit");
        emit Deposit(_amount);
    }

    function withdraw(uint256 _withdrawAmount) public {
        require(msg.sender == owner, "You are not the owner of this account");
        uint256 previousBalance = balance;
        require(balance >= _withdrawAmount, "Insufficient balance");
        balance -= _withdrawAmount;
        require(balance == previousBalance - _withdrawAmount, "Balance mismatch after withdrawal");
        emit Withdraw(_withdrawAmount);
    }
}
#Project: Function Frontend

## A metacrafters project submitted by Joshua James Arcelao with the student email of 202110565@fit.edu.ph


# Assessment.sol Smart Contract

This smart contract is written in Solidity and provides several functionalities including maintaining an owner's address, balance, and a string message.

## Functionalities

### Owner Address
- **Stores** the owner's address.

### Balance
- **Maintains** the contract's balance.

### Message
- **A string message** that can be set by the owner.

## Functions

### `getBalance`
- **Returns** the current balance of the contract.

### `getMessage`
- **Returns** the current message stored in the contract.

### `getOwner`
- **Returns** the owner's address.

### `setMessage`
- **Allows the owner** to set a new message.

### `deposit`
- **Allows the owner** to deposit funds into the contract.

### `withdraw`
- **Allows the owner** to withdraw funds from the contract.

## Events

### `Deposit`
- **Emitted** when funds are deposited.

### `Withdraw`
- **Emitted** when funds are withdrawn.

### `MessageChanged`
- **Emitted** when the message is updated.

## Usage

### Connecting to MetaMask
1. **Ensure MetaMask** is installed and you are logged in.
2. **Upon opening the app**, it will automatically prompt you to connect your MetaMask wallet.

### Interacting with the Contract
1. **Account Information**: The interface will display your connected account and the contract balance.
2. **Set Message**: Enter a new message in the input field and click "Set Message" to update the message stored in the contract.
3. **Deposit**: Click "Deposit 10 Units" to deposit 10 units into the contract.
4. **Withdraw**: Click "Withdraw 10 Units" to withdraw 10 units from the contract.

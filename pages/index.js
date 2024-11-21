// Joshua James Arcelao 202110565@fit.edu.ph
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import assessmentAbi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(null);
  const [assessment, setAssessment] = useState(null);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [message, setMessage] = useState("");
  const [newMessage, setNewMessage] = useState("");

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const abi = assessmentAbi.abi;

  const initWallet = async () => {
    if (window.ethereum) {      const wallet = window.ethereum;
      setEthWallet(wallet);
      try {
        const accounts = await wallet.request({ method: "eth_requestAccounts" });
        setAccount(accounts[0]);
        initContract(wallet);
      } catch (error) {
        console.error("User denied account access or error occurred", error);
      }
    } else {
      alert("Please install MetaMask to use this application.");
    }
  };

  const initContract = (wallet) => {
    const provider = new ethers.providers.Web3Provider(wallet);
    const signer = provider.getSigner();
    const assessmentContract = new ethers.Contract(contractAddress, abi, signer);
    setAssessment(assessmentContract);
  };

  const getBalance = async () => {
    if (assessment) {
      const bal = await assessment.getBalance();
      setBalance(bal.toString());
    }
  };

  const getMessage = async () => {
    if (assessment) {
      const msg = await assessment.getMessage();
      setMessage(msg);
    }
  };

  const updateMessage = async () => {
    if (assessment) {
      try {
        const tx = await assessment.setMessage(newMessage);
        await tx.wait();
        getMessage();
        setNewMessage("");
      } catch (error) {
        console.error("Error updating message", error);
      }
    }
  };

  const deposit = async () => {
    if (assessment) {
      try {
        const tx = await assessment.deposit(10);
        await tx.wait();
        getBalance();
      } catch (error) {
        console.error("Error depositing funds", error);
      }
    }
  };

  const withdraw = async () => {
    if (assessment) {
      try {
        const tx = await assessment.withdraw(10);
        await tx.wait();
        getBalance();
      } catch (error) {
        console.error("Error withdrawing funds", error);
      }
    }
  };

  useEffect(() => {
    initWallet();
  }, []);

  useEffect(() => {
    if (assessment) {
      getBalance();
      getMessage();
    }
  }, [assessment]);

  return (
    <main className="container">
      <header>
        <h1>Assessment Contract Interface</h1>
      </header>

      {account ? (
        <div>
          <p>Your Account: {account}</p>
          <p>Contract Balance: {balance}</p>
          <p>Message: {message}</p>

          <input
            type="text"
            placeholder="New Message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button onClick={updateMessage}>Set Message</button>

          <button onClick={deposit}>Deposit 10 Units</button>
          <button onClick={withdraw}>Withdraw 10 Units</button>
        </div>
      ) : (
        <p>Connecting to MetaMask...</p>
      )}

      <style jsx>{`
        .container {
          text-align: center;
        }
      `}</style>
    </main>
  );
}
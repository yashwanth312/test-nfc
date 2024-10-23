import React, { useState, useEffect } from 'react';
import { BrowserProvider } from 'ethers'; // Correct import for Ethers.js v6

const MetaMaskConnect = () => {
  const [account, setAccount] = useState(null);

  // Function to connect to MetaMask
  const connectToMetaMask = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        // Create a provider connected to MetaMask
        const provider = new BrowserProvider(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        // Get the signer (the account connected to MetaMask)
        const signer = await provider.getSigner();
        const account = await signer.getAddress();
        setAccount(account);

        console.log("Connected Account: ", account);
        console.log("Signer: ", signer);
      } catch (err) {
        console.error("Error connecting to MetaMask: ", err);
      }
    } else {
      alert("MetaMask is not installed. Please install MetaMask.");
    }
  };

  // Automatically check if MetaMask is connected on component mount
  // useEffect(() => {
  //   const checkMetaMaskConnection = async () => {
  //     if (typeof window.ethereum !== 'undefined') {
  //       const provider = new BrowserProvider(window.ethereum);
  //       const accounts = await provider.listAccounts();
  //       if (accounts.length > 0) {
  //         setAccount(accounts[0]);
  //       }
  //     }
  //   };
  //   checkMetaMaskConnection();
  // }, []);

  return (
    <div>
      <h2>MetaMask Connection</h2>
      {account ? (
        <p>Connected Account: {account}</p>
      ) : (
        <button onClick={connectToMetaMask}>Connect to MetaMask</button>
      )}
    </div>
  );
};

export default MetaMaskConnect;

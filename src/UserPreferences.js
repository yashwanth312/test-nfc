import React, { useState } from 'react';
import { ethers, parseEther, BrowserProvider } from 'ethers';  // Changed import for parseEther
// import { BrowserProvider } from 'ethers';  // Changed import for Web3Provider

const contractABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "buyer",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "preference",
				"type": "string"
			}
		],
		"name": "LightingPurchased",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "buyer",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "songName",
				"type": "string"
			}
		],
		"name": "MusicPurchased",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "preference",
				"type": "string"
			}
		],
		"name": "purchaseLighting",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "songName",
				"type": "string"
			}
		],
		"name": "purchaseMusic",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	},
	{
		"inputs": [],
		"name": "getContractBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "LIGHTING_PRICE_ETH",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "MUSIC_PRICE_ETH",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

const contractAddress = "0xD79523c8F1F5599ecC11daa756491FaD542f4b6B";

function PurchaseSongs() {
    const [song, setSong] = useState("");
    const [userAddress, setUserAddress] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    async function connectWallet() {
        if (window.ethereum) {
            try {
                const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setUserAddress(account);
            } catch (error) {
                console.error("User rejected request");
            }
        } else {
            setErrorMessage("MetaMask not detected");
        }
    }

    async function purchaseSongs() {
        if (!userAddress || song == "") {
            setErrorMessage("Please connect your wallet and enter a valid number of songs");
            return;
        }

        const pricePerSong = 0.005  // Correctly imported parseEther
        // const totalPrice = parseEther((numSongs*pricePerSong).toString());


        try {
            const provider = new BrowserProvider(window.ethereum);  // Correctly imported Web3Provider
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, contractABI, signer);

            const tx = await contract.purchaseMusic(song, { value: pricePerSong });
            await tx.wait();

            alert(`Successfully purchased ${song} song(s)!`);
        } catch (error) {
            console.error("Transaction failed", error);
            setErrorMessage("Transaction failed. Please try again.");
        }
    }

    return (
        <div>
            <h2>Purchase Songs</h2>
            {!userAddress ? (
                <button onClick={connectWallet}>Connect Wallet</button>
            ) : (
                <p>Connected as: {userAddress}</p>
            )}

            <input
                type="string"
                value={song}
                onChange={(e) => setSong(e.target.value)}
                placeholder="Enter number of songs"
                min="1"
            />
            <button onClick={purchaseSongs}>Purchase</button>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    );
}

export default PurchaseSongs;

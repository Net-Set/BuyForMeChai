import React, { useState } from 'react';
import { ethers } from 'ethers';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

// ABI of your contract (your actual ABI goes here)
const contractABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"message","type":"string"}],"name":"buychai","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"getMemos","outputs":[{"components":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"message","type":"string"},{"internalType":"uint256","name":"timestemp","type":"uint256"},{"internalType":"address","name":"from","type":"address"}],"internalType":"struct BuyChainDapp.Memo[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"}];

const contractAddress = "0x072901Bf5BA9ef577a87B232de4B1b437f601C08"; // Replace with your contract address

function CustomForm({ walletAddress }) { // Accept walletAddress as a prop
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  // Send a transaction to the contract
  const buyChai = async () => {
    if (!window.ethereum) {
      alert('Please install MetaMask to use this feature.');
      return;
    }

    if (name && message) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);

        const tx = await contract.buychai(name, message, {
          value: ethers.parseEther('0.01')
        });

        await tx.wait();
        console.log('Transaction completed:', tx);
        alert('Chai bought successfully!');
      } catch (error) {
        console.error('Error:', error);
        alert('Transaction failed!');
      }
    } else {
      alert('Please fill in both the name and message fields.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await buyChai();
  };

  return (
    <div>
      <h6 className="text-left-label">Connected Wallet: {walletAddress || 'Not Connected'}</h6>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formGroupName">
          <Form.Label className="text-left-label">Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGroupMessage">
          <Form.Label className="text-left-label">Message</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" className="text-left-label" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default CustomForm;

import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

// ABI of your contract (ensure this is correct)
const contractABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"message","type":"string"}],"name":"buychai","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"getMemos","outputs":[{"components":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"message","type":"string"},{"internalType":"uint256","name":"timestemp","type":"uint256"},{"internalType":"address","name":"from","type":"address"}],"internalType":"struct BuyChainDapp.Memo[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"}];

const contractAddress = "0x072901Bf5BA9ef577a87B232de4B1b437f601C08"; // Replace with your contract address


const MemosList = () => {
    const [memos, setMemos] = useState([]);
    const [loading, setLoading] = useState(true);
  
    // Fetch memos from the contract
    const fetchMemos = async () => {
      if (!window.ethereum) {
        alert('Please install MetaMask to use this feature.');
        return;
      }
  
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(contractAddress, contractABI, provider);
  
        const memosFromContract = await contract.getMemos();
        // Convert memos data to a standard format
        const formattedMemos = memosFromContract.map(memo => ({
          name: memo.name,
          message: memo.message,
          timestemp: Number(memo.timestemp), // Convert BigInt to number
          from: memo.from,
        }));
        setMemos(formattedMemos);
      } catch (error) {
        console.error('Error fetching memos:', error);
        alert('Error fetching memos. Check the console for details.');
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchMemos();
    }, []);
  
    return (
      <div className="container mt-4">
        <h3>Memos</h3>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Message</th>
                <th>Timestamp</th>
                <th>From</th>
              </tr>
            </thead>
            <tbody>
              {memos.map((memo, index) => (
                <tr key={index}>
                  <td>{memo.name}</td>
                  <td>{memo.message}</td>
                  <td>{new Date(memo.timestemp * 1000).toLocaleString()}</td> {/* Convert timestamp */}
                  <td>{memo.from}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  };
  
  export default MemosList;
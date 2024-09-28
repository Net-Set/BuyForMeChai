import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import '../App.css';
// ABI of your contract (ensure this is correct)
const contractABI = [
  { "inputs": [], "stateMutability": "nonpayable", "type": "constructor" },
  { "inputs": [{ "internalType": "string", "name": "name", "type": "string" }, { "internalType": "string", "name": "message", "type": "string" }], "name": "buychai", "outputs": [], "stateMutability": "payable", "type": "function" },
  { "inputs": [], "name": "getMemos", "outputs": [{ "components": [{ "internalType": "string", "name": "name", "type": "string" }, { "internalType": "string", "name": "message", "type": "string" }, { "internalType": "uint256", "name": "timestemp", "type": "uint256" }, { "internalType": "address", "name": "from", "type": "address" }], "internalType": "struct BuyChainDapp.Memo[]", "name": "", "type": "tuple[]" }], "stateMutability": "view", "type": "function" }
];

const contractAddress = "0x072901Bf5BA9ef577a87B232de4B1b437f601C08"; // Replace with your contract address

const MemosList = ({ isDarkMode }) => {
  const [memos, setMemos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State to hold any error messages

  // Function to format memo data
  const formatMemos = (memosFromContract) => {
    return memosFromContract.map(memo => ({
      name: memo.name,
      message: memo.message,
      timestemp: Number(memo.timestemp), // Convert BigInt to number
      from: memo.from,
    }));
  };

  // Fetch memos from the contract
  const fetchMemos = async () => {
    if (!window.ethereum) {
      setError('Please install MetaMask to use this feature.');
      setLoading(false);
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, contractABI, provider);

      const memosFromContract = await contract.getMemos();
      const formattedMemos = formatMemos(memosFromContract);
      setMemos(formattedMemos);
    } catch (error) {
      console.error('Error fetching memos:', error);
      setError('Error fetching memos. Check the console for details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMemos();
  }, []);

  // Optional: Set an interval to fetch memos every X seconds for real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      fetchMemos();
    }, 10000); // Fetch every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`container mt-4 ${isDarkMode ? 'text-white' : 'text-dark'}`}>
      <h3>Memos</h3>
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>} {/* Display error message */}
      {!loading && !error && memos.length === 0 && <p>No memos found.</p>} {/* No memos message */}
      {!loading && !error && memos.length > 0 && (
        <div className="table-responsive rounded"> {/* Responsive table wrapper */}
          <table className={`table table-bordered rounded-corners ${isDarkMode ? 'table-dark rounded' : ' rounded'}`}>
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
                  <td className="wrap-text">{memo.from}</td> {/* Apply wrap class */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MemosList;

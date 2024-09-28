import './App.css';
import CustomForm from './components/form';
import { ethers } from 'ethers';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import MemosList from './components/memoslist';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button'; // Import Button here
import { useState } from 'react'; // Import useState to manage wallet connection

function App() {
  const [walletAddress, setWalletAddress] = useState(null); // State to hold wallet address

  // Function to connect to MetaMask
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWalletAddress(accounts[0]);
      } catch (error) {
        console.error('Error connecting to MetaMask:', error);
      }
    } else {
      alert('MetaMask not detected');
    }
  };

  return (
    <div className="App ">
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">BuyChai</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto"> {/* Push items to the right */}
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">List</Nav.Link>
            </Nav>
            {/* Connect Wallet Button placed inside Navbar */}
            <Button onClick={connectWallet} variant="success" className="ms-3">
              Connect Wallet
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <header className="mt-5 ">
        <Container>
          <Row className="justify-content-center mt-5">
            <Col xs={12} md={6} lg={4}>
              <CustomForm walletAddress={walletAddress} /> {/* Pass walletAddress to CustomForm */}
            </Col>
            <MemosList />
          </Row>
        </Container>
      </header>
    </div>
  );
}

export default App;

import './App.css';
import CustomForm from './components/form';
import { ethers } from 'ethers';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import MemosList from './components/memoslist';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import LightLogo from './Image/BuyForMeLogo.png'; // Light mode logo
import DarkLogo from './Image/bg-dark.png'; // Dark mode logo

function App() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Toggle class on body based on dark mode
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

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

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar expand="lg" className={isDarkMode ? 'bg-dark' : 'bg-body-tertiary'}>
          <Container>
            <Navbar.Brand as={Link} to="/" className={isDarkMode ? 'text-light' : 'text-dark'}>
              {/* Conditionally set logo based on isDarkMode */}
              <img 
                src={isDarkMode ? DarkLogo : LightLogo} 
                style={{ width: '100px', height: '40px' }} 
                alt="BuyForMeChai" 
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link as={Link} to="/" className={isDarkMode ? 'text-light' : 'text-dark'}>Home</Nav.Link>
                <Nav.Link as={Link} to="/list" className={isDarkMode ? 'text-light' : 'text-dark'}>List</Nav.Link>
              </Nav>
              <Button onClick={connectWallet} variant={isDarkMode ? 'outline-light' : 'outline-dark'} className="ms-3">
                Connect Wallet
              </Button>
              <ToggleButton
                id="toggle-check"
                type="checkbox"
                variant={isDarkMode ? 'outline-light' : 'outline-dark'}
           
                onChange={toggleDarkMode}
                className="ms-3"
              >
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
              </ToggleButton>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Container className="p-10">
          <header className="mt-5 p-10">
            <Row className={isDarkMode ? 'bg-dark text-white justify-content-center mt-5 p-5 border-light rounded' : 'bg-body-tertiary p-5 border-light rounded'}>
              <Routes>
                <Route path="/" element={<CustomForm walletAddress={walletAddress} />} />
                <Route path="/list" element={<MemosList isDarkMode={isDarkMode} />} />
              </Routes>
            </Row>
          </header>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;

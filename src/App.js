import './App.css';
import CustomForm from './components/form';
import { ethers } from 'ethers';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import MemosList from './components/memoslist';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
function App() {
  return (
    <div className="App ">
     <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">BuyChai</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto"> {/* Use ms-auto to push items to the right */}
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">List</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      <header className="mt-5 ">
        <Container>
          <Row className="justify-content-center mt-5"> {/* Adds margin-top */}
            <Col xs={12} md={6} lg={4}>
              <CustomForm />
            </Col>
            <MemosList />
          </Row>
        </Container>
      </header>
    </div>
  );
}

export default App;

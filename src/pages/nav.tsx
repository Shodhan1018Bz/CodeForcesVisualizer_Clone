import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { BrowserRouter as Router, Routes, Route,Link } from "react-router-dom";


function NavBar() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>CodeForces Visualizer</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/Compare">Compare</Nav.Link>
          <Nav.Link href="/VirtualratingChange">Virtual Rating Changing</Nav.Link>
          <Nav.Link href="/SaySomething">Say Somthing</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <Router>
      <Routes>
          <Route path="/"/>
            <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
      </Router>
    </Navbar>
  );
}

export default NavBar;
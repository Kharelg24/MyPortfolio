import React from "react";

// Bootstrap
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


function Heading() {
  return (
    <>
    <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="home"><img src="/pictures/bear.jpeg" alt="userLogo" style={{width: 50, height: 45}}/></Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="home">Home</Nav.Link>
            <Nav.Link href="bookList">Book List</Nav.Link>
            <Nav.Link href="readList"> Read List</Nav.Link>
            <Nav.Link href="feedbacks">Feedbacks</Nav.Link>
            <Nav.Link href="aboutMe">About Me</Nav.Link>

          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Heading;

import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { fetchSounds, SoundResult } from "../sozai/sozai";

const Home: React.FC = () => {
  const [soundsResult, setSounds] = React.useState<SoundResult | undefined>(undefined);
  const fetch = () => {
    fetchSounds(setSounds);
  }

  React.useEffect(() => {
    fetch();
  }, [])

  return (
    <div>
      <Navbar variant="dark" bg="primary" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Osozai</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home" active>Home</Nav.Link>
              <Nav.Link href="#link">Trend</Nav.Link>
              <Nav.Link href="#link">Recent</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <h1>...</h1>
    </div>
  )
}

export default Home;
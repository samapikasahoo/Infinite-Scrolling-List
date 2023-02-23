import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const Header = (props) => {
  return (
    <Navbar
      bg="dark"
      sticky="top"
      variant="dark"
      className="d-flex justify-content-between"
    >
      <Nav className="ml-auto">
        <Navbar.Brand>
          <h3>Scrollbook </h3>
        </Navbar.Brand>
      </Nav>
      <Nav className="ml-auto">
        <Navbar.Brand>
          <Link to="/">
            <Button variant="outline-success" size="lg" active type="submit">
              Logout
            </Button>
          </Link>
        </Navbar.Brand>
      </Nav>
    </Navbar>
  );
};

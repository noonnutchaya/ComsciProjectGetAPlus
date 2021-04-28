import React, { useState } from "react";
import logo from "../Image/adminLogo.png";
import "bootstrap/dist/css/bootstrap.min.css";
import {Nav,Navbar} from "react-bootstrap";

const NavbarTab = props => {
  return (
    <div>
      {/* style={{ backgroundColor: 'white'}} */}

      <Navbar
        style={{ backgroundColor: "white" }}
        variant="light"
        className="mr-auto"
      >
        <Navbar.Brand href="/">
          {" "}
          <img style={{ width: "36%", height: "47%" }} src={logo} />{" "}
        </Navbar.Brand>
        <Nav className="mr-auto"></Nav>
        <Nav className="justify-content-end">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/Order">Order</Nav.Link>
          <Nav.Link href="/Payment">Awaiting Payment</Nav.Link>
          <Nav.Link href="/Doing">Doing</Nav.Link>
          <Nav.Link href="/Finish">Finish</Nav.Link>
          <Nav.Link href="/Done">Done</Nav.Link>
          <Nav.Link href="/Reject">Reject</Nav.Link>
        </Nav>
      </Navbar>
    </div>
  );
};
export default NavbarTab;

import React, { useState } from 'react'
import logo from '../img/logo.PNG'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Nav, Navbar, Modal, Form, Tabs, Tab, FormControl, Layout } from 'react-bootstrap'
const NavbarHead = props => {
    return (
        <div>
            {/* style={{ backgroundColor: 'white'}} */}

            <Navbar style={{ backgroundColor: 'white' }} variant="light" className="mr-auto">
                <Navbar.Brand href="/">  <img style={{ width: "50%", height: "70%" }} src={logo} /> </Navbar.Brand>
                <Nav className="mr-auto">
                </Nav>
                <Nav className="justify-content-end" >
                    <Nav.Link href="/">หน้าแรก</Nav.Link>
                    {/* <Nav.Link href="/Status">ตรวจสอบสถานะ</Nav.Link> */}
                    {/* <Nav.Link href="/">ติดต่อเรา</Nav.Link> */}
                </Nav>
            </Navbar>
        </div>

    )
}
export default NavbarHead
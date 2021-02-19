import React, { useState } from 'react'
import { Layout, Menu, Breadcrumb, Row, Col, Divider } from 'antd';
import './homepage.css';
import NavbarHead from './NavbarHead'
import Welcome from './Welcome'
import Type from './Type'
const Homepage = props => {
    const [count, setCount] = useState(0)
    const { Header, Content, Footer } = Layout;

    return (
        <div> 
            <NavbarHead />
            <Row>
                <Col className="setWelcome"><Welcome /></Col>
                
            </Row>
            <Row >
                <Col className="setType"><Type/></Col>
            </Row>
            <Footer className="setFooter"></Footer>

        </div>
    )
}
export default Homepage
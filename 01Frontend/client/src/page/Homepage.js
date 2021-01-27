import React, { useState } from 'react'
import { Layout, Menu, Breadcrumb, Row, Col, Divider } from 'antd';
import './homepage.css';
import Navbar from './Navbar'
import Welcome from './Welcome'
import Type from './Type'
const Homepage = props => {
    const [count, setCount] = useState(0)
    const { Header, Content, Footer } = Layout;

    return (
        <div>
            <Row>
                <Col>
                    <Navbar />
                </Col>
               
                <Col style={{ marginTop:90 ,marginLeft: 'auto', marginRight:'auto' }}><Welcome /></Col>
                
            </Row>
            <Row >
                <Col style={{ marginLeft: 'auto', marginRight:'auto' }}><Type/></Col>
            </Row>
            <Footer style={{ textAlign: 'center', backgroundColor: '#fcfcbc' }}></Footer>

        </div>
    )
}
export default Homepage
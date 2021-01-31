import React, { useState } from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import 'antd/dist/antd.css';
import './homepage.css';
const Homepage = props => {
    const [count, setCount] = useState(0)
    const { Header, Content, Footer } = Layout;

    return (
        
            <Layout >
            <Header   style={{ position: 'fixed', zIndex: 0, width: '100%' ,backgroundColor:  '#ffffff' }}>
                <div className="logo" />
                <Menu  theme="light"  mode="horizontal" defaultSelectedKeys={['1']} >
                    <Menu.Item key="1" style={{ marginLeft: 1500}}>Home</Menu.Item>
                    <Menu.Item key="2" style={{ marginLeft: 20}}>Contact</Menu.Item>

                </Menu>
            </Header>
        </Layout>
    )
}
export default Homepage
import React, { useState } from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import 'antd/dist/antd.css';
import Navbar from '../page/Navbar'
const FourPages = props => {
    const { Header, Content, Footer } = Layout;

    return (
        <div>
            <Layout >
              <Navbar/>
        </Layout></div>
    )
}
export default FourPages
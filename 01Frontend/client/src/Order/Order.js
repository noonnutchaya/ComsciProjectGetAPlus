import React, { useState } from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import 'antd/dist/antd.css';
import NavbarHead from '../page/NavbarHead'
const Order = props => {
    const { Header, Content, Footer } = Layout;
    const [count, setCount ] = useState('geeee')
    function submit( ) {

    }
    return (
        <div> 
            {/* <NavbarHead/> */}
            <h1>order</h1>

            <button onClick={submit}></button>

        </div>
    )
}
export default Order
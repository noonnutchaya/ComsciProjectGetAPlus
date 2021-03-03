import React, { useState } from 'react'
import { Layout, Menu, Breadcrumb, Row, Col, Select, InputNumber, Upload, message, Button, Radio, Modal, Input, Form, Drawer } from 'antd';
import 'antd/dist/antd.css';
import NavbarHead from '../page/NavbarHead'
import { storage } from '../firebase';
import firebase from '../firebase'
const db = firebase.firestore();
const onNumberOnlyChange = (event) => {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
    const isValid = new RegExp("[0-9]").test(keyValue);
    if (!isValid) {
        event.preventDefault();
        return;
    }
};
const Status = props => {
    const { Header, Content, Footer } = Layout;
    const [phone, setPhone] = useState('')
    const [phoneError, setPhoneError] = useState('')
    const [statusPhone, setStatusPhone] = useState(false)
    const [allData, setAllData] = useState([])
    function phonenumber(e) {
        let inputtxt = e.target.value
        var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if (inputtxt.match(phoneno)) {
            setPhone(inputtxt)
            setStatusPhone(true)
        }

        else {
            setPhoneError(inputtxt)
            setStatusPhone(false)
        }
    }
    async function onSearch() {
        if (phoneError != '' && statusPhone == false) {
            message.error("กรุณากรอกเบอร์โทรให้ถูกต้อง")
            setPhone('')
        }
        else if (phone == '' && statusPhone == false) {
            message.error("กรุณากรอกเบอร์โทร")
            setPhone('')

        }
        else {
            console.log(phone)
            //หาใน db 

            let wholedata = []
            await db.collection("Order").where("Phone", "==", phone).get()
                .then((res) => {
                    res.forEach(doc => {
                        var temp = [];
                        temp.push(doc.id)
                        temp.push(doc.data())
                        wholedata.push(temp)
                        // console.log("doc", temp)
                        console.log("doc", doc.data())

                    });
                    

                });
            setAllData(await wholedata)
            console.log(allData)
            setPhone('')  //setค่าให้เท่าเดิม จะได้ค้นหาได้ใหม่


        }
    }

    return (
        <div>
            <Layout >
                <NavbarHead />
                <Row>
                    <Col>  <Input type="text" onKeyPress={onNumberOnlyChange} onChange={phonenumber} /></Col>
                    <Col>  <Button key="buy" onClick={onSearch}>Search</Button></Col>
                </Row>
                <Row>
                    <Col>
                    </Col>
                </Row>

            </Layout></div>
    )
}
export default Status
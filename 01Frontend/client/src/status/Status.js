import React, { useState, useEffect } from 'react'
import { Layout, Row, Col, message, Button, Input, Table, Tag, Space } from 'antd';
import 'antd/dist/antd.css';
import NavbarHead from '../page/NavbarHead'
import "../CSS/table.css";
import "../CSS/decoration.css";
import "../status/status.css";
import "../status/search.css";
import { storage } from '../firebase';

import { SearchOutlined } from '@ant-design/icons';
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
    const [lst, setLst] = useState([])
    const [lstAlldata, setLstAlldata] = useState([])
    let lstSearch = []
    useEffect(() => {
        allData()
    }, [])
    async function allData() {
        let wholedata = []
        await db.collection("Order").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                var temp = [];
                temp.push(doc.id)
                temp.push(doc.data())
                wholedata.push(temp)

            });
        })
        setLst(wholedata)
    }
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
    function onSearch() {
        if (phoneError != '' && statusPhone == false) {
            message.error("กรุณากรอกเบอร์โทรให้ถูกต้อง")
            setPhone('')
            setLstAlldata([])
        }
        else if (phone == '' && statusPhone == false) {
            message.error("กรุณากรอกเบอร์โทร")
            setLstAlldata([])


        }
        else {
            lstSearch = []
            // console.log('lst',lst);
            const templst = lst.filter(item => item[1].Phone == phone)
            if (templst.length == 0) {
                message.error("ไม่พบข้อมูล")

            }
            setLstAlldata(templst)
            allData('')
            // setPhone('')
            

        }
    }
    function renderTableHeader() {
        return (
            <tr>
                <th> วัน-เวลาการสั่งงาน </th>
                <th> เลขรายการ </th>
                <th> ชื่อ </th>
                <th> E-mail </th>
                <th> รายละเอียดงาน </th>
                <th> จำนวน </th>
                <th> ราคา </th>
                <th> สถานะ </th>
            </tr>
        );
    }


    return (
        <div>
            <Layout style={{ backgroundColor: "white" }} >
                <NavbarHead />
                <Row  className="setPosition">
                    <Col > 
                        <div id="setCenterTitle" >STATUS</div>
                   </Col>
                </Row>
                <Row className="setPosition" >

                    <Col >  <Input type="text" size={'large'} onKeyPress={onNumberOnlyChange} onChange={phonenumber} placeholder="Phone Number" style={{ width: 200 }} /></Col>
                    <Col>   <Button  type="primary" icon={<SearchOutlined />} size={'large'} onClick={onSearch} style={{ marginLeft: 20 }}> Search </Button></Col>
                    {/* <Col>   <button id="setEffectButton"  onClick={onSearch}> Search 🔍</button></Col> */}
                </Row>
                <Row className="setPosition" style={{marginTop: "70px" }} >
                    <Col> <table id="setTable">
                        <tbody>
                            {lstAlldata.length !== 0 && renderTableHeader()}
                            {lstAlldata.map((order, index) => {
                                const { Name, Type, Phone, Description, Size, Weight, Color, Price, Quantity, Url, OrderDate, IdDoc, Email, OrderNumber, WorkStatus } = order[1]; //destructuring
                                // console.log('order', order)
                                let tempDate = OrderDate.toDate().toString();
                                let stringArray = tempDate.split(" ");
                                return (
                                    <tr key={Name}>
                                        <td>{stringArray[2]}-{stringArray[1]}-{stringArray[3]}</td>
                                        <td>{OrderNumber}</td>
                                        <td>{Name}</td>
                                        <td>{Email}</td>

                                        <td>สั่งพิมพ์ {Type} {Color} ขนาด {Size} ({Weight} แกรม) <br /> {Description}</td>
                                        <td>{Quantity} ชุด</td>
                                        <td>{Price} บาท</td>
                                        <td>{WorkStatus}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    </Col>
                </Row>
                <Footer style={{ backgroundColor: '#fcfcbc', bottom: 0, marginBottom: 0, position: 'fixed', width: '3000px' }}></Footer>
            </Layout></div>
    )
}
export default Status
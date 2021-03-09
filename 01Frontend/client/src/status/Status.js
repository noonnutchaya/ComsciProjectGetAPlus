import React, { useState, useEffect } from 'react'
import { Layout, Row, Col, message, Button, Input, Table, Tag, Space } from 'antd';
import 'antd/dist/antd.css';
import NavbarHead from '../page/NavbarHead'
import "../CSS/table.css";
import "../CSS/decoration.css";
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
    const [lst, setLst] = useState(allData())
    const [dataSource, setDatasource] = useState([])
    const [lstAlldata, setLstAlldata] = useState([])
    let lstSearch = []
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
        return wholedata
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
        }
        else if (phone == '' && statusPhone == false) {
            message.error("กรุณากรอกเบอร์โทร")
            setPhone('')

        }
        else {
            lstSearch = []
            lst.then(data => {
                data.forEach((temp) => {
                    if (temp[1].Phone == phone) {
                        console.log(temp[1])
                        lstSearch.push(temp[1])


                    }

                })
            }).then(
                setLstAlldata(lstSearch)


            )
            // const lstTemp = await lstSearch
            // window.location.reload(false);
            console.log('search', lstAlldata)




        }

    }
    function renderTableHeader() {
        return (
            <tr>
                <th> วัน-เวลาการสั่งงาน </th>
                <th> เลขรายการ </th>
                <th> ชื่อ </th>
                <th> เบอร์โทรศัพท์ </th>
                <th> รายละเอียดงาน </th>
                <th> จำนวน </th>
                <th> ราคา </th>


            </tr>
        );
    }
    useEffect(()=>{
        function renderTableData() {
            console.log('a', lstAlldata);
            return lstAlldata.map((order, index) => {
                const { Name, Type, Phone, Description, Size, Weight, Color, Price, Quantity, Url, OrderDate, IdDoc, Email, OrderNumber } = order; //destructuring
                console.log('order', order)
                let tempDate = OrderDate.toDate().toString();
                let stringArray = tempDate.split(" ");
                return (
                    <tr key={Name}>
                        <td>{stringArray[2]}-{stringArray[1]}-{stringArray[3]}</td>
                        <td>{OrderNumber}</td>
                        <td>{Name}</td>
                        <td>{Phone}</td>
                        <td>สั่งพิมพ์ {Type} {Color} ขนาด {Size} ({Weight} แกรม) <br /> {Description}</td>
                        <td>{Quantity} ชุด</td>
                        <td>{Price} บาท</td>
                        {/* <td><button type="button" id="buttonFile" onClick={e => { window.open(Url, "_blank");}}> {" "} File </button></td> */}
    
                    </tr>
                );
            });
        }
    },renderTableData)

    
    return (
        <div>
            <Layout >
                <NavbarHead />
                <Row>
                    <Col>  <Input type="text" onKeyPress={onNumberOnlyChange} onChange={phonenumber} /></Col>
                    <Col>  <Button key="buy" onClick={onSearch}>Search</Button></Col>
                </Row>
                <Row>
                    <Col> <table id="setTable">
                        <tbody>
                            {renderTableHeader()}
                            {renderTableData()}
                        </tbody>
                    </table>
                    </Col>
                </Row>

            </Layout></div>
    )
}
export default Status
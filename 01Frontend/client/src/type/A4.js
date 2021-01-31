import React, { useState } from 'react'
import { Layout, Menu, Breadcrumb, Row, Col, Select, InputNumber, Upload, message, Button, Radio } from 'antd';
import 'antd/dist/antd.css';
import Navbar from '../page/Navbar'
import { UploadOutlined } from '@ant-design/icons';
import { storage } from '../firebase';
import firebase from '../firebase'
import { getKeyThenIncreaseKey } from 'antd/lib/message';
const { Option } = Select;
const { Header, Content, Footer } = Layout;
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

const A4 = props => {
    // const [count, setCount] = useState(0)
    const [size, setSize] = useState(0)
    const [weight, setWeight] = useState(0) // paper
    const [quantity, setQuantity] = useState(1)
    const [color, setColor] = useState("color")
    const [url, setUrl] = useState(null)
    //img
    const [image, setImage] = useState(null)
    const [status, setStatus] = useState("รอการตรวจสอบ")
    const [loading, setLoading] = useState(false)
    const [imageUrl, setImageUrl] = useState(null)
    const [progress, setProgress] = useState(0)
    const [statusUpload, setStatusUpload] = useState('')




    function handleChangeSize(value) {
        setSize(value)
        console.log(`selected ${value}`);
    }

    function handleChangeWeight(value) {
        setWeight(value)
        console.log(`selected ${value}`);
    }
    function handleChangeQuantity(value) {
        setQuantity(value)
        console.log(`selected ${value}`);
    }
    const img = {
        name: 'file',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(e) {
            console.log(e.file, e.fileList);
            const image = e.file.originFileObj;
            setImage(image)
        }
    };
    function handleChangeColor(value) {
        setColor(value)
        console.log(`selected ${value}`);

    }

    // อย่าลืม check ถ้ามันไม่ส่งค่าอะไรมาเลย 
    function handleSubmit(e) {
        e.preventDefault();
        console.log('Received values of form: ', e);
        console.log("image", image);
        if (image == null) {
            message.error("กรุณาอัพโหลดสลิป")
        } else {
            const uploadTask = storage.ref(`images/${image.name}`).put(image);
            uploadTask.on('state_changed',
                async (snapshot) => {
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    console.log("progress", progress);
                    if (progress !== 100) {
                        setStatusUpload('กรุณารอการอัพโหลดรูป')
                    }
                },
                (error) => {
                    console.log('error', error);
                },
                async () => {
                    // complete function ....
                    const urlfile = await storage.ref('images').child(image.name).getDownloadURL()

                    const payload = { size, weight, quantity, color, urlfile }
                    fetch('http://localhost:9000/testAPI', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(payload)
                    });

                });
        }
    }


    return (
        <div>
            <Navbar />
            <h1 style={{ textAlign: 'center', marginTop: 150 }}>A4 Printing Calculator</h1>
            <Row>
                <Col style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                    <Row>
                        <Col><div>SIZE: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div> </Col>
                        <Col>
                            <Select size={'large'} style={{ width: 200 }} onChange={handleChangeSize} placeholder="SIZE">
                                <Option value="a4">A4</Option>
                            </Select></Col>
                        <Col><div> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Paper weight: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div> </Col>
                        <Col>
                            <Select size={'large'} style={{ width: 200 }} onChange={handleChangeWeight} placeholder="Paper weight:">
                                <Option value="70">70 GSM</Option>
                                <Option value="80">80 GSM</Option>
                                <Option value="120">120 GSM</Option>
                                <Option value="150">150 GSM</Option>
                                <Option value="180">180 GSM</Option>
                            </Select></Col>
                    </Row>
                    <Row style={{ marginTop: 35 }}>
                        <Col>
                            <div>Required Quantity : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div> </Col>
                        <Col>
                            <InputNumber size="large" min={1} max={1000} defaultValue={1} onChange={handleChangeQuantity} /></Col>
                        <Col><div> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; File: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div> </Col>
                        <Col>
                            <Upload {...img}>
                                <Button icon={<UploadOutlined />}>Click to Upload</Button>
                                {/* {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton} */}
                            </Upload>

                        </Col>

                    </Row>
                    <Row>
                        <Col>
                            <div>Black or Colors : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>  </Col>
                        <Col>
                            <Radio.Group defaultValue="color" size="large" onChange={handleChangeColor}>
                                <Radio.Button value="black">Black</Radio.Button>
                                <Radio.Button value="color">Color</Radio.Button>
                            </Radio.Group>
                        </Col>

                    </Row>
                    <Row> <Col><button onClick={handleSubmit}>calculate</button></Col>  </Row>


                </Col>
            </Row>

            <Footer style={{ backgroundColor: '#fcfcbc', bottom: 0, marginBottom: 0, position: 'fixed', width: '3000px' }}></Footer>
        </div>

    )
}
export default A4
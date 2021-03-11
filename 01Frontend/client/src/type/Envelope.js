import React, { useState } from 'react'
import { Layout, Menu, Breadcrumb, Row, Col, Select, InputNumber, Upload, message, Button, Radio, Modal,Input , Form, Drawer} from 'antd';
import 'antd/dist/antd.css';
import NavbarHead from '../page/NavbarHead'
import '../type/CSS/setComponent.css';
import btn from '../img/btn.png';
import { UploadOutlined } from '@ant-design/icons';
import { storage } from '../firebase';
import firebase from '../firebase'
import { getKeyThenIncreaseKey } from 'antd/lib/message';

const { Option } = Select;
const db = firebase.firestore();
const { Header, Content, Footer } = Layout;
const onNumberOnlyChange = (event) => {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
    const isValid = new RegExp("[0-9]").test(keyValue);
    if (!isValid) {
        event.preventDefault();
        return;
    }
};

const Envelope = props => {
    // const [count, setCount] = useState(0)
    const [size, setSize] = useState('DL')
    const [weight, setWeight] = useState(0) // paper
    const [quantity, setQuantity] = useState(1)
    const [color, setColor] = useState('color')
    const [url, setUrl] = useState(null)
    //img
    const [image, setImage] = useState(null)
    const [status, setStatus] = useState("รอการตรวจสอบ")
    const [imageUrl, setImageUrl] = useState(null)
    const [progress, setProgress] = useState(0)
    const [statusUpload, setStatusUpload] = useState('')
    const [json, setJson] = useState('')
    // visible
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isDrawerVisible, setIsDrawerVisible] = useState(false);
    //input Drawer
    const [name,setName] = useState('')
    const [phone,setPhone] = useState('')
    const [description,setDescription] = useState('')
    const [email, setEmail] = useState('')
    function onChangeEmail(e) {
        setEmail(e.target.value)
    }
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
    function phonenumber(e) {
        console.log(e)
        let inputtxt = e
        var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if (inputtxt.match(phoneno)) {
            return true;
        }
        else {
            return false;
        }
   
    }
    const img = {
        name: 'file',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(e) {
            // console.log(e.file, e.fileList);
            const image = e.file.originFileObj;
            setImage(image)
        }
    };
    function handleChangeColor(e) {
        setColor(e.target.value)
        console.log(e.target.value);
    }
    function handleOk() {
        setIsModalVisible(false);
        setIsDrawerVisible(true)
    };

    function handleCancel() {
        setIsModalVisible(false);
    };
    function onCloseDrawer(){
        setIsDrawerVisible(false)
    }
    function onSubmitDrawer() {
        if (name == '') {
            message.error("กรุณากรอกชื่อ")
        }if (email == '') {
            message.error("กรุณากรอก email")
        }
        if (phone == '') {
            message.error("กรุณากรอกเบอร์โทร")
        }
        if (name != '' && phone != '' && email != '') {
            var ID = Math.floor(Date.now() / 1000);
            // let documentID;
            const date = firebase.firestore.Timestamp.fromDate(new Date());
            db.collection('Order').add({
                Name: name,
                Phone: phone,
                Description: description,
                Price: json,
                Size: size,
                Weight: weight,
                Quantity: quantity,
                Color: color,
                Url: imageUrl,
                Email: email,
                WorkStatus: 'รอการยืนยัน',
                OrderDate: date,
                OrderNumber: ID,
                IdDoc: "",
                Type : 'Envelope'
            }).then(docRef => {
                // documentID =  docRef.id
                console.log("add success~")
                window.location.href = "/Finish"
            })
        }
    }
    function onChangeName(e){
        console.log(e.target.value);
        setName(e.target.value)
    }
    function onChangePhone(e){
        setPhone(e.target.value)
    }
    function onChangeDescription(e){
        setDescription(e.target.value)
    }


    // อย่าลืม check ถ้ามันไม่ส่งค่าอะไรมาเลย 
    function handleSubmit(e) {
        e.preventDefault();
        console.log('Received values of form: ', e);
        console.log("image", image);
        if (image == null) {
            message.error("กรุณา Upload ไฟล์")
        } 
        else {
            const uploadTask = storage.ref(`images/${image.name}`).put(image);
            uploadTask.on('state_changed',
                async (snapshot) => {
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    console.log("progress", progress);
                    if (progress !== 100) {
                        setStatusUpload('กรุณารอการอัพโหลดไฟล์')
                    }
                },
                (error) => {
                    console.log('error', error);
                },
                async () => {
                    // complete function ....
                    const urlfile = await storage.ref('images').child(image.name).getDownloadURL()
                    setImageUrl(urlfile)
                    const payload = { size, weight, quantity, color, urlfile }
                    const res = await fetch('http://localhost:9000/calEnvelope', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(payload)
                    });
                    setJson(await res.json())
                    setIsModalVisible(true);
                    console.log(json)
                });

        }
    }


    return (
        <div>
            <NavbarHead />
            <h1 id ="setCenterTitle">ENVELOPE PRINTING CALCULATOR</h1>
            <Row>
                <Col id = "setCenterAllComponent">
                    <Row>
                        <Col><div id = "setTextTopic">Size: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div> </Col>
                        <Col>
                            <Select size={'large'} style={{ width: 300 }} onChange={handleChangeSize} placeholder="SIZE - Envelope DL (11.0 cm x 22.0 cm)">
                                <Option value="DL">Envelope DL (11.0 cm x 22.0 cm)</Option>
                                <Option value="C5">Envelope C5 (16.2 cm x 22.9 cm)</Option>    
                            </Select></Col>
                        <Col>
                            <div id = "setTextTopic">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Black or Colors : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>  </Col>
                        <Col>
                            <Radio.Group defaultValue="color" size="large" onChange={handleChangeColor}>
                                <Radio.Button value="black">Black</Radio.Button>
                                <Radio.Button value="color">Color</Radio.Button>
                            </Radio.Group>
                        </Col>
                    </Row>
                    <Row id ="setSpaceTopComponent">
                        <Col>
                            <div id = "setTextTopic">Required Quantity : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div> </Col>
                        <Col>
                            <InputNumber size="large" style={{ width: 180 }} min={1} max={1000} defaultValue={1} onChange={handleChangeQuantity} /></Col>
                        <Col><div id = "setTextTopic"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;File: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div> </Col>
                        <Col>
                            <Upload {...img} maxCount={1}>
                                <Button icon={<UploadOutlined />}>Click to Upload</Button>
                            </Upload>
                        </Col>
                    </Row>
                    

                    <Row><Col><button onClick={handleSubmit} id = "setEffectButton"> CALCULATE </button></Col></Row>
                    
                </Col>
            </Row>
            <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}  okText="Create Order"
                >
                <h1 className="setTitleModal">Order Summary</h1>
                <p className="setTitleTextModal">Details </p>
                <p className="setTextModal">Type: Envelope </p>
                <p className="setTextModal">Size: {size} </p>
                <p className="setTextModal">Required Quantity: {quantity} GSM</p>
                <p className="setPrice"> Total:    {json}   Baht.</p>
            </Modal>
            <Drawer
                title="Create Order"
                width={500}
                visible={isDrawerVisible}
                bodyStyle={{ paddingBottom: 50 }}
 
            >
                <Form layout="vertical" hideRequiredMark style={{ margin: "center" }}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="name"
                                label="Name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'กรุณากรอกชื่อ',
                                        whitespace: true,
                                    },

                                ]}
                            >
                                <Input placeholder="Please Enter Name" onChange={onChangeName} style={{ width: "400px" }} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>

                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name={['email']}
                                label="Email"
                                rules={[
                                    {
                                        type: 'email',
                                    },
                                    {
                                        required: true,
                                        message: 'กรุณากรอก email',
                                        whitespace: true,
                                    },
                                ]}
                            >
                                <Input placeholder="Please Enter Email" onChange={onChangeEmail} style={{ width: "400px" }} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="phone"
                                label="Phone"
                                rules={[
                                    // {
                                    //     required: true,
                                    //     message: 'Please input Phone Number!',
                                    //     // whitespace: true,
                                    // },
                                    {
                                        validator: (_, value) =>
                                            phonenumber(value) ? Promise.resolve() : Promise.reject(new Error('กรุณากรอกเบอร์โทรให้ถูกต้อง'))
                                            
                                    },
                                ]}
                            >
                                <Input type="text" onKeyPress={onNumberOnlyChange} placeholder="Please Enter Phone Number" onChange={onChangePhone} style={{ width: "400px" }} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="description"
                                label="Description"

                            >
                                <Input.TextArea rows={4} placeholder="please Enter Description" onChange={onChangeDescription} style={{ width: "400px" }} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col >
                            <Form.Item label=" " colon={false}>
                                <Button style={{ marginLeft: 225 }}  onClick={onCloseDrawer}>
                                    Cancel</Button>
                            </Form.Item>
                        </Col>
                        <Col >
                            <Form.Item label=" " colon={false}>
                                <Button type="primary"  style={{ marginLeft:5}} htmlType="submit" onClick={onSubmitDrawer}>
                                    Submit</Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
            <Footer style={{ backgroundColor: '#fcfcbc', bottom: 0, marginBottom: 0, position: 'fixed', width: '3000px' }}></Footer>
        </div>

    )
}
export default Envelope
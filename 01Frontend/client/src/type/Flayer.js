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
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

const Flayer = props => {
    // const [count, setCount] = useState(0)
    const [size, setSize] = useState('A4')
    const [weight, setWeight] = useState(0) // paper
    const [quantity, setQuantity] = useState(1)
    const [color, setColor] = useState('color')
    const [url, setUrl] = useState(null)
    const [colorPaper, setColorPaper] = useState(null)
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
    function handleChangeSize(value) {
        setSize(value)
        console.log(`selected ${value}`);
    }
    function handleChangeColorPaper(value) {
        setColorPaper(value)
        console.log(`selected ${value}`);
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
        // setIsDrawerVisible(true)
    };

    function handleCancel() {
        setIsModalVisible(false);
    };
    function onCloseDrawer(){
        setIsDrawerVisible(false)
    }
    function onSubmitDrawer(){
        console.log(name);
        console.log(phone);
        console.log(description);
        db.collection('Order').add({
            Name: name,
            Phone:phone,
            Description:description,
            Price:json,
            Size:size,
            Weight: weight,
            Quantity: quantity,
            Color: color,
            ColorPaper: colorPaper,
            Url: imageUrl
        }) 
        .then(docRef => {
            console.log("add success~") 
            window.location.href = "/Finish"
        })  
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
            message.error("กรุณาอัพโหลดไฟล์")
        } 
        if (weight == 0) {
            message.error("กรุณาเลือก paper weight")
        }else {
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
                    const payload = { size, weight, quantity, color, urlfile, colorPaper }
                    const res = await fetch('http://localhost:9000/calFlyer', {
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
            <h1 id ="setCenterTitle">FLAYER PRINTING CALCULATOR</h1>
            <Row>
                <Col id = "setCenterAllComponent">
                    <Row>
                        <Col><div id = "setTextTopic">Size: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div> </Col>
                        <Col>
                            <Select size={'large'} style={{ width: 300 }} onChange={handleChangeSize} placeholder="A4">
                                <Option value="a4">A4</Option>
                            </Select></Col>
                        <Col><div id = "setTextTopic"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Paper weight: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div> </Col>
                        <Col>
                            <Select size={'large'} style={{ width: 300 }} onChange={handleChangeWeight}  placeholder="Paper weight">
                                <Option value="70">70 GSM</Option>
                                <Option value="80">80 GSM</Option>
                                <Option value="110">110 GSM</Option>
                                <Option value="120">120 GSM</Option>
                            </Select></Col>
                    </Row>
                    <Row id ="setSpaceTopComponent">
                        <Col>
                            <div id = "setTextTopic">Required Quantity : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div> </Col>
                        <Col>
                            <InputNumber size="large" style={{ width: 180 }} min={1} max={1000} defaultValue={1} onChange={handleChangeQuantity} /></Col>
                        <Col><div id = "setTextTopic"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Color Paper: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div> </Col>
                        <Col>
                            <Select size={'large'} style={{ width: 300 }} onChange={handleChangeColorPaper}  placeholder="Color Paper">
                                <Option value="White">White</Option>
                                <Option value="Yellow">Yellow</Option>
                                <Option value="Pink">Pink</Option>
                                <Option value="Green">Green</Option>
                                <Option value="Blue">Blue</Option>
                            </Select></Col>

                    </Row>
                    <Row id ="setSpaceTopComponent">
                        <Col>
                            <div id = "setTextTopic">Black or Colors : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>  </Col>
                        <Col>
                            <Radio.Group defaultValue="black" size="large" onChange={handleChangeColor}>
                                <Radio.Button value="black">Black</Radio.Button>
                            </Radio.Group>
                        </Col>
                        <Col><div id = "setTextTopic">  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;File: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div> </Col>
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
                <p className="setTextModal">Type: A4 </p>
                <p className="setTextModal">Size: {size} </p>
                <p className="setTextModal">Paper weight: {weight} </p>
                <p className="setTextModal">Required Quantity: {quantity} </p>
                <p className="setTextModal">Color Paper: {colorPaper} </p>
                <p className="setTextModal">Black or Colors: {color} </p>
                <p className="setPrice"> Total:    {json}   Baht.</p>
            </Modal>
            <Drawer
          title="Create a new account"
          width={720}
          visible={isDrawerVisible}
          bodyStyle={{ paddingBottom: 80 }}
          footer={
            <div
              style={{
                textAlign: 'right',
              }}
            >
              <Button onClick={onCloseDrawer} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button onClick={onSubmitDrawer} type="primary">
                Submit
              </Button>
            </div>
          }
        >
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="name"
                  label="Name"
                  rules={[{ required: true, message: 'Please enter user name' }]}
                >
                  <Input placeholder="Please enter user name" onChange={onChangeName}/>
                </Form.Item>
              </Col>
              <Col span={12}>
               
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="phone"
                  label="phone"
                  rules={[{ required: true, message: 'Please select an owner' }]}
                >
                    <Input placeholder="Please enter user name" onChange={onChangePhone}/>
                
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="description"
                  label="Description"
                  rules={[
                    {
                      required: true,
                      message: 'please enter url description',
                    },
                  ]}
                >
                  <Input.TextArea rows={4} placeholder="please enter url description"  onChange={onChangeDescription}/>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Drawer>
            <Footer style={{ backgroundColor: '#fcfcbc', bottom: 0, marginBottom: 0, position: 'fixed', width: '3000px' }}></Footer>
        </div>

    )
}
export default Flayer

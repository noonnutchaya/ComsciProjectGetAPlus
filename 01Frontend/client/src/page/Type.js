import React, { useState } from 'react'
import { Layout, Menu, Breadcrumb, Card, Button, Col, Row } from 'antd';
import 'antd/dist/antd.css';
import './homepage.css';
import a4 from '../img/a4.png'
import card from '../img/card.png'
import envelope from '../img/envelope.png'
import flayer from '../img/flayer.png'
import poster from '../img/poster.png'
import fourpage from '../img/4page.png'
const onClickA4 = () => {
    setTimeout(function () {
        window.location.href = '/a4'
    });
}
const onClickPoster = () => {
    setTimeout(function () {
        window.location.href = '/poster'
    });
}
const onClickCard = () => {
    setTimeout(function () {
        window.location.href = '/card'
    });
}
const onClickEnvelope = () => {
    setTimeout(function () {
        window.location.href = '/envelope'
    });
}
const onClickFlayer = () => {
    setTimeout(function () {
        window.location.href = '/flayer'
    });
}
const onClick4Pages = () => {
    setTimeout(function () {
        window.location.href = '/4pages'
    });
}
const { Meta } = Card;
const Type = props => {
    const [count, setCount] = useState(0)
    const { Header, Content, Footer } = Layout;

   
    return (
        <div>
            <h1 className="fontTypeHeader" style={{ textAlign: 'center' }}>User also calculate price for</h1>
            <Row gutter={[24, 16]} style={{marginTop: "25px"}}>
                <Col span={50} > <Card
                    hoverable
                    style={{ width: 370, height: 390 }}
                    cover={<img className="img" alt="example" src={a4} />}
                >
                    {/* <Meta title="A4"></Meta> */}
                    <h1 className="fontType" >A4</h1>
                    <button id = "setHomebtn" onClick={() => onClickA4()} style={{ marginLeft: 240 }}>Calculate</button>
                </Card>

                </Col>

                <Col span={50}>
                    <Card
                        hoverable
                        style={{ width: 370, height: 390 }}
                        cover={<img alt="example" src={poster} />}
                    >
                        {/* <Meta title="A4"></Meta> */}
                        <h1 className="fontType" >Poster</h1>
                        <button id = "setHomebtn" onClick={() => onClickPoster()}  style={{ marginLeft: 240 }}>Calculate</button>
                    </Card>
                </Col>
                <Col span={50}>
                    <Card
                        hoverable
                        style={{ width: 370, height: 390 }}
                        cover={<img alt="example" src={envelope} />}
                    >
                        {/* <Meta title="A4"></Meta> */}
                        <h1 className="fontType">Envelope</h1>
                        <button id = "setHomebtn" onClick={() => onClickEnvelope()}  style={{ marginLeft: 240 }}>Calculate</button>
                    </Card>
                </Col>
            </Row>
            {/*  อีกแถวนึง */}
            <Row gutter={[24, 16]}>
                <Col span={50}> <Card
                    hoverable
                    style={{ width: 370, height: 390 }}
                    cover={<img alt="example" src={card} />}
                >
                    {/* <Meta title="A4"></Meta> */}
                    <h1 className="fontType">Card</h1>
                    <button id = "setHomebtn" onClick={() => onClickCard()} style={{ marginLeft: 240 }}>Calculate</button>
                </Card>

                </Col>

                <Col span={50}>
                    <Card
                        hoverable
                        style={{ width: 370, height: 390 }}
                        cover={<img alt="example" src={flayer} />}
                    >
                        {/* <Meta title="A4"></Meta> */}
                        <h1 className="fontType">Flayer</h1>
                        <button id = "setHomebtn" onClick={() => onClickFlayer()} style={{ marginLeft: 240 }}>Calculate</button>
                    </Card>
                </Col>
                <Col span={50}>
                    <Card
                        hoverable
                        style={{ width: 370, height: 390 }}
                        cover={<img src={fourpage} />}
                    >
                        {/* <Meta title="A4"></Meta> */}
                        <h1 className="fontType">4 Pages</h1>
                        <button  id = "setHomebtn" onClick={() => onClick4Pages()} style={{ marginLeft: 240 }}>Calculate</button>
                    </Card>
                </Col>
            </Row>


        </div>
    )
}
export default Type
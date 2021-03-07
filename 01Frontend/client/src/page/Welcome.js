import ReactDOM from 'react-dom';
import React, { useState } from 'react';
import { Col, Row } from 'antd';
import books from '../img/books.png'
import {Helmet} from 'react-helmet';

const Welcome = props => {
    
    return (


        <div style={{ textAlign: 'center' }}>
            <div>

                <Row>
                    <Col style={{backgroundColor: "#fcfcbc", justifyContent: "center",padding: "200px", display: "inline-block"}}>
                        <h1 className="fontNongNoon">NONGNOON</h1>
                        <div className="fontNongNoon" style={{fontSize: "20px"}}>Online calculating for printing cost</div>
                        {/* <div><button id = "setStartbtn" style={{marginTop: "30px"}} >Let's Start</button></div> */}
                        
                        
                    </Col>
                    <Col>
                      <img style={{ width: "100%", height: "100%" }} src={books} />
                    </Col>    
                </Row>
            </div>

          
            
          
        </div>

    )
}

export default Welcome;

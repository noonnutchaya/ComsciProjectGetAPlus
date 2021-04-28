import ReactDOM from 'react-dom';
import React, { useState } from 'react';
import { Col, Row } from 'antd';
import books from '../img/books.png'

const Welcome = props => {
    
    return (


        <div style={{ textAlign: 'center' }}>
            <div>

                <Row>
                    <Col style={{backgroundColor: "#fcfcbc", justifyContent: "center",padding: "30px", display: "inline-block"}}>
                        <h1 className="fontNongNoon" >NONGNOON</h1>
                        <div className="fontNongNoon2" >Online calculating for printing cost</div>    
                    </Col>
                    <Col>
                      <img style={{ width: "105%", height: "100%" }} src={books} />
                    </Col>    
                </Row>
            </div>

          
            
          
        </div>

    )
}

export default Welcome;

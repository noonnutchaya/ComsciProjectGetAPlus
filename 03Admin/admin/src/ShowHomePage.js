import React from "react";
import firebase from "./firebase.js";
import "./CSS/reportOrder.css";
import NavbarTab from "./Component/NavbarTab";
import books from "./Image/book.png";
import { Col, Row, Carousel } from "antd";
const db = firebase.firestore();
const orderRef = db.collection("Order");
const auth = firebase.auth();
const firestore = firebase.firestore();

const contentStyle = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79"
};

class ShowHomePage extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <NavbarTab />
        <Row style={{ display: "flex" }}>
          <Col id="homePage">
            <h1 id="homeText">NONGNOON</h1>
            <div id="homeText2" style ={{marginTop:'-20px'}}>Online calculating for printing cost</div>
            <button id="setEffectButton" style ={{marginLeft:'165px', marginTop: '40px'}} onClick={e => { 
                orderRef.orderBy("OrderDate", "desc").get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        orderRef.doc(doc.id).update ({IdDoc: doc.id})
                    });
                })
                window.open("/Order","_self")
            }}> MANAGE ORDERS </button>
          </Col>
          <Col>
            <img id="homePage2" src={books} />
          </Col>
        </Row>
      </div>
    );
  }
}
export default ShowHomePage;

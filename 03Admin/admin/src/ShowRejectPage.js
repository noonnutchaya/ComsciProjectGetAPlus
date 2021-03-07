import React from 'react';
import firebase from './firebase.js';
import './CSS/reportOrder.css';
import OrderList from './Component/TableRejectOrder';
import NavbarTab from './Component/NavbarTab';
const auth = firebase.auth();
const firestore = firebase.firestore();


class ShowRejectPage extends React.Component {

  constructor(){
    super()
}

  render() {
    return (
      <div>
        <NavbarTab/>
        <div className="container">
          <div id = "setCenterTitle">REJECT ORDER LIST</div>
          <OrderList/>
        </div>
      </div>
    );
  }
}
export default ShowRejectPage;
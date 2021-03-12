import React from 'react';
import firebase from './firebase.js';
import './CSS/reportOrder.css';
import OrderList from './Component/TableWaitPayment';
import NavbarTab from './Component/NavbarTab';
const auth = firebase.auth();
const firestore = firebase.firestore();


class ShowPaymentPage extends React.Component {

  constructor(){
    super()
}

  render() {
    return (
      <div>
        <NavbarTab/>
        <div className="container">
          <div id = "setCenterTitle">AWAITING PAYMENT ORDER LIST</div>
          <OrderList/>
        </div>
      </div>
    );
  }
}
export default ShowPaymentPage;
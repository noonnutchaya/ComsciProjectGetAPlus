import React from 'react';
import firebase from './firebase.js';
import './CSS/reportOrder.css';
import OrderList from './Component/TableDoneOrder';
import NavbarTab from './Component/NavbarTab';
const auth = firebase.auth();
const firestore = firebase.firestore();


class ShowDonePage extends React.Component {

  constructor(){
    super()
}

  render() {
    return (
      <div>
        <NavbarTab/>
        <div className="container">
          <div id = "setCenterTitle">DONE ORDER LIST</div>
          <OrderList/>
        </div>
      </div>
    );
  }
}
export default ShowDonePage;
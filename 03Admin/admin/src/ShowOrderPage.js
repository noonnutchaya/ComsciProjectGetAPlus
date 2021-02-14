import React from 'react';
import firebase from './firebase.js';
import './CSS/reportOrder.css';
import OrderList from './Component/TableOrder';
import Navbar from './Component/Navbar';
const auth = firebase.auth();
const firestore = firebase.firestore();


class ShowOrderPage extends React.Component {

  constructor(){
    super()

    // firebase.auth().onAuthStateChanged(user => {
    //   if(!user) {
    //     window.location = '/home'; 
    //   }else{
    //     const email = auth.currentUser.email
    //     let emailVendor = []

        

    //     firestore.collection("EmailVendor").onSnapshot(querySnapshot => {
    //       querySnapshot.forEach((doc) => {
    //           emailVendor.push(doc.data().email)
    //       });
    //     })  
    //     console.log(emailVendor, emailVendor.length)
      
    //     let isAuthorize = false
    //     for(let i=0;i <= emailVendor.length;i++){
    //       if(email === emailVendor[i]){
    //         isAuthorize = true
    //       }
    //       console.log(isAuthorize)
    //     }
    //     // if(!isAuthorize){
    //     //   window.location = '/home'
    //     // }
    //   }
    // });
  }

//   logout = () => {
//     firebase.auth().signOut().then(function() {
//         window.location = '/home'
//     }).catch(function(error) {
//         console.log(error)
//     });
//   }

  render() {
    return (
      <div>
        <Navbar/>
        <div className="container">
          <div id = "setCenterTitle">ORDER LIST ORDER</div>
          <OrderList/>
          {/* <button onClick={() => this.logout()}>Logout</button> */}
        </div>
      </div>
    );
  }
}
export default ShowOrderPage;
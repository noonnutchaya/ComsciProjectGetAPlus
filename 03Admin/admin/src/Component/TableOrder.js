import React, { Component } from 'react';
// import { Link } from "react-router-dom";
import '../CSS/table.css';
import firebase from 'firebase/app'
const db = firebase.firestore();

class TableOrder extends Component {

    constructor() {
        super() 
          this.state = {
              data: []
          }
     }
  
     componentDidMount(){
        db.collection("Order").orderBy("orderDate", "desc").get().then((querySnapshot) => {
            
            const dataList = querySnapshot.docs.map(doc => doc.data())
            console.log(dataList);

            this.setState({ data: dataList });
            
            
            
            // querySnapshot.docs((doc) => {
                // let userOrderList = [];
                // userOrderList.push({
                //     Name: doc.data().Name,
                //     orderDate: doc.data().orderDate,
                //     PhoneNo: doc.data().PhoneNo
                // });
                // this.setState({ data: [] });
                // console.log(doc.id, " => ", doc.data());
                
                
            // });
        });
        // console.log(querySnapshot.docs);
     }

   
    renderTableHeader() {
        return <tr>
            <th> ชื่อ </th>
            <th> เวลา </th>
            <th> เบอร์โทรศัพท์ </th>
        </tr>
    }

    renderTableData() {
        return this.state.data.map((order, index) => {
            const { Name, orderDate, PhoneNo } = order //destructuring
            return (
                <tr key={Name}><td>{Name}</td>
                    <td>{orderDate.toDate().toDateString()}</td>
                    <td>{PhoneNo}</td>

                </tr>
                
                // <tr key={Name}>
                //     <td>{orderDate}</td>
                //     <td>{PhoneNo}</td>
                //     {/* <td>
                //         <Link
                //             to={{
                //                 pathname: "/showOrder",
                //                 data: email // your data array of objects
                //             }}
                //         >
                //             <button>Show</button>
                //         </Link>
                //     </td> */}
                // </tr>
            // )
            )}
            
        )}

   render() { 
      return (
         <div>
            <table id='students'>
               <tbody>
                {this.renderTableHeader()}
                  {this.renderTableData()}
               </tbody>
            </table>
         </div>
      )
   }
}

export default TableOrder 
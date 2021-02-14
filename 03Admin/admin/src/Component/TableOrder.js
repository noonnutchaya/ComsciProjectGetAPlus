import React, { Component } from 'react';
// import { Link } from "react-router-dom";
import '../CSS/table.css';
import '../CSS/decoration.css';
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
        db.collection("FormatOrder").orderBy("OrderDate", "desc").get().then((querySnapshot) => {
            
            const dataList = querySnapshot.docs.map(doc => doc.data())
            console.log(dataList);

            this.setState({ data: dataList });
         
        });
 
     }

   
    renderTableHeader() {
        return <tr>
            <th> วัน-เวลาการสั่งงาน </th>
            <th> ชื่อ </th>
            <th> เบอร์โทรศัพท์ </th>
            <th> รายละเอียดงาน </th>
            <th> จำนวน </th>
            <th> ราคา </th>
            <th> ไฟล์งาน </th>

        </tr>
    }

    renderTableData() {
        return this.state.data.map((order, index) => {
            const { Name, Type, Phone, Description, Size, Weight, Color, Price, Quantity, Url, Dates, Month, Year } = order //destructuring
            console.log(Url);
            let detail = Url
            console.log(detail);
            return (
                <tr key={Name}>
                    <td>{Dates}-{Month}-{Year}</td>
                    <td>{Name}</td>
                    <td>{Phone}</td>
                    <td>สั่งพิมพ์ {Type} {Color} ขนาด {Size} ({Weight} แกรม) - {Description}</td>
                    <td>{Quantity} ชุด</td>
                    <td>{Price} บาท</td>
                    <td><button type="button" id = "buttonFile" onClick={(e) => {
                        window.open(Url, "_blank")}}> File
                    </button></td>
                </tr>
                
              
            )}
            
        )}

   render() { 
      return (
         <div>
            <table id='setTable'>
               <tbody>
                {this.renderTableHeader()}
                  {this.renderTableData()}
               </tbody>
            </table>
            <div id = "footer"> Footer </div>
         </div>
      )
   }
}

export default TableOrder 
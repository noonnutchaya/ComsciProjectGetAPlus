import React, { Component } from "react";
// import { Link } from "react-router-dom";
import "../CSS/table.css";
import "../CSS/decoration.css";
import firebase from "firebase/app";
const db = firebase.firestore();
// const orderRef = db.collection("FormatOrder");
const orderRef = db.collection("Order");

class TableAcceptOrder extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    var dataList = [];
    orderRef.orderBy("OrderDate", "desc").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            if (doc.data().WorkStatus == "รับดำเนินการ") {
                dataList.push(doc.data());
                this.setState({ data: dataList });
            }
        });
    })
}

  renderTableHeader() {
    return (
      <tr>
        <th> วัน-เวลาการสั่งงาน </th>
        <th> ชื่อ </th>
        <th> เบอร์โทรศัพท์ </th>
        <th> รายละเอียดงาน </th>
        <th> จำนวน </th>
        <th> ราคา </th>
        <th> ไฟล์งาน </th>
        <th> รับงาน </th>
        <th> ไม่รับงาน </th>
        
      </tr>
    );
  }

  renderTableData() {
    return this.state.data.map((order, index) => {
      const {Name,Type,Phone,Description,Size,Weight,Color,Price,Quantity,Url,OrderDate,IdDoc,Email} = order; //destructuring
      let tempDate = OrderDate.toDate().toString();
      let stringArray = tempDate.split(" ");
      return (
        <tr key={Name}>
            <td>{stringArray[2]}-{stringArray[1]}-{stringArray[3]}</td>
            <td>{Name}</td>
            <td>{Phone}</td>
            <td>สั่งพิมพ์ {Type} {Color} ขนาด {Size} ({Weight} แกรม) <br/> {Description}</td>
            <td>{Quantity} ชุด</td>
            <td>{Price} บาท</td>
            <td><button type="button" id="buttonFile" onClick={e => { window.open(Url, "_blank");}}> {" "} File </button></td>
            <td><button type="button" id="buttonAccept" onClick={async e => { 
              //orderRef.doc(IdDoc).update ({workStatus: "รับดำเนินการ"});
                console.log("Accept");
                const payload = { Name,Type,Phone,Description,Size,Weight,Color,Price,Quantity,Email}
                    const res = await fetch('http://localhost:9000/mail', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(payload)
                    });
                window.location.reload(false);}}> {" "} ✔ </button>
            </td>
            <td><button type="button" id="buttonReject" onClick={e => { 
              //orderRef.doc(IdDoc).update ({workStatus: "ไม่รับดำเนินการ"});
              console.log("Reject");
              window.location.reload(false);}}> {" "} ✖ </button>
            </td>
        
        </tr>
      );
    });
  }

  render() {
    return (
      <div>
        <table id="setTable">
          <tbody>
            {this.renderTableHeader()}
            {this.renderTableData()}
          </tbody>
        </table>
        <div id="footer"> Footer </div>
      </div>
    );
  }
}

export default TableAcceptOrder;

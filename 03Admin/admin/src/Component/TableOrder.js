import React, { Component } from "react";
// import { Link } from "react-router-dom";
import "../CSS/table.css";
import "../CSS/decoration.css";
import firebase from "firebase/app";
import { Layout } from "antd";
const db = firebase.firestore();
// const orderRef = db.collection("FormatOrder");
const orderRef = db.collection("Order");
const { Footer } = Layout;

class TableOrder extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    var dataList = [];
    orderRef.orderBy("OrderDate", "desc").get().then((querySnapshot) => {
        querySnapshot.forEach( (doc) =>  {
            orderRef.doc(doc.id).update ({IdDoc: doc.id})
            if (doc.data().WorkStatus == "รอการยืนยัน") {
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
        <th> เลขรายการ </th>
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

      const {Name,Type,Phone,Description,Size,Weight,Color,Price,Quantity,Url,OrderDate,IdDoc,Email, OrderNumber,ColorPaper} = order; //destructuring
      let tempDate = OrderDate.toDate().toString();
      let stringArray = tempDate.split(" ");
      let c = 'ขาว-ดำ'
      if (Color == 'color') {
        c = 'สี'
      }
      return (
        <tr key={Name}>
            <td>{stringArray[2]}-{stringArray[1]}-{stringArray[3]}</td>
            <td>{OrderNumber}</td>
            <td>{Name}</td>
            <td>{Phone} </td>
            <td>สั่งพิมพ์ {Type} {c} ขนาด {Size} ( {ColorPaper} {Weight} GSM. ) <br/> {Description}</td>
            <td>{Quantity} ชุด</td>
            <td>{Price} บาท</td>
            <td><button type="button" id="buttonFile" onClick={e => { window.open(Url, "_blank");}}> {" "} File </button></td>
            <td><button type="button" id="buttonAccept" onClick={async e => { 
              window.location.reload(false);
              orderRef.doc(IdDoc).update ({WorkStatus: "ยืนยันการทำงาน - รอการชำระ"});
                console.log("Accept");
                const payload = { Name,Type,Phone,Description,Size,Weight,Color,Price,Quantity,Email, OrderNumber}
                    const res = await fetch('http://localhost:9000/mail', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(payload)
                    });
                    await orderRef.doc(IdDoc).update ({WorkStatus: "ยืนยันการทำงาน - รอการชำระ"});
               window.location.reload(false);}}> {" "} ✔	 </button>
            </td>
            <td><button type="button" id="buttonReject" onClick={async e => { 
              window.location.reload(false);
              orderRef.doc(IdDoc).update ({WorkStatus: "ไม่รับดำเนินการ"});
              console.log("Reject");
              const payload = { Name,Type,Phone,Description,Size,Weight,Color,Price,Quantity,Email, OrderNumber}
              const res = await fetch('http://localhost:9000/rejectMail', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(payload)
                    });
                    await orderRef.doc(IdDoc).update ({WorkStatus: "ไม่รับดำเนินการ"});
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

export default TableOrder;

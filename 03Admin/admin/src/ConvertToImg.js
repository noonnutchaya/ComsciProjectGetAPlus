import React from 'react';
import firebase from './firebase.js';
import './CSS/reportOrder.css';
import OrderList from './Component/TableOrder';
// import {PDFImage} from "pdf-image" ;
// import {PDFtoIMG} from 'react-pdf-to-image';
// import { fromPath } from "pdf2pic";
// import Worker from "worker-loader!./Worker.js";
// import NavBarVendor from './component/NavBarVendor';

const auth = firebase.auth();
const firestore = firebase.firestore();


class ConvertToImg extends React.Component {

  constructor(){
    super()
  }

  componentDidMount() {
    // const options = {
    //     density: 100,
    //     saveFilename: "untitled",
    //     savePath: "./images",
    //     format: "png",
    //     width: 600,
    //     height: 600
    //   };
    //   const storeAsImage = fromPath("/path/to/pdf/sample.pdf", options);
    //   const pageToConvertAsImage = 1;
    //   storeAsImage(pageToConvertAsImage).then((resolve) => {
    //     console.log("Page 1 is now converted as image");
      
    //     return resolve;

    // });
  }

  render() {
    return (
      <div>
        
      </div>
    );
  }
}
export default ConvertToImg;
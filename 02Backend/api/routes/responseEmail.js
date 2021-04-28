var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
const generatePayload = require("promptpay-qr");
const qrcode = require("qrcode");
const fs = require("fs");
var svg2img = require('node-svg2img');

router.post('/', async function(req, res, next) {
  const { Name,Type,Phone,Description,Size,Weight,Color,Price,Quantity,Email, OrderNumber} = req.body;
  console.log(req.body);
  console.log(Email);

  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,   
    auth: {
        user:'*********@gmail.com',
          pass:'*********'
    }
});

  const mobileNumber = "083-750-9438";
  const amount = Price;
  const payload = generatePayload(mobileNumber, { amount }); 

  const options = { type: "svg", color: { dark: "#000", light: "#fff" } };
  await qrcode.toString(payload, options, (err, svg) => {
    if (err) return console.log(err);
    fs.writeFileSync("./routes/Qr/QrCode - Payment.svg", svg);
    console.log('finish gen qr code');
  });

  let input = __dirname + '/Qr/QrCode - Payment.svg';
  svg2img(input, { format: 'png', width: 300, height: 300 }, async function (err, data) {
  await fs.writeFileSync("./routes/Qr/QrCode - Payment.png", data);
  });
      
  var mailOptions = {
    from: 'nongnoon.printingorder@gmail.com',
    to: Email,
    subject: 'เลขรายการ ' + OrderNumber +' ยืนยันการสั่งงาน',
    text: 'สวัสดีค่ะ คุณ' + Name + ' (' + Phone +') ทางร้านได้รับรายการสั่งงานแล้วนะคะ \n' +
    'รายละเอียดงาน:\n' +
    '\tสั่งพิมพ์ ' + Type + ' ' + Color + ' ขนาด ' + Size + ' (' + Weight + 'GSM.) จำนวน ' + Quantity + ' ชุด\n' +
    'เพิ่มเติม:\n' +
    '\t' +Description + '\n' +
    'ราคา ' + Price + ' บาท' +
    'โดยลูกค้าสามารถ Scan QR Code ด้านล่างนี้เพื่อชำระนะคะ \n' + 
    '\tหากลูกค้าทำการชำระแล้ว รบกวน Reply Mail นี้พร้อมแนบสลิปการชำระด้วยนะคะ' +
    '\n\nขอบคุณค่ะ\nสอบถาม/ติดต่อ 035-321945',
    attachments: [{   
      filename: '/Qr/QrCode - Payment.png.png',
      path: __dirname + '/Qr/QrCode - Payment.png',
    }]
  }; 
      
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

    res.send("hihi")
});

module.exports = router;

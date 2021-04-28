var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');


router.post('/', function(req, res, next) {
  const { Name,Phone,Price,Email, OrderNumber} = req.body;
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
      
    var mailOptions = {
      from: 'nongnoon.printingorder@gmail.com',
      to: Email,
      subject: 'เลขรายการ ' + OrderNumber +' แจ้งรายการงานเสร็จสิ้น',
      text: 'สวัสดีค่ะ คุณ' + Name + ' (' + Phone +') ทางร้านได้ทำรายการงานเสร็จแล้วนะคะ \n' +
      'ลูกค้าสามารถมารับงานได้ที่ร้านได้เลยค่ะ' +
      '\n\nขอบคุณค่ะ\nสอบถาม/ติดต่อ 035-321945'
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

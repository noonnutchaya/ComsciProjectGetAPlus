var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');


router.post('/', function(req, res, next) {
  const { Name,Type,Phone,Description,Size,Weight,Color,Price,Quantity,Email, OrderNumber} = req.body;
  console.log(req.body);
  console.log(Email);
  
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,   
        auth: {
          user:'nongnoon.printingorder@gmail.com',
          pass:';US31*Ws96>qOLso'
        }
    });
      
      var mailOptions = {
        from: 'nongnoon.printingorder@gmail.com',
        to: Email,
        subject: 'เลขรายการ ' + OrderNumber +' ปฏิเสธการสั่งงาน',
        text: 'สวัสดีค่ะ คุณ' + Name + ' (' + Phone +') ทางร้านขออนุญาตปฏิเสธการสั่งงานนะคะ \n' +
        'ขออภัยมา ณ ที่นี้ค่ะ \n\nสอบถาม/ติดต่อ 035-321945'
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

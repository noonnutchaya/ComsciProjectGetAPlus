var express = require("express");
var router = express.Router();
const generatePayload = require("promptpay-qr");
const qrcode = require("qrcode");
const fs = require("fs");
var svg2img = require('node-svg2img');

router.get("/", async function(req, res, next) {
  const mobileNumber = "083-750-9438";

  const amount = 10;
  const payload = generatePayload(mobileNumber, { amount }); 
  console.log(payload);

  // Convert to SVG QR Code
  const options = { type: "svg", color: { dark: "#000", light: "#fff" } };
  qrcode.toString(payload, options, (err, svg) => {
    if (err) return console.log(err);
    fs.writeFileSync("./routes/Qr/qr.svg", svg);
    console.log(svg);
  });

  res.sendFile(__dirname + "/Qr/qr.svg");
});

module.exports = router;

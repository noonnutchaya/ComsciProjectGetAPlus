var express = require("express");
var router = express.Router();
var fs = require("fs");
const Jimp = require("jimp");
const brain = require("brain.js");
var pdf2img = require("pdf-img-convert");

router.post("/", async function(req, res, next) {
  const { weight, quantity, color, urlfile, colorPaper } = req.body;
  let [allPage, typeFile, realPrice, tempRealPrice, count] = [1, 0, 0, 0, 0];
  let [int_part, float_part] = [0, 0];

  console.log("--- Flyer ---");
  console.log(req.body);

  if (urlfile.includes("pdf") || urlfile.includes("PDF")) {
    typeFile = 1;
    console.log("File Type: PDF");
    let pdfArray = await pdf2img.convert(urlfile);
    console.log("get total page");
    allPage = pdfArray.length;
  } else {
    console.log("File Type: Image");
  }

  realPrice = allPage;
  console.log("PriceWithoutWeight: " + realPrice );

  if (colorPaper != "White") {
    console.log("colorPaper != color");
    if (weight == 70 || weight == 80) {
      console.log("+1");
      realPrice = realPrice + allPage; // 1 baht. per sheet
    } else if (weight == 110 || weight == 120) {
      console.log("+2");
      realPrice = realPrice + allPage * 2; // 2 baht. per sheet
    }
  } else {
    console.log("colorPaper == White");
    if (weight == 70 || weight == 80) {
      console.log("+0");
      realPrice = realPrice; // free
    } else if (weight == 110 || weight == 120) {
      console.log("+1");
      realPrice = realPrice + allPage; // 1 baht. per sheet
    }
  }

  console.log("PricePerOne: " + realPrice);
  console.log("Quantity: " + quantity);
  realPrice = realPrice * quantity;

  console.log("totalPrice: " + realPrice);
  console.log("-----------------------------------");
  res.send(realPrice.toString());
});

module.exports = router;

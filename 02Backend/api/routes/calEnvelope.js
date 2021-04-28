var express = require("express");
var router = express.Router();
var fs = require("fs");
const Jimp = require("jimp");
const brain = require("brain.js");
var pdf2img = require("pdf-img-convert");

router.post("/", async function(req, res, next) {
  const { size, weight, quantity, color, urlfile } = req.body;
  let [realPrice] = [0];

  console.log("--- Envelope ---");
  console.log(req.body);

  if (color == "color") {
    realPrice = quantity * 2;
  } else {
    realPrice = quantity;
  }

  if (size == "DL") {
    console.log("DL");
    realPrice = realPrice + quantity * 0.5;
  } else if (size == "C5") {
    console.log("C5");
    realPrice = realPrice + quantity * 0.75;
  }

  if (realPrice % 2 != 0) {
    console.log("With Dot: " + realPrice);
    // realPrice = Math.trunc(realPrice) + 1;
  }

  console.log("totalPrice: " + realPrice);
  console.log("-----------------------------------");
  res.send(realPrice.toString());
});

module.exports = router;

var express = require("express");
var router = express.Router();
var fs = require("fs");
const Jimp = require("jimp");
const brain = require("brain.js");
var pdf2img = require("pdf-img-convert");

router.post("/", async function(req, res, next) {
  const { weight, quantity, color, urlfile } = req.body;
  let [allPage, typeFile, realPrice, tempRealPrice, count] = [1, 0, 0, 0, 0];
  let [white, lightTone, darkTone] = [0, 0, 0];
  let [percentWhite, percentLightTone, percentDarkTone] = [0, 0, 0];
  let [int_part, float_part] = [0, 0];

  console.log("--- 4 Pages ---");
  console.log(
    "req -> " +
      "color: " +
      color +
      " - quantity: " +
      quantity +
      " - weight: " +
      weight
  );

  if (urlfile.includes("pdf") || urlfile.includes("PDF")) {
    typeFile = 1;
    console.log("File Type: PDF");
    let pdfArray = await pdf2img.convert(urlfile);
    console.log("saving");
    allPage = pdfArray.length;
    for (i = 0; i < pdfArray.length; i++) {
      fs.writeFile("output" + (i + 1) + ".png", pdfArray[i], function(error) {
        if (error) {
          console.error("Error: " + error);
        }
      });
    }
  } else {
    console.log("File Type: Image");
  }

  // training data - brain.js
  const network = new brain.NeuralNetwork();
  let fileName = "./routes/trainingData.JSON";
  let trainingData = await JSON.parse(fs.readFileSync(fileName, "utf8"));
  network.train(trainingData);

  if (color == "color") {
    console.log("color printing");
    for (i = 1; i <= allPage; i++) {
      let image;

      if (typeFile == 1) {
        image = await Jimp.read("./output" + i + ".png"); // pdf
      } else {
        image = await Jimp.read(urlfile); // image
      }

      image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, idx) => {
        const thisColor = {
          r: image.bitmap.data[idx + 0],
          g: image.bitmap.data[idx + 1],
          b: image.bitmap.data[idx + 2]
        };
        count += 1;

        if (thisColor.r >= 250 && thisColor.g >= 250 && thisColor.b >= 250) {
          white += 1;
        } else {
          if (thisColor.r >= 200 || thisColor.g >= 200 || thisColor.b >= 200) {
            lightTone += 1;
          } else {
            darkTone += 1;
          }
        }
      });

      percentWhite = white / count;
      percentDarkTone = darkTone / count;
      percentLightTone = lightTone / count;

      let priceProb = network.run([
        percentWhite,
        percentDarkTone,
        percentLightTone
      ]);

      tempRealPrice = priceProb * 15;   // price with dot
      console.log("Calculate Page - " + i + " - Price: " + tempRealPrice);

      int_part = Math.trunc(tempRealPrice);
      float_part = Number((tempRealPrice - int_part).toFixed(2));
      if (float_part < 0.5) {
        tempRealPrice = int_part;
      } else {
        tempRealPrice = int_part + 1;
      }

      console.log("Price in term INT: " + tempRealPrice)

      realPrice = realPrice + tempRealPrice;
      count = 0;
      white = 0;
      lightTone = 0;
      darkTone = 0;
    }
  } else {
    console.log("black printing");
    realPrice = allPage;
  }

  console.log("PriceWithoutWeight: " + realPrice + " - " + color);
  if (allPage % 2 != 0) {
    allPage += 1;
  }
  if (weight >= 110 && weight <= 130) {
    console.log("+1");
    realPrice = realPrice + (allPage/2); // 1 baht. per sheet
  } else if (weight == 150) {
    console.log("+3");
    realPrice = realPrice + ((allPage/2) * 3); // 3 baht. per sheet
  } else if (weight < 110) {
    console.log("+0");
    realPrice = realPrice;
  }

  console.log("PricePerOne: " + realPrice);
  console.log("Quantity: " + quantity);
  realPrice = realPrice * quantity;

  console.log("totalPrice: " + realPrice);
  console.log("-----------------------------------");
  res.send(realPrice.toString());
});

module.exports = router;

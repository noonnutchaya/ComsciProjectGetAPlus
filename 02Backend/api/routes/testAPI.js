var express = require("express");
var router = express.Router();
const Jimp = require("jimp");
const brain = require("brain.js");
const fs = require('fs');

router.post("/", async function(req, res, next) {
  // req.body
  var size = req.param("size");
  // console.log(size);
  // console.log("\n");
  // console.log(req.body);
});

router.get("/test", async function(req, res, next) {
  const network = new brain.NeuralNetwork();
  let fileName = "./routes/trainingData.JSON";

  // const image = await Jimp.read("./output1.png");
  const image = await Jimp.read("./routes/images/1.png");
  // const image = await Jimp.read("https://firebasestorage.googleapis.com/v0/b/comsciproject-c79ec.appspot.com/o/46.png?alt=media&token=4569148b-473d-47ec-a751-93ccf919b51c");
  let count = 0;
  let white = 0;
  let percentWhite = 0;
  let lightTone = 0;
  let percentLightTone = 0;
  let darkTone = 0;
  let percentDarkTone = 0;

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


  let obj = await JSON.parse(fs.readFileSync(fileName, 'utf8'));
  // console.log(obj);
  network.train(obj);

  let priceProb = network.run([
    percentWhite,
    percentDarkTone,
    percentLightTone
  ]);

  let realPrice = priceProb * 15;
  console.log(count);
  console.log("percentWhite: " + percentWhite + " - percentDarkTone: " + percentDarkTone + " - percentLightTone: " + percentLightTone);
  
  res.send(realPrice.toString());
});

router.post("/", function(req, res, next) {
  console.log(req.body);
  res.send("hi hi api is working naja");
});

router.get("/t", async function(req, res, next) {
  const fs = require('fs');
  // const fsPromises = fs.promises;
  let fileName = "./routes/trainingData.JSON";
  let obj = JSON.parse(fs.readFileSync(fileName, 'utf8'));
  console.log(obj);
  
  
  // let data = await fsPromises.readFile(fileName, 'utf8');
  // let allData = JSON.stringify(data)
  // let formattedData= JSON.parse(allData.replace(/\\"/g, ''));
  // console.log(formattedData);

  const network = new brain.NeuralNetwork();
  network.train(obj);

  let priceProb = network.run([
    1,
    1,
    1
  ]);

  console.log(priceProb * 15);

  

 

});

// (async function () {
//     const image = await Jimp.read("./images/1.png") ;
//     console.log("hihi")

//     const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK) ;
//     image.print(font, 1, 1, 'Hello world!');

//     image.write("./images/1-edit.png");

// } )();

// router.get("/t", function(req, res) {
//   Jimp.read("./routes/images/1.png", function(err, lenna) {
//     lenna
//       .resize(64, 64)
//       .quality(60)
//       .getBuffer(Jimp.MIME_JPEG, function(err, buffer) {
//         res.set("Content-Type", Jimp.MIME_JPEG);
//         res.send(buffer);
//       });
//   });
// });

module.exports = router;

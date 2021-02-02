var express = require("express");
var router = express.Router();
const Jimp = require("jimp");
const brain = require("brain.js");

router.post("/",async function(req, res, next) { 
  // req.body
})

router.get("/", async function(req, res, next) {
  const image = await Jimp.read("./page1.jpg");
  // const image = await Jimp.read("https://firebasestorage.googleapis.com/v0/b/comsciproject-c79ec.appspot.com/o/46.png?alt=media&token=4569148b-473d-47ec-a751-93ccf919b51c");
  let count = 0;    
  let white = 0;                    let percentWhite = 0 ;
  let lightTone = 0;                let percentLightTone = 0 ;
  let darkTone = 0 ;                let percentDarkTone = 0 ;

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

  const network = new brain.NeuralNetwork();

  // 40 DataSet
  network.train([
    {
      input: [0.9347956383, 0.02673584627, 0.03846816179],
      output: [0.066666666666667]
    },
    {
      input: [0.8061185268, 0.05182353189, 0.1420575877],
      output: [0.133333333333333]
    },
    { input: [0.8574074054, 0.1354292308, 0.007163010197], 
      output: [0.2] 
    },
    {
      input: [0.9750629508, 0.01637234216, 0.008564353407],
      output: [0.066666666666667]
    },
    { 
      input: [0.6831047797, 0.0438811726, 0.2730136941], 
      output: [0.2] 
    },
    { 
      input: [0.007458981612, 0.9843599717, 0.008181046676], 
      output: [1] 
    },
    {
      input: [0.9304476662, 0.02547701556, 0.04407531825],
      output: [0.066666666666667]
    },
    {
      input: [0.7487991513437058, 0.16557284299858557, 0.08562800565770863],
      output: [0.2]
    },
    {
      input: [0.05760396039603961, 0.05979561528, 0.0576039604],
      output: [0.066666666666667]
    },
    {
      input: [0.0045, 0.4094126591, 0.5860873409],
      output: [0.666666666666667]
    },
    {
      input: [0, 0.41053677510608205, 0.589463224893918],
      output: [0.666666666666667]
    },
    {
      input: [0.012618458274398869, 0.47419695898161246, 0.5131845827],
      output: [0.666666666666667]
    },
    {
      input: [0.8392644978783592, 0.1574225601, 0.8392644979],
      output: [0.533333333333333]
    },
    {
      input: [0.7147553041, 0.03958274399, 0.2456619519],
      output: [0.266666666666667]
    },
    {
      input: [0, 0.4221651344, 0.5778348656294201],
      output: [0.666666666666667]
    },
    { 
      input: [0.09557496464, 0.9522121641, 0.04778712871], 
      output: [1] 
    },
    {
      input: [0.0008900282885, 0.0008900282885, 0.5416032532],
      output: [0.666666666666667]
    },
    { 
      input: [0.8471028996, 0.1218076379, 0.03108946252], 
      output: [0.2] 
    },
    { 
      input: [0, 0.430553041, 0.569446959], 
      output: [0.666666666666667] 
    },
    {
      input: [0.0045, 0.9588009194, 0.03669908062],
      output: [0.666666666666667]
    },
    { 
      input: [0, 0.7706463932, 0.2293536068], 
      output: [1] 
    },
    { 
      input: [0, 0.7867768741, 0.2132231259], 
      output: [1] 
    },
    { 
      input: [0.0000130834512, 0.9689119519, 0.03107496464], 
      output: [1] 
    },
    { 
      input: [0.002065770863, 0.6590661245, 0.3388681047], 
      output: [0.8] 
    },
    {
      input: [0.001457213579, 0.2753617397, 0.7231810467],
      output: [0.666666666666667]
    },
    { 
      input: [0, 0.9048115275813295, 0.09518847241867044], 
      output: [1] 
    },
    { 
      input: [0, 0.947836280056577, 0.05216371994342291], 
      output: [1] 
    },
    { 
      input: [0, 0.9493359264497878, 0.050664073550212164], 
      output: [1] 
    },
    {
      input: [0.000020509193776520508,0.9654321074964639,0.034547383309759545],
      output: [1]
    },
    {
      input: [0.009788189533239039, 0.2764225601131542, 0.7137892503536067],
      output: [0.533333333333333]
    },
    {
      input: [0.6698224893917963, 0.027606789250353606, 0.30257072135785007],
      output: [0.2]
    },
    {
      input: [0.9377641442715701, 0.04579066478076379, 0.016445190947666194],
      output: [0.133333333333333]
    },
    {
      input: [0.5179667609618105, 0.02908026874115983, 0.4529529702970297],
      output: [0.333333333333333]
    },
    {
      input: [0.49480763790664783, 0.22976838755304102, 0.2754239745403112],
      output: [0.333333333333333]
    },
    {
      input: [0.03236067892503536, 0.9596700848656294, 0.007969236209335219],
      output: [1]
    },
    {
      input: [0.861680693069307, 0.07296287128712871, 0.06535643564356436],
      output: [0.133333333333333]
    },
    {
      input: [0.9531096181046677, 0.040043493635077795, 0.006846888260254597],
      output: [0.066666666666667]
    },
    {
      input: [0.8082358557284299, 0.16961916548797737, 0.022144978783592645],
      output: [0.2]
    },
    {
      input: [0.8074041725601132, 0.04324823196605375, 0.1493475954738331],
      output: [0.2]
    },
    {
      input: [0.9478005657708628, 0.02429950495049505, 0.02789992927864215],
      output: [0.133333333333333]
    }
  ]);

  let priceProb = network.run([
    percentWhite,
    percentDarkTone,
    percentLightTone
  ]);

  let realPrice = priceProb * 15;
  console.log(count);
  res.send(realPrice.toString());
  
});
router.post("/",function(req,res,next) {
    console.log(req.body)
    res.send("hi hi api is working naja");
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

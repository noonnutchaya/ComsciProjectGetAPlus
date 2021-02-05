var express = require("express");
var router = express.Router();
var https = require("https");
var fs = require("fs");
var pdf2img = require("pdf-img-convert");
const path = require('path');
const pdf = require('pdf-poppler');


router.get("/api/coin", async function(req, res) {
  const API_KEY = "fofangfang25@gmail.com_5081d28a3c609d7e";

  // Source PDF file
  const SourceFileUrl =
    "https://firebasestorage.googleapis.com/v0/b/comsciproject-c79ec.appspot.com/o/images%2Fassignment_3_solution.pdf?alt=media&token=9e5a8168-e5fd-4a48-b530-2f6246269708";
  // Comma-separated list of page indices (or ranges) to process. Leave empty for all pages. Example: '0,2-5,7-'.
  const Pages = "";
  // PDF document password. Leave empty for unprotected documents.
  const Password = "";

  // Prepare request to `PDF To JPEG` API endpoint
  var queryPath = `/v1/pdf/convert/to/jpg`;

  // JSON payload for api request
  var jsonPayload = JSON.stringify({
    password: Password,
    pages: Pages,
    url: SourceFileUrl
  });

  var reqOptions = {
    host: "api.pdf.co",
    method: "POST",
    path: queryPath,
    headers: {
      "x-api-key": API_KEY,
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(jsonPayload, "utf8")
    }
  };
  // Send request
  var postRequest = https
    .request(reqOptions, response => {
      response.on("data", d => {
        // Parse JSON response
        var data = JSON.parse(d);
        if (data.error == false) {
          // Download generated JPEG files
          var page = 1;
          data.urls.forEach(url => {
            var localFileName = `./page${page}.jpg`;
            var file = fs.createWriteStream(localFileName);
            https.get(url, response2 => {
              response2.pipe(file).on("close", () => {
                console.log(
                  `Generated JPEG file saved as "${localFileName}" file.`
                );
              });
            });
            page++;
          }, this);
        } else {
          // Service reported error
          console.log(data.message);
        }
      });
    })
    .on("error", e => {
      // Request error
      console.error(e);
    });

  // Write request data
  postRequest.write(jsonPayload);
  postRequest.end();
});

router.get("/lib", async function(req, res, next) {
  let pdfArray = await pdf2img.convert(
"https://firebasestorage.googleapis.com/v0/b/comsciproject-c79ec.appspot.com/o/%E0%B9%80%E0%B8%9A%E0%B8%AD%E0%B8%A3%E0%B9%8C%E0%B8%AA%E0%B8%B3%E0%B8%84%E0%B8%B1%E0%B8%8D.pdf?alt=media&token=557b0461-a364-4dc0-89a9-7d0ee31c7c63"  
);

  console.log("saving");
  for (i = 0; i < pdfArray.length; i++){
    fs.writeFile("output"+i+".png", pdfArray[i], function (error) {
      if (error) { console.error("Error: " + error); }
    }); //writeFile
  } // for
});


  



module.exports = router;

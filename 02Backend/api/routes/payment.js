const generatePayload = require('promptpay-qr') 
const qrcode = require('qrcode') 
const fs = require('fs') 

const mobileNumber = '000-000-0000' 
const IDCardNumber = '0-0000-00000-00-0'
const amount = 0
const payload = generatePayload(mobileNumber, { amount }) //First parameter : mobileNumber || IDCardNumber
console.log(payload)

// Convert to SVG QR Code
const options = { type: 'png', color: { dark: '#000', light: '#fff' } }
qrcode.toString(payload, options, (err, png) => {
    if (err) return console.log(err)
    fs.writeFileSync('./qr.png', png)
    console.log(png)
})
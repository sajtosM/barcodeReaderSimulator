const robotjs = require('robotjs');
const express = require('express');

const { networkInterfaces } = require('os');

const nets = networkInterfaces();
let results = []; // Or just '{}', an empty object

for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
        // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
        if (net.family === 'IPv4' && !net.internal) {
            if (!results[name]) {
                results[name] = [];
            }
            results.push(net.address);
        }
    }
}

const app = express()
const port = 8090;




app.use(express.static('web'))

app.post('/', (req, res) => {
    try {
        console.log('typeing ' + req.query.sString);
        robotjs.typeString(req.query.sString);
        setTimeout(() => {
            robotjs.keyTap("enter");
        }, 200);
        res.send('OK');

    } catch (error) {
        res.send('NOK');

    }
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
    results.forEach(ip => {
        console.log(`Example app listening at http://${ip}:${port}`)
    });
})
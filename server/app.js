const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
app.use(express.json())


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next()
});

app.get('/api', (req, res) => {
    fs.readFile('../files/bla.txt', 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.send(data)
        }
    })
});

app.get('/api/files', (req, res) => {
    fs.readdir('../files', (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            getStats(data)
                .then((dataArr) => {
                    res.send(dataArr);
                });
        }
    });
});


async function getStats(data) {
    let dataArr = [];
    for (let i = 0; i < data.length; i++) {
        let stat = await fs.promises.stat(`../files/${data[i]}`);
        dataArr.push({ name: data[i], isFile: stat.isFile() });
    }
    return dataArr;
}

app.listen(8000);

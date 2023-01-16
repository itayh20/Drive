// const express = require('express');
// const app = express();
// const fs = require('fs');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const path = require('path');
// const users = require('./usersData.json');
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json())



// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next()
// });

// // app.get('/api', (req, res) => {
// //     fs.readFile('../files/bla.txt', 'utf-8', (err, data) => {
// //         if (err) {
// //             console.log(err);
// //         } else {
// //             res.send(data)
// //         }
// //     })
// // });

// // Add user and make him a dir
// app.post('/api/users', (req, res) => {
//     const body = JSON.stringify(req.body);
//     const newUser = JSON.parse(body);
//     newUser.id = users.length + 1;
//     newUser.path = `../${newUser.id}`;
//     users.push(newUser);
//     fs.writeFile('./usersData.json', JSON.stringify(users), (err) => {
//         if (err) {
//             console.log(err);
//         }
//     });
//     const id = newUser.id;
//     fs.mkdir(`../${id}`, (err) => {
//         if (err) {
//             console.log(err);
//         }
//     });
//     res.send();
// });

// // Get the users files
// app.get('/api/:username/files', (req, res) => {
//     let username = req.params.username;
//     for (let i = 0; i < users.length; i++) {
//         if (users[i].username === username) {
//             var id = users[i].id;
//         }
//     }
//     fs.readdir(`../${id}`, (err, data) => {
//         if (err) {
//             res.status(500).send(err);
//         } else {
//             getStats(data, id)
//                 .then((dataArr) => {
//                     res.send(dataArr);
//                 });
//         }
//     });
// });

// //Get stats(DATA) of a file
// async function getStats(data, id, path) {
//     if (path === undefined) {
//         console.log('man');
//         var dataArr = [];
//         for (let i = 0; i < data.length; i++) {
//             let stat = await fs.promises.stat(`../${id}/${data[i]}`);
//             dataArr.push({ name: data[i], isFile: stat.isFile() });
//         }
//     } else {
//         var dataArr = [];
//         for (let i = 0; i < data.length; i++) {
//             console.log();
//             let stat = await fs.promises.stat(`../${id}/${path}/${data[i]}`);
//             dataArr.push({ name: data[i], isFile: stat.isFile() });
//         }
//     }
//     return dataArr;
// }

// // Check if user can log in
// app.post('/login', (req, res) => {
//     const user = users.find(
//         u => u.username === req.body.username && u.password === req.body.password
//     );
//     res.send(user);
// });

// // Create new folder
// app.post('/api/:username/files/:folderName', (req, res) => {
//     const folder = req.params.folderName;
//     for (let i = 0; i < users.length; i++) {
//         if (users[i].username === req.body.username && users[i].password === req.body.password) {
//             var id = users[i].id;
//         }
//     }
//     fs.mkdir(`../${id}/${folder}`, (err) => {
//         if (err) {
//             console.log(err);
//         }
//     });
// });


// app.get('/api/:username/:dirName/get', (req, res) => {
//     let username = req.params.username;
//     let dirName = req.params.dirName;
//     for (let i = 0; i < users.length; i++) {
//         if (users[i].username === username) {
//             var id = users[i].id;
//         }
//     }
//     console.log(id);
//     console.log(dirName);
//     fs.readdir(`../${id}/${dirName}`, (err, data) => {
//         if (err) {
//             res.status(500).send(err);
//         } else {
//             console.log(dirName);
//             getStats(data, id, dirName)
//                 .then((dataArr) => {
//                     res.send(dataArr);
//                 });
//         }
//     });
// });


// app.listen(8000);
const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const users = require('./usersData.json');
app.use(express.urlencoded({ extended: true }));
app.use(express.json())



app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next()
});

// app.get('/api', (req, res) => {
//     fs.readFile('../files/bla.txt', 'utf-8', (err, data) => {
//         if (err) {
//             console.log(err);
//         } else {
//             res.send(data)
//         }
//     })
// });

// Add user and make him a dir
app.post('/api/users', (req, res) => {
    const body = JSON.stringify(req.body);
    const newUser = JSON.parse(body);
    newUser.id = users.length + 1;
    newUser.path = `../${newUser.username}`;
    users.push(newUser);
    fs.writeFile('./usersData.json', JSON.stringify(users), (err) => {
        if (err) {
            console.log(err);
        }
    });
    fs.mkdir(`../${newUser.username}`, (err) => {
        if (err) {
            console.log(err);
        }
    });
    res.send();
});

// Get the users files
app.get('/api/:username/files', (req, res) => {
    let username = req.params.username;
    fs.readdir(`../${username}`, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            getStats(data, username)
                .then((dataArr) => {
                    res.send(dataArr);
                });
        }
    });
});

//Get stats(DATA) of a file
async function getStats(data, username, path) {
    if (path === undefined) {
        var dataArr = [];
        for (let i = 0; i < data.length; i++) {
            let stat = await fs.promises.stat(`../${username}/${data[i]}`);
            dataArr.push({ name: data[i], isFile: stat.isFile() });
        }
    } else {
        var dataArr = [];
        for (let i = 0; i < data.length; i++) {
            let stat = await fs.promises.stat(`../${username}/${path}/${data[i]}`);
            dataArr.push({ name: data[i], isFile: stat.isFile() });
        }
    }
    return dataArr;
}

// Check if user can log in
app.post('/login', (req, res) => {
    const user = users.find(
        u => u.username === req.body.username && u.password === req.body.password
    );
    res.send(user);
});

// Create new folder
app.post('/api/:username/files/:folderName', (req, res) => {
    const folder = req.params.folderName;
    var username = req.body.username
    fs.mkdir(`../${username}/${folder}`, (err) => {
        if (err) {
            console.log(err);
        }
        res.send("hi");
    });
});


app.get('/api/:username/:dirName/get', (req, res) => {
    let username = req.params.username;
    let dirName = req.params.dirName;
    fs.readdir(`../${username}/${dirName}`, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            getStats(data, username, dirName)
                .then((dataArr) => {
                    res.send(dataArr);
                });
        }
    });
});


app.listen(8000);

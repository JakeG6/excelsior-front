//server.js
const express = require('express');
const favicon = require('express-favicon');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Mongoose stuff
mongoose.connect('mongodb+srv://excelsiorAdmin:Supermodel200!@excelsiorcluster-zakfd.mongodb.net/test?retryWrites=true', { useUnifiedTopology: true, useNewUrlParser: true, dbName: 'excelsiorDB'});
const dbConnection = mongoose.connection;

dbConnection.on('error', console.error.bind(console, 'connection error:'));
dbConnection.once('open', function() {
    console.log('connected to the database');

    let charSchema = new mongoose.Schema({
        imageURL: String,
        company: String,
        name: String,
        civName: String,
        alignment: String,
        firstDebut: String,
        abilities: [String],
        teams: [String],
        desc: String
    });

    let Char = mongoose.model('Char', charSchema, "excelsiorCollection");

    //cors middleware
    app.use(cors())

    //bodyparser middleware
    app.use(bodyParser.json()); // support json encoded bodies
    app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

    
    // the __dirname is the current directory from where the script is running
    app.use(favicon(__dirname + '/client/build/favicon.ico'));
    app.use(express.static(__dirname));
    app.use(express.static(path.join(__dirname, 'build')));

    //ping pong
    app.get('/ping', function (req, res) {
      return res.send('pong');
     });

    

    //Api root
    app.get('/api', (req, res, next) => res.send('Welcome to the API!'));

    //get all characters
    app.get('/api/chars/all', (req, res, next) => {
        console.log('getting all characters');
        Char.find(function (err, chars) {
            if (err) {
                res.status(404).send(err);
                console.log('there was an error');
              };
              console.log(chars);
              res.send(chars);
        });
    });

    //get heroes or villains
    app.get('/api/chars/alignment/:alignment', (req, res, next) => {

        if (req.params.alignment.toUpperCase() === "HERO") {
            Char.find({alignment: "Hero"}, function (err, chars) {
                if (err) {
                    res.status(404).send(err);
                };
                console.log('getting all the heroes.')
                res.send(chars);
            });
        }
        else if (req.params.alignment.toUpperCase() === "VILLAIN") {
            Char.find({alignment: "Villain"}, function (err, chars) {
                if (err) {
                    res.status(404).send(err);
                };
                console.log('getting all the villains.')
                res.send(chars);
            });
        }
        else if (req.params.alignment.toUpperCase() === "ANTIHERO") {
            Char.find({alignment: "Antihero"}, function (err, chars) {
                if (err) {
                    res.status(404).send(err);
                };
                console.log('getting all the Antiheroes.')
                res.send(chars);
            });
        }
        else {
            res.status(404).send();
        }
        
    });

    //get character by name
    app.get('/api/chars/name/:name', (req, res, next) => {

        Char.find({name: req.params.name}, function (err, chars) {
            if (err) {
                res.status(404).send(err);
            };
            console.log('getting the character by name.')
            res.send(chars);
        });
    });

    //get characters by team
    app.get('/api/chars/teamsearch', (req, res, next) => {

        let teamString = JSON.parse(req.query.teams).toString();

        Char.find({teams: teamString}, function (err, chars) {
            if (err) {
                res.status(404).send(err);
            };
            res.send(chars);
        });
    });


    //search characters with full query params
    app.get('/api/chars/search', (req, res, next) => {
        
        let paramsObject = {};

        if (req.query.company) {
            paramsObject.company = { "$regex": req.query.company, "$options": "i" };
        }
        if (req.query.name) {
            paramsObject.name = { "$regex": req.query.name, "$options": "i" };
        }
        if (req.query.alignment) {
            paramsObject.alignment = { "$regex": req.query.alignment, "$options": "i" }
        }
        if (req.query.firstdebut) { 
            paramsObject.firstDebut = { "$regex": req.query.firstdebut, "$options": "i" };
        }
        if (req.query.teams) {
            paramsObject.teams = { "$regex": JSON.parse(req.query.teams).toString(), "$options": "i" };
        }
        if (req.query.abilities) {
            paramsObject.abilities = { "$regex": JSON.parse(req.query.abilities).toString(), "$options": "i" };
        }

        Char.find(paramsObject, function (err, chars) {

            console.log(req.query);
            if (err) {
                res.status(404).send(err);
            };
            console.log('getting the characters by search results.');
            res.send(chars);
        });
    });

    
    app.post('/api/chars/create', (req, res) => {
        
        Char.create({
            imageURL: (req.body.imageURL ? req.body.imageURL : ""), 
            company: (req.body.company ? req.body.company : "") , 
            name: (req.body.name ? req.body.name : ""),
            civName: (req.body.civName ? req.body.civName : ""),
            alignment: (req.body.alignment ? req.body.alignment : ""),
            firstDebut: (req.body.firstDebut ? req.body.firstDebut : ""),
            abilities: (req.body.abilities ? req.body.abilities : []),
            teams: (req.body.teams ? req.body.teams : []),
            desc: (req.body.desc ? req.body.desc : "")}, function (err, char) {
                if (err) {
                    res.status(500).send(err) 
                };
                console.log('trying to make new character document.');
                res.send(char);
            });
        
    });

    const requestPassByUserName = (userName) => {
        // CALL THE DB AND REQUEST THE PASSWORD ASOCIATED WITH THIS USERNAME
        return new Promise((resolve, reject) => {
            resolve( "safePassword")
        })
    }

    app.get('/api/login', (req, res) => {

        // res.send('Helo')
        console.log("Body: ", req.body)

        let { username, password } = req.body

            console.log("DV: ", username, password)
            // res.send({  status: 'success' })

            requestPassByUserName(username)
            .then((resp) => {
                if(resp === password ){
                    res.send({  status: 'success' })
                }else{
                    res.send({  status: 'fail' })
                }
            }).catch((err) => {
                console.log("Error while login: ", err)
                res.send({  status: 'fail' })
            })

        
    });

    //index.html 
    app.get('/*', function (req, res) {
        //console.log(res);
      res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });

});

app.listen(port, () => console.log(`This API is listening on port ${port}!`));









//Deliver the 

// app.use(favicon(__dirname + '/build/favicon.ico'));
// // the __dirname is the current directory from where the script is running
// app.use(express.static(__dirname));
// app.use(express.static(path.join(__dirname, 'build')));
// app.get('/ping', function (req, res) {
//  return res.send('pong');
// });
// app.get('/*', function (req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });



//app.listen(port);
const express = require('express');
const app = express();
app.use(express.json());
let PlayerForm = require('./models/playerform.model');//importing schema
const mongoose = require('mongoose'); //importing mongoose

mongoose.connect('mongodb+srv://usafa15:ssaammmmyy74@cluster0.2s1bz.mongodb.net/<dbname>?retryWrites=true&w=majority', {useNewUrlParser: true}) // connect app to Database
const connection = mongoose.connection; // Define the connection
connection.once('open', function(){ //Login Connection
    console.log("MongoDB database connection established");
})

app.get('/', function(req, res){
    console.log("In root directory");
    res.send({message: "Server Up"})
})

app.listen('3000', function(req,res){
    console.log('Listening on Port 3000!');
})

//entering data & storing as a variable b/c we don't have Front-end to submit data to DB.

app.get('/form', (req, res) => {
    let playerExample = {
        name: 'JKlapp',
        wins: 8,
        losses: 2
    }
    let newPlayer = new PlayerForm(playerExample);
    newPlayer.save()
        .then(PlayerForm => {
            console.log("new player added to DB!", PlayerForm)
            res.send(PlayerForm);
        })
        .catch(err => {
            console.log("Error", err);
        })
})

// using .find() to find all players stored in the DB

app.get('/getPlayers', (req, res) => {
    PlayerForm.find({})
    .then(playerList => { //this is name of function (can name whatever)
        res.send(playerList) 
    })
    .catch(err => log  ('Error', err));
})

// using .find() to find all players with 8 wins

app.get('/eightWins', (req, res) => {
    PlayerForm.find({wins: 8})
        .then(eightWinPlayers => { //this is name of function (can name whatever)
            res.send(eightWinPlayers)
        })
        .catch(err => console.log("Error", err))
})

// using .findByIdAndRemove to remove one player by their DB assigned unique ID

app.get('/deletePlayer', (req, res) => {
    PlayerForm.findByIdAndDelete('6010f61c3a34890488f70404', (err, todo) => {
        res.send({message: "Deleted"})
    })
})

// using .findByIdAndUpdate to update one player by their DB assigned unique ID

app.get('/updatePlayer', (req, res) => {
    let updatedPlayer = {
        name: 'Mitch',
        wins: 5,
        losses: 5
    }
    PlayerForm.findByIdAndUpdate('6010f605db14e21f9045e8e8', updatedPlayer, {new: true}, (err, guy) => {
        console.log("Updated Player!!", guy)
        res.send(guy)
    })
})
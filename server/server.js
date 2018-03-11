//Import Libraries
var express = require('express');
var bodyParser = require('body-parser');

const {MongoClient} = require('mongodb')
//Import local stuff
//REquire the mongoose config file
var{mongoose}=require('./database/mongoose.js');
//Load in the models from mongoose
var {Favorite} = require('./models/mainUserFavorites');
var {RecommendUser}= require('./models/user');

var app = express();

//Middlewear
app.use(bodyParser.json());
//Middlewear to load static files for rendering such as home.html
app.use(express.static(__dirname+'/htmlFiles'));

const port = process.env.PORT || 3000;

//Render the home page
app.get('/', (req, res) => {
  res.sendFile(__dirname+'/htmlFiles/HomePage1.html');
});

//Send the data to server (doesn't do anything with it yet)
app.post('/RecommendUsers', (req, res)=>{
  console.log('posting to recommendUsers');
  var u = new RecommendUser({
    username: req.body.username,    //Uses the req.body object, looks for a property called username, and passes it
    favoriteMovie1:req.body.favoriteMovie1,
    favoriteMovie2:req.body.favoriteMovie2,
    favoriteMovie3:req.body.favoriteMovie3
  });                               //Note: The actual req.body.text value is defined by something that is trying to post data to this server

  //save the data to mongodb by using the .save()
  u.save().then((doc)=>{
    res.send(doc);                  //If all goes well
  }, (e)=>{
    res.status(400).send(e);        //If there was an error, also send back a status of 400.
  });
});


app.get('/RecommendUsers', (req, res) => {
  RecommendUser.find().then((RecommendUser)=>{
    res.send({RecommendUser});
  }, (e)=>{
    res.status(400).send(e);
  });
});


app.post('/Favorites', (req,res)=>{
  console.log('posting to favorites');
  var m = new Favorite({
    name: req.body.name
  });

  m.save().then((doc)=>{
    res.send(doc);                  //If all goes well
  }, (e)=>{
    res.status(400).send(e);        //If there was an error, also send back a status of 400.
  });

});

//Get request
app.get('/favorites', (req, res) => {
  Favorite.find().then((Favorite)=>{
    res.send({Favorite});
  }, (e)=>{
    res.status(400).send(e);
  });
});

app.listen(port, ()=> {
  console.log(`Started on port ${port}`);
});

module.exports = {app};

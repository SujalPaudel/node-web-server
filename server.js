const express = require('express');
const hbs = require('hbs');
const fs = require('fs');


var app = express();

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('currentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.set('view engine', 'hbs');


app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err){
      console.log("Unable to append to server.log")
    }
  });

  next();

  // res.render('maintainence.hbs', {
  // pageTitle : 'Maintainence',
  // maintainMessage : 'Sorry for the inconvinience, the page is under construction'
  // });
  
});

app.use((req, res) => {
  res.render('maintainence.hbs');
});

app.use(express.static(__dirname + '/public'));


app.get('/', (req, res) => {
  res.render('root.hbs', {  
    pageTitle : 'Home Page',
    welcomeMessage : 'Hello and welcome to the xyz, the challenge to the alphabet'


  }); //this is the response to the http request
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle : 'About Page',

  });
});

app.get('/bad', (req, res) => {
  res.send({
    error : "The error has occured",
    cause : "Check the cause yourself"
  });
});

app.listen(3000, () => {
  console.log("Server is up on the port 3000");
});
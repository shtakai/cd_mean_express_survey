var port,
  survey=null;
port = 8000;
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var _ = require('underscore');

var app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, './static')));
app.use('/scripts', express.static(path.join(__dirname, './node_modules')));

app.get('/', function(req, res){
  survey = null;
  res.render('index');
});

app.post('/survey', function(req, res){

  // NOTE: without validation
  survey = req.body
  res.redirect('/result');
});

app.get('/result', function(req, res){
  survey = survey || {};
  res.render('result', { survey: survey });
});


var server = app.listen(port, function(){
});

var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket){
  socket.on('posting_form', function(data){
    var survey = JSON.parse(data.survey);
    var message = {};
    for(var k in survey){
        message[survey[k].name] = survey[k].value;
    }

    socket.emit('message', {message: message, random_number: Math.floor(Math.random()*999 + 1)});
  });
});


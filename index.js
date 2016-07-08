var port,
  survey=null;
port = 8000;
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, './static')));

app.get('/', function(req, res){
  survey = null;
  console.log('index');
  res.render('index');
});

app.post('/survey', function(req, res){

  // NOTE: without validation
  console.log('survey');
  console.log(`Post Data\n\n${JSON.stringify(req.body)}`);
  survey = req.body
  res.redirect('/result');
});

app.get('/result', function(req, res){
  console.log('result');
  survey = survey || {};
  console.log(`survey:${JSON.stringify(survey)}`);
  res.render('result', { survey: survey });
});


app.listen(port, function(){
  console.log(`server started #${port}`);
});


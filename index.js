var port;
port = 8000;
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();

app.use(express.static(`${__dirname}/static`));
app.use(bodyParser.urlencoded({extended: false}));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, './static')));



app.listen(port, function(){
  console.log(`server started #${port}`);
});

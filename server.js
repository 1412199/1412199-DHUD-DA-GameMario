var express = require('express');
var path = require('path');
var app = express();

app.listen(3000);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static(__dirname));

app.get('/', function(req, res){
    res.render('SuperMario');
})
var express= require('express');
var swig= require('swig');
var path=require('path');
var bodyParser = require('body-parser');
var io= require('socket.io');
var routes= require('./routes/index.js');
var app= express();
var socket=require('./routes/sockethandler.js');
var port = process.env.PORT || 8080;

//app.set('port', (process.env.PORT || 8000));

// view engine setup
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'templates'));
app.use(express.static(path.join(__dirname, 'static')));
app.use('/lib',  express.static(__dirname + '/lib'));
app.use('/img', express.static(__dirname+'/lib'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/',routes);

var io= require("socket.io").listen(app.listen(port,function(err){
    console.log("game server listening on " + port);
}));

socket.socketRouter(io);

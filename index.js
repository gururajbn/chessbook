var express= require('express');
var swig= require('swig');
var path=require('path');
var io= require('socket.io');
var routes= require('./routes/index.js');
var app= express();
var port= process.env.PORT | 8000;

// view engine setup
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'templates'));
app.use(express.static(path.join(__dirname, 'static')));
app.use('/lib',  express.static(__dirname + '/bower_components'));
app.use('/img', express.static(__dirname+'/bower_components/chessboardjs/img'));

app.use('/',routes);

app.listen(port,function(err){
    console.log("listing on "+port);
})

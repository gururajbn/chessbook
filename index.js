var express= require('express');
var swig= require('swig');
var io= require('socket.io');

var app= express();
var port= process.env.PORT | 8000;

app.use('/','./routes/index.js');

app.listen(port,function(err){
    console.log("listing on "+port);
})

var expressio= require('express.io');
var app= expressio();
var port= process.env.PORT | 8000;



app.listen(port,function(err){
    console.log("listing on "+port);
})

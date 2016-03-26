var express= require('express');
var shortId= require('shortid');
var gameId= shortId.generate();

router= express.Router();

router.get('/',function(req,res){
        res.render('home',{'title':'welcome to chessbook'});
});

router.get('/white',function(req,res){
    res.render('play',{
        orientation:'white',
        gameId:gameId
    });
});

router.get('/black',function(req,res){
    res.render('play',{
        orientation:'black',
        gameId:gameId
    });
});

module.exports= router;

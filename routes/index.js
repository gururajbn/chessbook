var express= require('express');
var shortId= require('shortid');
router= express.Router();

router.get('/',function(req,res){
        res.render('home',{'title':'welcome to chessbook'});
});

router.get('/newgame',function(req,res){
    var gameId= shortId.generate();
    res.render('play',{
        orientation:'white',
        gameId:gameId,
        newgame:true
    });
});

router.get('/joingame/:gameId',function(req,res){
    var gameId= req.params.gameId;
    res.render('play',{
        orientation:'black',
        gameId:gameId,
        newgame:false
    });
});

module.exports= router;

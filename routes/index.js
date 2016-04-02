var express= require('express');
var shortId= require('shortid');
router= express.Router();

// entry points
router.get('/',function(req,res){
    //home
});

router.post('/creategame',function(req,res){
    //create a new game
});

router.post('/createtournament',function(req,res){
    //create a tournament
});

router.get('/white/:gameId',function(req,res){
    //connect to game as white
});

router.get('/black/:gameId',function(req,res){
    //connect to game as black
});

router.get('/:userId',function(req,res){
    //get usr profile
});

module.exports= router;

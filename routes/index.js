var express= require('express');
router= express.Router();

router.get('/',function(req,res){
        res.render('home',{'title':'welcome to chessbook'});
});

router.get('/play',function(req,res){
    res.render('play')
})

module.exports= router;

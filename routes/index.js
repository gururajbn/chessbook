var express= require('express');
router= express.Router();

router.get('/',function(req,res){
        res.render('home',{'title':'welcome to chessbook'});
})

module.exports= router;

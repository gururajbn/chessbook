var mongoose= require('mongoose');
var url="";
mongoose.connect(url);
var Schema = mongoose.Schema;

var user= new Schema({
    _id: String,
    firstname: String,
    lastname: String,
    email: String,
    history:[{type:String, ref:'game'}],
    upcoming:[{type:String, ref:'game'}],
    level: String
});

var move=new Schema({
    gameId: String,
    source: String,
    piece: String,
    targe: String,
    fen: String,
    timestamp:{type: Number, default: Math.floor(new Date())}
});

var game = new Schema({
    _id: String,
    white: { type: String, ref: 'user' },
    black: { type: String, ref: 'user' },
    position: String,
    over: {type:Boolean, default:false},
    moves:[{type:String, ref:'move'}],
    winner:{type:String, default:'pending'},
    start: Date,
    end: Date,
    tournament:{ type: String, ref: 'tournament' }
});

var tournament= new Schema({
    _id: String,
    organizer: { type: String, ref: 'user' },
    games:[{ type: String, ref: 'game' }]
    winner: { type: String, ref: 'user', default:'pending' }
    start: Date,
    end: Date
});

module.exports={
    'user':mongoose.model('user',user),
    'game':mongoose.model('game',game),
    'move':mongoose.model('move',move),
    'tournament':mongoose.model('tournament',tournament)
};

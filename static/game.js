$(document).ready(init);

var socket = io();
var init = function() {
//--- start example JS ---
var turn;
$("#myturn").hide();
$("#histurn").hide();
$('#gameId').hide();
$('#orientation').hide();

var orientation= $("#orientation").val();
var gameId= $("#gameId").val();

if(orientation == 'white')
    turn='w';
else
    turn='b';

// console.log(orientation,gameId);

var board,
  game = new Chess(),
  statusEl = $('#status'),
  fenEl = $('#fen'),
  pgnEl = $('#pgn');

// do not pick up pieces if the game is over
// only pick up pieces for the side to move
var onDragStart = function(source, piece, position, orientation) {

    if(turn == 'w'){
        if (game.in_checkmate() === true || game.in_draw() === true ||
            piece.search(/^b/) !== -1) {
                        return false;
         }
    }else{
        if (game.in_checkmate() === true || game.in_draw() === true ||
            piece.search(/^w/) !== -1) {
                    return false;
         }
    }
};

var onDrop = function(source, target, piece) {
  // see if the move is legal
  var move = game.move({
    from: source,
    to: target,
    promotion: 'q' // NOTE: always promote to a queen for example simplicity
  });

  var data={
      source:source,
      target:target,
      piece:piece
  };

  // illegal move
  if (move === null) return 'snapback';
  updateGame(data);
  updateStatus();
};

// update the board position after the piece snap
// for castling, en passant, pawn promotion
var onSnapEnd = function() {
  board.position(game.fen());
};

var updateStatus = function() {
  var status = '';

  var moveColor = 'White';

  if(game.turn() == turn){
    $("#myturn").show();
    $("#histurn").hide();
  }else{
    $("#histurn").show();
    $("#myturn").hide();
  }

  if (game.turn() === 'b') {
    moveColor = 'Black';
  }

  // checkmate?
  if (game.in_checkmate() === true) {
    status = 'Game over, ' + moveColor + ' is in checkmate.';
  }

  // draw?
  else if (game.in_draw() === true) {
    status = 'Game over, drawn position';
  }

  // game still on
  else {
    status = moveColor + ' to move';

    // check?
    if (game.in_check() === true) {
      status += ', ' + moveColor + ' is in check';
    }
  }
  statusEl.html(status);
  fenEl.html(game.fen());
  pgnEl.html(game.pgn());
};

function pieceTheme(piece) {
  // wikipedia theme for white pieces
  var piece_theme_url='/lib/wikipedia/';
  return  piece_theme_url+ piece + '.png';
}

var updateGame= function(option){
    var data={
        gameId:gameId,
        fen:game.fen(),
        piece: option.piece,
        source:option.source,
        target:option.target
    };
    socket.emit('changeInPosition',data);
}

var cfg = {
  orientation:orientation,
  draggable: true,
  pieceTheme: pieceTheme,
  position: 'start',
  onDragStart: onDragStart,
  onDrop: onDrop,
  onSnapEnd: onSnapEnd
};
board = ChessBoard('board', cfg);
updateStatus();
//socket handlers

socket.emit('join',{ gameId:gameId});

socket.on('updatePostition',function(data){
    board.position(data.fen);
    game.load(data.fen);
    updateStatus();
});
}; // end init()

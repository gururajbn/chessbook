var init = function() {
//--- start example JS ---
var orientation= $("#orientation").val();
var gameId= $("#gameId").val();
var turn;

if(orientation == 'white')
    turn='w';
else
    turn='b';

console.log(orientation,gameId);
var socket = io();

var onChange = function(oldPos, newPos) {
  var data={
      oldPos:oldPos,
      newPos:newPos,
      gameId:gameId,
      orientation:orientation
  }
  socket.emit('changeInPosition',data);
  console.log("Old position: " + ChessBoard.objToFen(oldPos));
  console.log("New position: " + ChessBoard.objToFen(newPos));

};

var cfg = {
  orientation:orientation,
  draggable: true,
  position: 'start',
  onChange:onChange
};
var board = ChessBoard('board', cfg);

//socket handlers

    socket.emit('join',{ gameId:gameId});

    socket.on('updatePostition',function(data){
        board.position(data.newPos);
    });
}; // end init()

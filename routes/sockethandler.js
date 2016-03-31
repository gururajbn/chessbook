
function socketRouter(io){
    io.sockets.on('connection',function(socket){

        socket.on('join',function(data){
            console.log(socket.id+' connected',data);
        });

        socket.on('changeInPosition',function(data){
            //console.log("updatePostition from "+socket.id+"\n "+data);
            socket.broadcast.to(data.gameId).emit('updatePostition',data);
        });

        socket.on('sendMessage',function(data){
            socket.broadcast.to(data.gameId).emit('receiveMessage',data);
        });

        socket.on("disconnect",function(){
            console.log(socket.id+" disconnected");
        });
    })
}

exports.socketRouter= socketRouter;

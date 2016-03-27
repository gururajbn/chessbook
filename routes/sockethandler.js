
function socketRouter(io){
    io.sockets.on('connection',function(socket){
        console.log(socket.id+' connected');

        socket.on('join',function(data){
            socket.join(data.gameId);
            console.log(socket.rooms);
        });

        socket.on('changeInPosition',function(data){
            //console.log("updatePostition from "+socket.id+"\n "+data);
            socket.broadcast.to(data.gameId).emit('updatePostition',data);
        })
    })
}

exports.socketRouter= socketRouter;

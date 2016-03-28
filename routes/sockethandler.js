
function socketRouter(io){
    io.sockets.on('connection',function(socket){

        socket.on('join',function(data){
            console.log(socket.id+' connected',data);
            socket.join(data.gameId);
            var data={
                type:"info",
                message:"other player joined the game",
                code: 200 //ok
            }
            console.log(data);
            socket.broadcast.to(data.gameId).emit('notification',data);
        });

        socket.on('changeInPosition',function(data){
            //console.log("updatePostition from "+socket.id+"\n "+data);
            socket.broadcast.to(data.gameId).emit('updatePostition',data);
        });

        socket.on('sendMessage',function(data){
            socket.broadcast.to(data.gameId).emit('receiveMessage',data)
        });

        socket.on("disconnect",function(){
            console.log(socket.id+" disconnected");
            var data={
                type:"info",
                message:"other player has left the game",
                code: 410   //gone
            }
            socket.broadcast.to(data.gameId).emit('notification',data);
        });
    })
}

exports.socketRouter= socketRouter;

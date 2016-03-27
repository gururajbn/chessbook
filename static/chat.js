
var sendMessage= function(){
    var message= $(".inputMessage").val();
    socket.emit('sendmessage',{
        message:message,
        gameId:gameId
    })
}

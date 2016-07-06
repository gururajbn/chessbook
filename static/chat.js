$(document).ready(function(){
    // console.log("here");
    var player= $("#orientation").val();
    var gameId= $("#gameId").val();


    $('#inputSmall').keypress(function (e) {
     var key = e.which;
     if(key == 13)  // the enter key code
      {
        var message=$(this).val();
        sendMessage(message);
        $(this).val('');
        $(".messages").append('<blockquote class="blockquote-reverse"> \
                              <p>'+message+'</p> \
                              <small><cite title="Source Title">'+player+'</cite></small> \
                              </blockquote>');
        $(".chatbox").animate({ scrollTop: $(".chatbox")[0].scrollHeight}, 1000);
      }
    });

    function sendMessage(message){
        var messageData={
            message:message,
            gameId:gameId,
            player:player
        }
        //console.log(messageData);
        socket.emit('sendMessage',messageData);
    }

    socket.on("receiveMessage",function(messageData){
        $(".messages").append('<blockquote> \
                              <p>'+messageData.message+'</p> \
                              <small><cite title="Source Title">'+messageData.player+'</cite></small> \
                              </blockquote>');
        $(".chatbox").animate({ scrollTop: $(".chatbox")[0].scrollHeight}, 1000);
    });

    socket.on('notification',function(data){
        console.log("notification",data);
        if(data.code == 200){
            swal("Awesome!", "Other player joined the game");
        }else if (data.code == 401) {
            swal("Oops!", "Other player has left the game");
        }
    });
});

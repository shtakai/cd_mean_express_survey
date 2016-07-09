$('document').ready(function(){

  var socket = io.connect();

  $('button').click(function(e){

    var data = JSON.stringify($('form').serializeArray());
    socket.emit('posting_form',{survey: data});
    return false;

  });

  socket.on('message', function(data){
    var txt = `You emitted the following information to the server: ` +
      `${JSON.stringify(data.message)} \n` +
      `Your lucky number emitted by the server is ${data.random_number}.`
    $('.message').text(txt);
  });


});

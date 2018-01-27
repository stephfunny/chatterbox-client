// YOUR CODE HERE:
// var message = {
//   username: 'dayan',
//   text: 'Hi Every One',
//   roomname: 'hrsf-90'
// };


// $.get( "http://parse.sfm6.hackreactor.com/chatterbox/classes/messages", function(data, status) { 
// } );


var app = {
  
  init : function() {
   
  },
  
  server: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
  
  send : function(data) { 

    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: this.server,
      type: 'POST',
      data: data,
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        console.error('chatterbox: Failed to send message', data);
      }
    });
    
  },
  
  fetch : function() { 

    $.get( this.server, function(data, status) { 
      app.displayMessages(data);
    });
  },
  
  clearMessages: function() {
    $('#chats').empty();
  },
  

  renderMessage: function(message) {
   $('#chats').append("<tr><td>" + message['username']+"</td><td>"+message['text']+"</td><td>"+message['roomname']+"</td> </tr>");
  },  
  
  renderRoom: function(roomName) {
    //data['results'];
    $('#roomSelect').append("<option value=" + roomName + ">" + roomName + "</option>");
  },
  
  displayMessages: function (data) {
    var messageString = '';
    var roomNames = [];
    var roomString;
    data['results'].forEach( (message) =>{
      messageString += "<tr><td>" + message['username']+"</td><td>"+message['text']+"</td><td>"+message['createdAt']+"</td> </tr>";
      roomNames.push(message['roomname']);
    });
    roomNames = _.uniq(roomNames);
    roomNames.forEach(function(item) {
      
      if (item !=='' && item !== undefined && !item.includes('<')) {
        roomString += "<option value=" + item + ">" + item + "</option>";
      }

    });
    
    $('#room').append(roomString);
    $('.chatMessages').append(messageString);
  }
  
  
};






$(document).ready(function() {
     app.init();
     app.fetch()
     
  $('#clear-messages').click( function() {
      app.clearMessages();
 });
  
  
});

          // console.log('Id',message['objectId']);
          // console.log('user name ->',message['username']);
          // console.log('room name ->',message['roomname']);
          // console.log('Text',message['text']);
          // console.log('Created At',message['createdAt']);

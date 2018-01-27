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
    app.fetch();
    app.handleUsernameClick();
    app.handleSubmit();
       
    $('#clear-messages').click( function() {
      app.clearMessages();
    });

    $('body').on('click', '.username', function(){
      app.handleUsernameClick($(this).text());  
    });

    $('#clear-messages').click( function() {
      app.clearMessages();
    });
   
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

    // $.get( this.server, function(data, status) { 
    //   app.displayMessages(data);
    // });
    // data: {order:'-createdAt'},
      
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: this.server,
      type: 'GET',
      data: {order:'-createdAt'},
      contentType: 'application/json',
      success: function (data) {
        app.displayMessages(data);
      },
      error: function (data) {
        console.error('chatterbox: Failed to send receive', data);
      }
    });



  },
  handleSubmit: function(message) {
    app.send(message);
  },

  clearMessages: function() {
    $('#chats').empty();
  },
  
  handleUsernameClick: function(username) {
    console.log('handle click ->',username);
  },

  renderMessage: function(message) {
    $('#chats').append("<tr><td>" + message['username']+"</td><td>"+message['text']+"</td><td>"+message['roomname']+"</td> </tr>");
  },  
  
  renderRoom: function(roomName) {
    $('#roomSelect').append("<option value=" + roomName + ">" + roomName + "</option>");
  },
  
  displayMessages: function (data) {
    var messageString = '';
    var roomNames = [];
    var roomString;
    data['results'].forEach( (message) =>{
      messageString += "<tr><td><a class='username' href='#'>" + message['username'] + "</a></td><td>" + message['text'] + "</td><td>" + message['createdAt'] + "</td> </tr>";
      roomNames.push(message['roomname']);
    });
    roomNames = _.uniq(roomNames);
    roomNames.forEach(function(item) {
      
      if (item !== null && item !=='' && item !== undefined && !item.includes('<')) {
        roomString += "<option value=" + item + ">" + item + "</option>";
      };

    });
    
    $('#room').append(roomString);
    $('.chatMessages').append(messageString);
  }
  
};


$(document).ready(function() {
  app.init();
 
});
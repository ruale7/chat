(function() {
	var lengthArrayMessages;
	var myFirebaseRef = new Firebase(myFirebaseURL);

	var showAddedMessagesChildFromFirebase = function (selector){
		myFirebaseRef.child("chat").on("child_added",function(snapshot){
			if (conversationWithUser == "Grupo" ){
				var board=$(selector);
				var message=snapshot.val();
				var classMessage = "message-left";
				if(loggedUser.email == message.email){
					classMessage = "message-right";
				}
				board.append(
					'<div>' 
			 			+ ' <div  class=" '+ classMessage +' round-border"> ' +  (message.user || "Desconocido") 
			 			+ ':'+ '<br>' + (message.text) +' </div> ' +
			 		' </div> '
				);
				board.scrollTop(board[0].scrollHeight);
			}
		});
	}

	var sendMessageToFirebase = function(){
		var textAreaMessage= $("#message-area").val();
		var sentMessage ={
		    user: loggedUser.name,
		    text: textAreaMessage,
		    email: loggedUser.email
		};

		myFirebaseRef.child("chat").once("value",function(snapshot){
			lengthArrayMessages = snapshot.val().length;
		});

		idMessage="chat/" + lengthArrayMessages;
		myFirebaseRef.child(idMessage).set(sentMessage);

		publicFunctions.clearTextAreaMessage();
	}
	
	return publicFunctionsConnections = {
		sendMessageToFirebase:sendMessageToFirebase,
		showAddedMessagesChildFromFirebase:showAddedMessagesChildFromFirebase
	}

})();
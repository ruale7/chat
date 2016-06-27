$(document).ready(function(){
    publicFunctions.getUsers();
    publicFunctions.showDate();
    
    //Runnnig send message
	$("#message-area").on('keypress', function (e) {
		if(event.keyCode ==  13) {
			publicFunctions.sendMessageToUserOrGroupSelected();
		}
	});

	$("#send-button").click(function (e) {
		publicFunctions.sendMessageToUserOrGroupSelected();
	});

	//Runnnig receive/show message
	publicFunctionsConnections.showAddedMessagesChildFromFirebase("#board");	
});

(function (){

	var possibleAnswers = ["Hola amigo!","Adiós","¿Cómo estas?"];

	var sendMessage = function sendMessage (){
		if(conversationWithUser){
			var message=document.getElementById("message-area").value;
			var board=$("#board");
			board.append(
				'<div>' 
		 			+ ' <div  class="round-border message-right"> ' + 'Yo:'+ '<br>' + message +' </div> ' +
		 		' </div> ' 
			);
			board.animate({scrollTop: $('#board')[0].scrollHeight}, 1000);
			clearTextAreaMessage();
			if(message){
				_respondMessage();
			}
		}
		else{
			alert("Debes elegir un usuario para establecer una conversación");
		}
	}

	var clearTextAreaMessage = function clearTextAreaMessage(){
		$("#message-area").val('').focus();
	}

	var clearBoardMessages = function clearBoardMessages(){
		$("#board").empty();
	}

	var getUsers = function getUsers(){
		$.ajax({
		  url: 'http://api.randomuser.me/?results=20' ,
		  dataType: 'json',
		  success: function(data){
		  	_showUsers(data);
		  	_selectUserForSpeaking();
		  }
		});
		;	   
	}

	function _showUsers(usersList){
		usersList.results.forEach( function(user){
			$("#users-list-in-column").append(' <div><img width=72 height=72 class=\"div-user\" alt=\"' +user.name.first+ '\"'+ ' src=" '+ user.picture.medium + ' "/> ' + user.name.first+ "\r" + user.name.last  + ' </div> ');	
		});
	}

	var _selectUserForSpeaking = function selectUserForSpeaking(){
		$(".div-user").click(function(){
			$(this).addClass("img-selected");
			if ( $(".div-user").hasClass( "img-selected" ) ) {
				$(".div-user").removeClass("img-selected");
			}
			$(this).addClass("img-selected");
			clearBoardMessages();
			conversationWithUser = $(this).attr("alt");
		});

	}

	function _respondMessage(){
		var randomNumber = Math.floor(Math.random()*(possibleAnswers.length));
		$("#board").append(
			'<div>' 
	 			+ ' <div  class="message-left round-border"> ' + conversationWithUser + ':'+ '<br>' + possibleAnswers[randomNumber] +' </div> ' +
	 		' </div> '
		);
	}

	var showDate = function showDate(){
		var parsedDate=_parseDateToString();
		myclock="<font size='2' class='date'> <b> <font size='4'>Hora actual</font> </br>"+parsedDate+"</b> </font>";
		document.getElementById("liveclock").innerHTML=myclock;
		setTimeout(showDate,1000);
	}

	function _parseDateToString(){
		var Digital=new Date();
		var hours=Digital.getHours();
		var minutes=Digital.getMinutes();
		var seconds=Digital.getSeconds();
		var dn="PM"
		
		if (hours<12){
			dn="AM";
		}
		if (hours>12){
			hours=hours-12;
		}
		if (hours==0){
			hours=12;
		}
		if (minutes<=9){
		 	minutes="0"+minutes;
		}
		if (seconds<=9){
			seconds="0"+seconds;
		}
		return hours+":"+minutes+":"+seconds+" "+dn+"  ";
	}

	var sendMessageToUserOrGroupSelected = function sendMessageToUserOrGroupSelected(){
		if(conversationWithUser != "Grupo"){
			publicFunctions.sendMessage(); 
		} else{
			publicFunctionsConnections.sendMessageToFirebase("#message-area");
		}
	}

	return publicFunctions = { 
		showDate:showDate,
		getUsers:getUsers,
		sendMessageToUserOrGroupSelected : sendMessageToUserOrGroupSelected,
		sendMessage:sendMessage,
		clearTextAreaMessage:clearTextAreaMessage,
		clearBoardMessages:clearBoardMessages
	}

})();


Meteor.subscribe('rooms');

Template.home.helpers({
	
});

Template.home.events({
	'submit form[name=createRoom]' : function (event) {
		event.preventDefault();
		var roomName = jQuery('input[name=newroom').val();
		Meteor.call('createNewRoom', roomName, function (error, result) {
			if (error) {
				console.log(error);
			} else {
				console.log(result);
			}
		});
	}
});
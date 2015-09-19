Meteor.subscribe('rooms');

Template.home.helpers({
	
});

Template.home.events({
	'submit form[name=createRoom]' : function (event) {
		event.preventDefault();
		var $input = jQuery('input[name=newroom')
		var roomName = $input.val();
		Meteor.call('createNewRoom', roomName, function (error, result) {
			if (error) {
				//console.log(error);
				$input.addClass('danger');
				jQuery('.feedback')
					.addClass('danger')
					.html(error.reason)
					.show();
			} else {
				console.log(result);
			}
		});
	}
});
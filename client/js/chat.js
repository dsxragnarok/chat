Template.chat.helpers({});
Template.chat.events({});

Template.logs.helpers({
	'messages' : function () {
		var room = this._id;
		var oneRoom = Rooms.findOne(room);
		//console.log(oneRoom);
		var messages = oneRoom.messages;
		console.log(messages);
		return messages;
	}
});
Template.logs.events({});

Template.userInput.helpers({});
Template.userInput.events({
	'submit form' : function (event) {
		event.preventDefault();

		var $input = jQuery('input[name=message-input]');

		if ($input.val().trim().length === 0) {
			return;
		}

		var room = this._id,
				message = $input.val();

		Meteor.call('createNewMessage', room, message);

		$input.val('');
	}
});
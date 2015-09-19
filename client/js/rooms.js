Template.rooms.helpers({
	room : function () {
		return Rooms.find();
	}
});

Template.rooms.events({
	'click .roomList > li' : function (event) {
		// TODO: implement permission checking before passing them on
		// to that chat room
		Router.go('chat', {_id: this._id});
	} 
});
Template.occupants.helpers({
	'occupant' : function () {
		console.log(' begin occupant ');
		var room = this._id,
			oneRoom = Rooms.findOne(room),
			occupants =	oneRoom.occupants;
		console.log(occupants);

		return occupants;
	}
});
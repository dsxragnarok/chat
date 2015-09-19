Template.occupants.helpers({
	'occupant' : function () {
		// not sure how to define this function elsewhere and refer
		// to it yet. So, defining it here for now.
		var expandUser = function (userid) {
			console.log(Meteor);
	    var user = Meteor.users.findOne(userid);
	    var data = {
	      name : user.username,
	      id : user._id,
	      firstname : user.firstname,
	      lastname : user.lastname,
	      emails : user.emails
	    };
	    return data;
	  };

		var room = this._id,
			oneRoom = Rooms.findOne(room),
			occupantIds = oneRoom.occupants,
			occupants =	occupantIds.map(function (id, index) {
				var occupant = expandUser(id);
				console.log(occupant);
				return occupant;
			});

		console.log(occupants);

		return occupants;
	}
});
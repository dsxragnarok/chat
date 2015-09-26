Meteor.methods({
  'createNewRoom' : function (roomName) {
    /*
      oneroom : {
        _id : string,
        date : new Date(),
        name : string,
        createdBy : userid,
        occupants : [],
        private : boolean,
        messages : []
      }
    */
    var currentUser = Meteor.userId();
    if (!currentUser) {
      throw new Meteor.Error('not-authorized', 'You have no permission to create rooms.');
    }
    var userInfo = Meteor.users.findOne(currentUser);

    var data = {
      createdBy : currentUser,
      date : new Date(),
      name : roomName,
      private : false,
      occupants : [{
        id : currentUser,
        name : userInfo.username,
        email : userInfo.emails[0].address
      }], // the creator should also be an occupant
      messages : []
    };

    return Rooms.insert(data);
  },
  'createNewMessage' : function (room, message) {
    /*
      oneMessage = {
        speaker : userid,
        speakerName : username,
        date : new Date(),
        message : string
      }
    */
    var currentUser = Meteor.userId();
    if (!currentUser) {
      throw new Meteor.Error('not-authorized', 'You do not have chat permission.');
    }

    check(message, String);
    // don't do anything with empty strings
    if (message.trim().length === 0) {
      throw new Meteor.Error('empty-message');
    }

    var data = {
      speaker : currentUser,
      speakerName : Meteor.user().username,
      date : new Date(),
      message : message
    };

    Rooms.update(room, {
      $push : {
        messages : data
      }
    }, function (error, results) {
      if (error) {
        console.log(error);
      } else {
        console.log(' -- success -- ');
        console.log(results);
      }
    });
  },
  onUserJoinRoom : function (roomId) {
    var currentUser = Meteor.userId();
    if (!currentUser) {
      throw new Meteor.Error('not-authorized', 'You must be logged in to join room');
    }

    var userInfo = Meteor.users.findOne(currentUser);

    var oneRoom = Rooms.findOne(roomId);

    if (!userInRoom(oneRoom.occupants, currentUser)) {
      var oneUser = {
        name : userInfo.username,
        email : userInfo.emails[0].address,
        id : currentUser
      };

      Rooms.update({_id: roomId}, {
        $push : {occupants : oneUser}
      });
    }

    return 'Success';
  },
  onUserLeaveRoom : function (userId,roomId) {
    var userInfo = Meteor.users.findOne(userId);
    var oneRoom = Rooms.findOne(roomId);

    if (!userInfo) {
      throw new Meteor.Error('invalid-user', 'Attempting to remove a non-existent user. [' + userId + ']');
    }
    if (!oneRoom) {
      throw new Meteor.Error('invalid-room', 'Attempting to remove user from non-existent room. [' + roomId + ']');
    }

    Rooms.update({}, {
      $pull : {occupants : {id : userId}}
    });
  }
});

var userInRoom = function (list, id, name, email) {
  var i = 0, 
      len = list.length,
      userData;
  for (i; i < len; i += 1) {
    userData = list[i];
    if (id === userData.id) {
      return true;
    }
    if (name !== undefined && name === userData.name) {
      return true;
    }
    if (email !== undefined && email === userData.email) {
      return true;
    }
  }
  return false;
};
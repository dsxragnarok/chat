Rooms = new Mongo.Collection('chatrooms');

if (Meteor.isClient) {

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}


Router.configure({
  layoutTemplate : 'layout'
});

Router.route('/', {
  name : 'home',
  template : 'home'
});

Router.route('/login');
Router.route('/register');

Router.route('/chat/:_id', {
  name : 'chat',
  template : 'chat',
  data : function () {
    var chatId = this.params._id,
        currentUser = Meteor.userId();

    return Rooms.findOne(chatId);
  }
});

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

    var data = {
      createdBy : currentUser,
      date : new Date(),
      name : roomName,
      private : false,
      occupants : [currentUser], // the creator should also be an occupant
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
  }
});
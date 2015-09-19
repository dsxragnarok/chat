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
  },
  onBeforeAction : function () {
    // TODO: implement permission checking
    // for now all rooms are public, so clicking on the room
    // should add user to the room and route them to it
    Meteor.call('onUserJoinRoom', this.params._id, function (error, results) {
      if (error) {
        console.log(error.reason);
      }
    });
    this.next();
  }
});
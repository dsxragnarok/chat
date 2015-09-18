Template.navigation.helpers({

});

Template.navigation.events({
	'click .logout' : function (event) {
		event.preventDefault();
		Meteor.logout();
		Router.go('login');
	}
})
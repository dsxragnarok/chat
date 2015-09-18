Template.login.helpers({

});

Template.login.events({
	'submit form' : function (event) {
		event.preventDefault();
	}
});

Template.login.onRendered(function () {
	$login = jQuery('.login');
	$login.validate({
		submitHandler : function (event) {
			var username = $login.find('input[name=username]').val();
			var password = $login.find('input[name=password]').val();
			
			Meteor.loginWithPassword(username, password, function (error) {
				if (error) {
					if (error.reason === 'User not found') {
						validator.showErrors({
							username : error.reason
						});
					}
					if (error.reason === 'Incorrect password') {
						validator.showErrors({
							password : error.reason
						});
					}
				} else {
					var currentRoute = Router.current().route.getName();

					if (currentRoute === 'login') {
						Router.go('home');
					}
				}
			});
		}
	});
});
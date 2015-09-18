jQuery.validator.setDefaults({
	rules : {
		username : {
			required : true,
			minlength : 3
		},
		password : {
			required : true,
			minlength : 5
		},
		confirmpassword : {
			required : true,
			equalTo : '.password'
		},
		email : {
			required : true,
			email : true,
		}
	},
	messages : {
		username : {
			required : "You must have a username."
		},
		password : {
			required : "You must enter a password.",
			minlength : "Passwords must be {0} or more characters."
		},
/*		confirmpassword : {
			required : "You must re-enter your password here."
		},*/
		email : {
			required : "You must enter a valid email address.",
			email : "Please enter a valid email address."
		}
	}
});

Template.register.helpers({

});

Template.register.events({
	'submit form' : function (event) {
		event.preventDefault();
	}
});

Template.register.onRendered(function () {
	var $register = jQuery('.register');
	var validator = $register.validate({
		submitHandler : function (event) {
			var userdata = {
				username : $register.find('input[name=username]').val(),
				password : $register.find('input[name=password]').val(),
				/*confirmpassword : $register.find('input[name=confirmpassword]').val(),*/
				email : $register.find('input[name=email]').val(),
				/*firstname : $register.find('input[name=firstname]').val(),
				lastname : $register.find('input[name=lastname]').val()*/
			}

			Accounts.createUser(userdata, function (error, results) {
				if (error) {
					validator.showErrors({
						username : "That username already exists."
					});
				} else {
					Router.go('home');
				}
			});
		}
	});
});
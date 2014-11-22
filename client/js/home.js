Template.signupForm.events({
  "submit #signup-form": function(event, template) {
    event.preventDefault();
    Accounts.createUser({
      email:template.find("#email").value,
      username: template.find("#username").value,
      password: template.find("#password").value,
      
    }, function(error) {
      if (error) {
      	alert(error);
        // Display the user creation error to the user however you want
      }else{
      	alert('注册成功');
      	Router.go('/');
      }
    });
  }
});

Template.loginForm.events({
  "submit #login-form": function(event, template) {
    event.preventDefault();
    Meteor.loginWithPassword(
      template.find("#login-username").value,
      template.find("#login-password").value,
      function(error) {
        if (error) {
          // Display the login error to the user however you want
        }
      }
    );
  }
});
Template.projectList.helpers({
	tasks:function(){
		username = Meteor.user().username;
		r =  Task.find({username:username});
		return r;
	},
	email:function(){
		if(Meteor.userId()){
			user = Meteor.user();
			return user.emails[0].address;
		}else{
			return "暂未登陆";
		}
		
		console.log(user);
	},
	isLoginIn:function(){
		return isLoginIn();
	}
})

Template.loginStatusBar.helpers({
	email:function(){
		if(Meteor.userId()){
			user = Meteor.user();
			return user.emails[0].address;
		}
		
	},
	isLoginIn:function(){
		return isLoginIn();
	}
})

Template.loginStatusBar.events({
	'click #logout':function(){
		Meteor.logout();
	}
})

function isLoginIn(){
	if(Meteor.userId())
	{
		return true;
	}else{
		return false;
	}
}


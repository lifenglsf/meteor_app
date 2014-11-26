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
          alert('用户名不存在,请先注册');
        }
      }
    );
  }
});
Template.projectList.helpers({
	tasks:function(){
		r = [];
		user = Meteor.user();
		console.log(user);
		if(user){
			username = user.username;
			r =  Task.find({username:username},{transform:function(obj){
				obj.prehours = parseInt(obj.prehours);
				obj.hours = parseInt(obj.hours);
				return obj;
			}
			}).fetch();
		}
		return r;
	},
	username:function(){
			user = Meteor.user();
			if(user){
				return user.username;
			}
			return "";
		
	},
	pretotal:function(){
		pretotal = 0;
		user = Meteor.user();
		if(user){
			username = user.username;
			task = Task.find({username:username},{pretotal:1}).fetch();
			_.each(task,function(ele){
				pretotal += parseInt(ele.prehours);
			})
		}
		return pretotal;

	},
	total:function(){
                total = 0;
                user = Meteor.user();
                if(user){
                        username = user.username;
                        task = Task.find({username:username},{total:1}).fetch();
                        _.each(task,function(ele){
                                total += parseInt(ele.hours);
                        })
                }
                return pretotal;

        }
	
})
Template.loginStatusBar.helpers({
	username:function(){
		user = Meteor.user();
		if(user){
			return user.username;
		}
		return "";
		
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


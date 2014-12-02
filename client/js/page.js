Router.onBeforeAction(function() {
 if (!Meteor.userId()) {
    routename = Router.current().route.getName();
	if(routename == 'register'){
		this.render('signupForm');
		return;
	}
	this.render('loginForm');
  }else{
    this.next();		
  }
});
Router.route('/', function () {
	console.log("enter");
	this.render('home');
});
Router.route('admin',function(){
		this.render('adminIndex');
	
});
Router.route('logout',function(){
	Meteor.logout();
})
Router.route('login',function(){
	if(Meteor.userId()){
		Router.go('/');
	}else{
		this.render();
	}
})
Router.route('add-task',function(){
	this.render();
})
Router.route('add-project',function(){
	this.render();
})
Router.route('add-bugs',function(){
	this.render();
});
Router.route('register',function(){
	this.render('signupForm');
})

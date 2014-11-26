Router.onBeforeAction(function() {
console.log(Meteor.userId()); 
 if (!Meteor.userId()) {
    this.render('login');
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

Router.onBeforeAction(function() {
 if (!Meteor.userId()) {
    routename = Router.current().route.getName();
	if(routename == 'register'){
		this.render('signupForm');
		return;
	}
	if(routename == 'createSuperUser'){
		this.render('createSuperUser');
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
	console.log(Meteor.user())

	userId = Meteor.userId();
	if(!userId){
		Router.go('login');
	}
	user = Meteor.user();
	role = user['role'];
	module = "task";
	action = "add";
	actionlist = role[module];
	if(_.indexOf(actionlist,action)==-1){
		this.render('noperm');
	}else{
		this.render();
	}
	
})
Router.route('add-project',function(){
	user = Meteor.user();
	role = user['role'];
	module = "project";
	action = "add";
	actionlist = role[module];
	if(_.indexOf(actionlist,action)==-1){
		this.render('noperm');
	}else{
		this.render();
	}
})
Router.route('add-bugs',function(){
	user = Meteor.user();
	role = user['role'];
	module = "bug";
	action = "add";
	actionlist = role[module];
	if(_.indexOf(actionlist,action)==-1){
		this.render('noperm');
	}else{
		this.render();
	}
});
Router.route('register',function(){
	this.render('signupForm');
})
Router.route('addModule',function(){
	//this.render();
	user = Meteor.user();
	role = user['role'];
	module = "module";
	action = "add";
	actionlist = role[module];
	/*this.render();
	if(_.indexOf(actionlist,action)==-1){
		this.render('noperm');
	}else{
		this.render();
	}*/
	this.render();
})
Router.route('listModule',function(){
	this.render();
	/*user = Meteor.user();
	role = user['role'];
	module = "module";
	action = "list";
	actionlist = role[module];
	if(_.indexOf(actionlist,action)==-1){
		this.render('noperm');
	}else{
		this.render();
	}*/
})
Router.route('editModule/:_id',function(){
	
	user = Meteor.user();
	role = user['role'];
	module = "module";
	action = "list";
	actionlist = role[module];
	if(_.indexOf(actionlist,action)==-1){
		this.render('noperm');
	}else{
		var item = Module.findOne({_id: this.params._id});
  		this.render('editModule', {data: item});
	}
})
Router.route('delModule/:_id',function(){
	
  	
	user = Meteor.user();
	role = user['role'];
	module = "module";
	action = "list";
	actionlist = role[module];
	if(_.indexOf(actionlist,action)==-1){
		this.render('noperm');
	}else{
		var item = Module.findOne({_id: this.params._id});
		if(item){
			Module.remove({_id:this.params._id});
			Router.go('listModule');
		}else{
			this.render('recordnoexists');
		}
	}
})
Router.route('/user/addRole',function(){
	//this.render('addRole');
	user = Meteor.user();
	role = user['role'];
	module = "user";
	action = "add";
	actionlist = role[module];
	if(_.indexOf(actionlist,action)==-1){
		this.render('noperm');
	}else{
		this.render('addRole');
	}
})
Router.route('noperm',function(){
	this.render();
})
Router.route('createSuperUser',function(){
	if(Meteor.userId()){
		Router.go('/');
	}
	this.render('createSuperUser');
})
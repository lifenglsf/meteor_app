Router.configure({
    notFoundTemplate: '404',
    layoutTemplate: 'common'
});
Router.onBeforeAction(function() {
    if (!Meteor.userId()) {
        routename = Router.current().route.getName();
        if (routename == 'register') {
            this.render('signupForm');
            return;
        }
        if (routename == 'createSuperUser') {
            this.render('createSuperUser');
            return;
        }
        this.layout('sign');
        this.render('loginForm');
    } else {
        this.next();
    }
});
Router.route('/', function() {
    this.render('home');
});
Router.route('admin', function() {
    this.render('adminIndex');

});
Router.route('logout', function() {
    Meteor.logout();
});
Router.route('login', function() {
    if (Meteor.userId()) {
        Router.go('/');
    } else {
        this.layout('sign');
        this.render();
    }
});
Router.route('task/add', function() {

    userId = Meteor.userId();
    if (!userId) {
        Router.go('login');
    }
    user = Meteor.user();
    role = user['role'];
    module = "task";
    action = "add";
    actionlist = role[module];
    if (_.indexOf(actionlist, action) == -1) {
        this.render('noperm');
    } else {
        this.render('addTask');
    }

});
Router.route('project/add', function() {
    var user = Meteor.user();
    var role ={};
    if(user && user['role']){
    	role = user['role'];
    }
    var module = "project";
    var action = "add";
    var actionlist = role[module];
    if (_.indexOf(actionlist, action) == -1) {
        this.render('noperm');
    } else {
        this.render('addProject');
    }
});
Router.route('bugs/add', function() {
    user = Meteor.user();
    var role ={};
    if(user && user['role']){
    	role = user['role'];
    }
    module = "bug";
    action = "add";
    actionlist = role[module];
    if (_.indexOf(actionlist, action) == -1) {
        this.render('noperm');
    } else {
        this.render('addBug');
    }
});
Router.route('register', function() {
    this.layout('sign');
    this.render('signupForm');
});
Router.route('module/add', function() {
    //this.render();
    user = Meteor.user();
    var role ={};
    if(user && user['role']){
    	role = user['role'];
    }
    module = "module";
    action = "add";
    actionlist = role[module];
    this.render();
    if (_.indexOf(actionlist, action) == -1) {
        this.render('noperm');
    } else {
        this.render('addModule');
    }
});
Router.route('module/list', function() {
    user = Meteor.user();
    var role ={};
    if(user && user['role']){
    	role = user['role'];
    }
    module = "module";
    action = "list";
    actionlist = role[module];
    if (_.indexOf(actionlist, action) == -1) {
        this.render('noperm');
    } else {
        this.render('listModule');
    }
});
Router.route('module/edit/:_id', function() {

    user = Meteor.user();
    var role ={};
    if(user && user['role']){
    	role = user['role'];
    }
    module = "module";
    action = "list";
    actionlist = role[module];
    if (_.indexOf(actionlist, action) == -1) {
        this.render('noperm');
    } else {
        var item = Module.findOne({
            _id: this.params._id
        });
        this.render('editModule', {
            data: item
        });
    }
});
Router.route('module/del/:_id', function() {


    user = Meteor.user();
    var role ={};
    if(user && user['role']){
    	role = user['role'];
    }
    module = "module";
    action = "list";
    actionlist = role[module];
    if (_.indexOf(actionlist, action) == -1) {
        this.render('noperm');
    } else {
        var item = Module.findOne({
            _id: this.params._id
        });
        if (item) {
            Module.remove({
                _id: this.params._id
            });
            Router.go('listModule');
        } else {
            this.render('recordnoexists');
        }
    }
});
Router.route('/user/role/add', function() {
    //this.render('addRole');
    user = Meteor.user();
    var role ={};
    if(user && user['role']){
    	role = user['role'];
    }
    module = "user";
    action = "add";
    actionlist = role[module];
    if (_.indexOf(actionlist, action) == -1) {
        this.render('noperm');
    } else {
        this.render('addRole');
    }
});
Router.route('noperm', function() {
    this.render();
});
Router.route('createSuperUser', function() {
    if (Meteor.userId()) {
        Router.go('/');
    }
    this.render('createSuperUser');
});
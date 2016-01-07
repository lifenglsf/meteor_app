Router.configure({
    //notFoundTemplate: '404',
    layoutTemplate: 'common',
});

Router.onBeforeAction(function () {
    var route = Router.current().route;
    if (route) {
        routename = route.getName();
        if (!Meteor.userId()) {

            if (routename == 'register') {
                this.layout('sign')
                this.render('signupForm');;
                return;
            }
            if (routename == 'createSuperUser') {
                this.layout('sign');
                this.render('createSuperUser');
                return;
            }
            this.layout('sign');
            this.render('loginForm');
        } else {
            this.next();
        }
    }else{
        this.layout('sign');
    }

});
Router.route('/', function () {
    this.render('home');
});
Router.route('admin', function () {
    this.render('adminIndex');

});
Router.route('logout', function () {
    Meteor.logout();
});
Router.route('login', function () {
    if (Meteor.userId()) {
        Router.go('/');
    } else {
        this.layout('sign');
        this.render('login');
    }
});
Router.route('task/add', function () {

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
Router.route('task/list',function(){
    /* user = Meteor.user();
     var role ={};
     if(user && user['role']){
        role = user['role'];
     }
     module = "task";
     action = "list";
     actionlist = role[module];
     if (_.indexOf(actionlist, action) == -1) {
         this.render('noperm');
     } else {
         this.render('addBug');
     }*/
    this.render('listTask');
});
Router.route('task/edit/:_id', function () {
    Session.set('taskid', this.params._id);
     /* user = Meteor.user();
     var role ={};
     if(user && user['role']){
        role = user['role'];
     }
     module = "task";
     action = "edit";
     actionlist = role[module];
     if (_.indexOf(actionlist, action) == -1) {
         this.render('noperm');
     } else {
         this.render('addBug');
     }*/
    
        this.render('editTask');
    

    //}
});
Router.route('task/del/:_id', function () {
     var item = Task.findOne({
        _id: this.params._id
    });
    if (item) {
        Task.remove({
            _id: this.params._id
        });
        Router.go('listTask');
    } else {
        this.render('recordnoexists');
    }
});
Router.route('project/add', function () {
    var user = Meteor.user();
    var role = {};
    if (user && user['role']) {
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

Router.route('project/list',function(){
    /* user = Meteor.user();
     var role ={};
     if(user && user['role']){
        role = user['role'];
     }
     module = "project";
     action = "list";
     actionlist = role[module];
     if (_.indexOf(actionlist, action) == -1) {
         this.render('noperm');
     } else {
         this.render('addBug');
     }*/
    this.render('listProject');
});
Router.route('bugs/add', function () {
    /* user = Meteor.user();
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
     }*/
    this.render('addBug');
});
Router.route('bugs/list', function () {
    /* user = Meteor.user();
     var role ={};
     if(user && user['role']){
     	role = user['role'];
     }
     module = "bug";
     action = "list";
     actionlist = role[module];
     if (_.indexOf(actionlist, action) == -1) {
         this.render('noperm');
     } else {
         this.render('addBug');
     }*/
    this.render('listBug');
});
Router.route('bugs/edit/:_id', function () {
    /*   user = Meteor.user();
        var role ={};
        if(user && user['role']){
        	role = user['role'];
        }
        module = "bugs";
        action = "edit";
        actionlist = role[module];
        if (_.indexOf(actionlist, action) == -1) {
            this.render('noperm');
        } else {*/
    Session.set('bugid', this.params._id);
    var item = Bug.findOne({
        _id: this.params._id
    });
    console.log(item);
    if (item) {
        Session.set('bug_' + this.params._id, item);
        var project = Project.find({}, {
            transform: function (obj) {
                obj.isselected = false;
                if (obj.projectname == item.project) {
                    obj.isselected = true;
                }
                return obj;
            }
        }).fetch();
        var users = Meteor.users.find({}, {
            transform: function (obj) {
                obj.isselected = false;
                if (obj.username == item.username) {
                    obj.isselected = true;
                }
                return obj;
            }
        }).fetch();
        console.log(project);
        this.render('editBug', {
            data: {
                item: item,
                project: project,
                users: users
            }
        });
    } else {
        this.render('noperm');
    }

    //}
});
Router.route('bugs/del/:_id', function () {
    /*   user = Meteor.user();
        var role ={};
        if(user && user['role']){
        	role = user['role'];
        }
        module = "bugs";
        action = "delete";
        actionlist = role[module];
        if (_.indexOf(actionlist, action) == -1) {
            this.render('noperm');
        } else {*/
    var item = Bug.findOne({
        _id: this.params._id
    });
    if (item) {
        Bug.remove({
            _id: this.params._id
        });
        Router.go('listBug');
    } else {
        this.render('recordnoexists');
    }
    //}
});
Router.route('register', function () {
    this.layout('sign');
    //this.render('signupForm');
});
Router.route('module/add', function () {
    //this.render();
    user = Meteor.user();
    var role = {};
    if (user && user['role']) {
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
Router.route('module/list', function () {
    user = Meteor.user();
    var role = {};
    if (user && user['role']) {
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
Router.route('module/edit/:_id', function () {

    user = Meteor.user();
    var role = {};
    if (user && user['role']) {
        role = user['role'];
    }
    module = "module";
    action = "list";
    actionlist = role[module];
    if (_.indexOf(actionlist, action) == -1) {
        this.render('noperm');
    } else {
        Session.set('moduleid', this.params._id);
        var item = Module.findOne({
            _id: this.params._id
        });
        this.render('editModule', {
            data: item
        });
    }
});
Router.route('module/del/:_id', function () {


    user = Meteor.user();
    var role = {};
    if (user && user['role']) {
        role = user['role'];
    }
    module = "module";
    action = "delete";
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
Router.route('user/add',function(){
    user = Meteor.user();
    var role = {};
    if (user && user['role']) {
        role = user['role'];
    }
    module = "user";
    action = "add";
    actionlist = role[module];
    if (_.indexOf(actionlist, action) == -1) {
        this.render('noperm');
    } else {
        this.render('addUser');
    }
});
Router.route('/user/del/:_id',function(){
    user = Meteor.user();
    var role = {};
    if (user && user['role']) {
        role = user['role'];
    }
    module = "user";
    action = "delete";
    actionlist = role[module];
    if (_.indexOf(actionlist, action) == -1) {
        this.render('noperm');
    } else {
        var item = Meteor.users.findOne({
            _id: this.params._id
        });
        if (item) {
            Meteor.users.remove({
                _id: this.params._id
            });
            Router.go('listUser');
        } else {
            this.render('recordnoexists');
        }
    }
})
Router.route('/user/:_id/role/add', function () {
    id = this.params._id;
    Session.set('userId',id);
    this.render('addRole');
    
   /* user = Meteor.user();
    var role = {};
    if (user && user['role']) {
        role = user['role'];
    }
    module = "role";
    action = "add";
    actionlist = role[module];
    if (_.indexOf(actionlist, action) == -1) {
        this.render('noperm');
    } else {
        this.render('addRole');
    }*/
});
Router.route('/user/list',function(){
   /* user = Meteor.user();
    var role = {};
    if (user && user['role']) {
        role = user['role'];
    }
    module = "user";
    action = "list";
    actionlist = role[module];
    if (_.indexOf(actionlist, action) == -1) {
        this.render('noperm');
    } else {
        this.render('addRole');
    }*/
    this.render('listUser');
})
Router.route('noperm', function () {
    this.render();
});
Router.route('createSuperUser', function () {
    if (Meteor.userId()) {
        Router.go('/');
    }
    this.layout('sign');
    this.render('createSuperUser');
});
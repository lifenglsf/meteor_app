/*jshint strict: true*//*jshint globals: true, devel: true, node: true, jquery: true*//*global $, jQuery, ko, moment, console, toastr, accounting, _,Template,Meteor,Router,Accounts */
Template.addBug.onCreated(function () {
    'use strict';
    this.task = new ReactiveVar();
    this.module = new ReactiveVar();
    console.log(this.task);
});
Template.editBug.onCreated(function () {
    'use strict';
    this.taskE = new ReactiveVar('taskE');
    this.moduleE = new ReactiveVar('moduleE');
});

Template.addBug.helpers({
    users: function () {
        'use strict';
        return Meteor.users.find().fetch();
    },
    project: function () {
        'use strict';
        return Project.find({}).fetch();
    },
    module: function () {
        'use strict';
        return Template.instance().module.get();

    },
    moduleData: function () {
        'use strict';
        Template.instance().module.get('module');
        var project;
        var instance = Template.instance();
        var m = {};
        if (instance) {
            var firstnode = instance.firstNode;
            project = $(firstnode).find('#project').val();
            m = Module.find({
                project: project
            }).fetch();
        }
        console.log(m);
        //project = Template.instance().find('#project').value;
        return m;
    },
    task: function () {
        'use strict';
        return Template.instance().task.get();
    },
    taskData: function () {
        'use strict';
        var project;
        var instance = Template.instance();
        var module;
        var t = {};
        console.log(instance);
        if (instance) {
            console.log('abc')
            var firstnode = instance.firstNode;
            if (firstnode) {
                project = $(firstnode).find('#project').val();
                module = $(firstnode).find('#module').val();
                console.log(project, module);
                t = Task.find({
                    projectname: project,
                    modulename: module
                }).fetch();
            }

        }
        return t;
    }

});
Template.editBug.helpers({
    moduleE: function () {
        'use strict';
        return Template.instance().moduleE.get();

    },
    moduleDataE: function () {
        'use strict';
        var project;
        var instance = Template.instance();
        var m = [{}];
        if (instance) {
            var firstnode = instance.firstNode;
            project = $(firstnode).find('#project').val();
            if (project) {
                m = Module.find({
                    project: project
                }).fetch();
            } else {
                var bugid = Session.get('bugid');
                var bug = Session.get('bug_' + bugid);
                if (bug) {
                    m = Module.find({}, {
                        transform: function (obj) {
                            obj.isselected = false;
                            if (obj.modulename == bug.module) {
                                obj.isselected = true;
                            }
                            return obj;
                        }
                    }).fetch();
                } else {
                    m = Module.find({}).fetch();
                }

            }

        }
        console.log(m);
        //project = Template.instance().find('#project').value;
        return m;
    },
    taskE: function () {
        'use strict';
        return Template.instance().taskE.get();
    },
    taskDataE: function () {
        'use strict';
        var project;
        var instance = Template.instance();
        var module;
        var t = [{}];
        if (instance) {
            var firstnode = instance.firstNode;
            console.log(firstnode);
            //if (firstnode) {
                project = $(firstnode).find('#project').val();
                module = $(firstnode).find('#module').val();
                console.log(project,module);
                if (project && module) {
                    t = Task.find({
                        projectname: project,
                        modulename: module
                    }).fetch();
                } else {
                    var bugid = Session.get('bugid');
                    var bug = Session.get('bug_' + bugid);
                    if (bug) {
                        t = Task.find({}, {
                            transform: function (obj) {
                                obj.isselected = false;
                                if (obj.taskname == bug.task) {
                                    obj.isselected = true;
                                }
                                return obj;
                            }
                        }).fetch();
                    } else {
                        t = Task.find({}).fetch();
                    }
                }

            //}

        }
        console.log(t);
        return t;
    }
});
Template.listBug.helpers({
    bugList: function () {
        'use strict';
        var user = Meteor.user();
        if (user) {
            var username = user.username;
            return Bug.find({
                username: username
            }).fetch();
        }

    }
});
Template.editBug.events({
     'change #module': function (event, template) {
        'use strict';
        console.log('changed');
        template.taskE.set('moduleE');
        template.taskE.set('taskE');

    },
    'change #project': function (event, template) {
        'use strict';

        /*$('#module')
            .find('option')
            .remove()
            .append('<option value=">请选择项目</option>');*/
        //template.module = new ReactiveVar();
        template.moduleE.set('taskE');
        template.moduleE.set('moduleE');
        template.taskE.set('abc');

    },
    'click #addTaskSubmit': function (event, template) {
        'use strict';
        event.target.disabled = true;
        var project = template.find('#project').value;
        var module = template.find('#module').value;
        var task = template.find('#task').value;
        var username = template.find('#people').value;
        var title = template.find('#title').value;
        var content = template.find('#content').value;
        if(!title){
            alert('bug标题不能为空');
            return false;
        }
        if(!content){
            alert('bug内容不能为空');
            return false;
        }
        if(!username){
            alert('处理人不能为空');
            return false;
        }
        var fileObj;
        var file;
        var tmpfile;
        var param = {};
        param.username = username;
        if(project){
            param.project = project;
        }
        if(module){
            param.module = module;
        }
        if(task){
            param.task = task;
        }
 
        var bugid = Session.get('bugid');
        tmpfile = $('#file').get(0).files[0];
        if(tmpfile){
             fileObj = new FS.File(tmpfile);
        Images.insert(tmpfile, function (err, fileObj) {
            if (err) {
                alert('附件上传失败');
                return false;
            } else {
                param.file = "/cfs/files/images/" + fileObj._id;
                var r = Bug.update({_id:bugid},{$set:param});
                if (r) {
                    alert('修改成功');
                    
                    event.target.disabled = false;
                } else {
                    alert('修改失败');
                    event.target.disabled = false;
                }
                //Router.go('/bugs/list');
            }
        });
        }else{
            var r = Bug.update({_id:bugid},{$set:param});
                if (r) {
                    alert('修改成功');
                    
                    event.target.disabled = false;
                } else {
                    alert('修改失败');
                    event.target.disabled = false;
                }
            //Router.go('/bugs/list');
        }
        
       





        return false;
    },
})
Template.addBug.events({
    'change #module': function (event, template) {
        'use strict';
        console.log('changed');
        template.task.set('module');
        template.task.set('task');

    },
    'change #project': function (event, template) {
        'use strict';

        /*$('#module')
            .find('option')
            .remove()
            .append('<option value=">请选择项目</option>');*/
        //template.module = new ReactiveVar();
        template.module.set('task');
        template.module.set('module');
        template.task.set('abc');

    },
    'click #addTaskSubmit': function (event, template) {
        'use strict';
        event.target.disabled = true;
        var project = template.find('#project').value;
        var module = template.find('#module').value;
        var task = template.find('#task').value;
        var username = template.find('#people').value;
        var title = template.find('#title').value;
        var content = template.find('#content').value;
        if(!username){
            alert('处理人不能为空');
            return false;
        }
        if(!title){
            alert('bug标题不能为空');
            return false;
        }
        if(!cotnent){
            alert('bug内容不能为空');
            return false;
        }
        var fileObj;
        var file;
        var tmpfile;
        var param = {
            project: project,
            module: module,
            task: task,
            username: username,
            title: title,
            content: content,
        };
        tmpfile = $('#file').get(0).files[0];
        if(tmpfile){
             fileObj = new FS.File(tmpfile);
        console.log(fileObj);
        Images.insert(tmpfile, function (err, fileObj) {
            if (err) {
                alert('附件上传失败');
                return false;
            } else {
                param.file = "/cfs/files/images/" + fileObj._id;
                var r = Bug.insert(param);
                if (r) {
                    alert('添加成功');
                    template.find('#addBug').reset();
                    event.target.disabled = false;
                } else {
                    alert('添加失败');
                    event.target.disabled = false;
                }
            }
        });
        }else{
            var r = Bug.insert(param);
                if (r) {
                    alert('添加成功');
                    template.find('#addBug').reset();
                    event.target.disabled = false;
                } else {
                    alert('添加失败');
                    event.target.disabled = false;
                }
        }
       





        return false;
    },
    'change .myfile': function (event, template) {
        'use strict';
        FS.Utility.eachFile(event, function (file) {
            Images.insert(file, function (err, fileObj) {
                console.log(fileObj);
                console.log(file);
                if (err) {
                    // handle error
                } else {
                    // handle success depending what you need to do
                    var userId = Meteor.userId();
                    var imagesURL = {
                        "profile.image": "/cfs/files/images/" + fileObj._id
                    };
                    Meteor.users.update(userId, {
                        $set: imagesURL
                    });
                }
            });
        });
    }
});
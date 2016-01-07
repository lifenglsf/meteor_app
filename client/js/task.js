"use strict";
Template.addTask.helpers({
    projectList: function() {
        return Project.find({});
    },
    userList: function() {
        return Meteor.users.find({});
    },
    moduleList:function(){
        return Module.find().fetch();
    }
});
Template.addTask.events({
    'submit #addTask': function(event, template) {
        event.target.disabled = true;
        var taskname = template.find('#taskname').value;
        var projectname = template.find('#projectname').value;
        var username = template.find('#username').value;
        var prestarttime = template.find('#prestarttime').value;
        var preendtime = template.find('#preendtime').value;
        var starttime = template.find('#starttime').value;
        var endtime = template.find('#endtime').value;
        var prehours = template.find('#prehours').value;
        var hours = template.find('#hours').value;
        var createdUser = Meteor.user().username;
        var modulename = template.find('#modulename').value;
        var task = Task.findOne({
            taskname: taskname
        });
        if (task) {
            alert(taskname + "任务已经存在，请更换任务名称");
            return false;
        }
        if (!taskname) {
            alert('任务名称不能为空');
            return false;
        }
        if (!modulename) {
            alert('模块不能为空');
            return false;
        }
        if (!projectname) {
            alert('项目名称不能为空');
            return false;
        }
        if (!username) {
            alert('制作人不能为空');
            return false;
        }
        if (!prestarttime) {
            alert('预期开始时间不能为空');
            return false;
        }
        if (!preendtime) {
            alert('预期结束时间不能为空');
            return false;
        }
        if (!starttime) {
            alert('实际开始时间不能为空');
            return false;
        }
        if (!endtime) {
            alert('实际开始时间不能为空');
            return false;
        }
        if (!prehours) {
            alert('预期工时不能为空');
            return false;
        }
        if (!hours) {
            alert('实际工时不能为空');
            return false;
        }
        var param = {
            taskname: taskname,
            projectname: projectname,
            username: username,
            prestarttime: prestarttime,
            preendtime: preendtime,
            starttime: starttime,
            endtime: endtime,
            prehours: prehours,
            hours: hours,
            createdAt: new Date(),
            createdUser: createdUser,
            modulename:modulename
        };
        var res = Task.insert(param);
        if (res) {
            alert('添加成功');
            template.find('#addTask').reset();
            event.target.disabled = false;
        } else {
            alert('添加失败');
            event.target.disabled = false;
        }
        return false;
    }
});
Template.addTask.rendered = function(template) {
    $('#prestarttime').datepicker({
        format: "yyyy-mm-dd",
        autoclose: true,
        weekStart: 1
    });
    $('#preendtime').datepicker({
        format: "yyyy-mm-dd",
        autoclose: true,
        weekStart: 1
    });
    $('#starttime').datepicker({
        format: "yyyy-mm-dd",
        autoclose: true,
        weekStart: 1
    });
    $('#endtime').datepicker({
        format: "yyyy-mm-dd",
        autoclose: true,
        weekStart: 1
    });
};
Template.editTask.rendered = function(template) {
    $('#prestarttime').datepicker({
        format: "yyyy-mm-dd",
        autoclose: true,
        weekStart: 1
    });
    $('#preendtime').datepicker({
        format: "yyyy-mm-dd",
        autoclose: true,
        weekStart: 1
    });
    $('#starttime').datepicker({
        format: "yyyy-mm-dd",
        autoclose: true,
        weekStart: 1
    });
    $('#endtime').datepicker({
        format: "yyyy-mm-dd",
        autoclose: true,
        weekStart: 1
    });
};
Template.listTask.helpers({
     taskList: function () {
        'use strict';
        var user = Meteor.user();
        if (user) {
            var username = user.username;
            return Task.find({
                username: username
            }).fetch();
        }

    }
});
Template.editTask.helpers({
    projectList: function() {
        var taskid = Session.get('taskid');
        var task = Task.findOne({_id:taskid}); 
        return Project.find({},{
            transform:function(doc){
            doc.isselect = false;
            if(doc.projectname == task.projectname){
                doc.isselect = true;
            }
            return doc;
        }
    });
    },
    userList: function() {
         var taskid = Session.get('taskid');
        var task = Task.findOne({_id:taskid}); 
        return Meteor.users.find({},{
            transform:function(doc){
            doc.isselect = false;
            if(doc.username == task.username){
                doc.isselect = true;
            }
            return doc;
        }
    });
    },
    moduleList:function(){
        var taskid = Session.get('taskid');
        var task = Task.findOne({_id:taskid}); 
        return Module.find({},{
            transform:function(doc){
                doc.isselect = false;
                if(doc.modulename == task.modulename){
                    doc.isselect = true;
                }
                return doc;
            }
        });
    },
    task:function(){
        var taskid = Session.get('taskid');
        var task = Task.findOne({_id:taskid});
        return task;
    }
});
Template.editTask.events({
    'submit #addTask': function(event, template) {
        event.target.disabled = true;
        var taskname = template.find('#taskname').value;
        var projectname = template.find('#projectname').value;
        var username = template.find('#username').value;
        var prestarttime = template.find('#prestarttime').value;
        var preendtime = template.find('#preendtime').value;
        var starttime = template.find('#starttime').value;
        var endtime = template.find('#endtime').value;
        var prehours = template.find('#prehours').value;
        var hours = template.find('#hours').value;
        var createdUser = Meteor.user().username;
        var modulename = template.find('#modulename').value;
        var task = Task.find({
            taskname: taskname
        }).count();
        if (task>1) {
            alert(taskname + "任务已经存在，请更换任务名称");
            return false;
        }
        if (!taskname) {
            alert('任务名称不能为空');
            return false;
        }
        if (!modulename) {
            alert('模块不能为空');
            return false;
        }
        if (!projectname) {
            alert('项目名称不能为空');
            return false;
        }
        if (!username) {
            alert('制作人不能为空');
            return false;
        }
        if (!prestarttime) {
            alert('预期开始时间不能为空');
            return false;
        }
        if (!preendtime) {
            alert('预期结束时间不能为空');
            return false;
        }
        if (!starttime) {
            alert('实际开始时间不能为空');
            return false;
        }
        if (!endtime) {
            alert('实际开始时间不能为空');
            return false;
        }
        if (!prehours) {
            alert('预期工时不能为空');
            return false;
        }
        if (!hours) {
            alert('实际工时不能为空');
            return false;
        }

        var param = {
            taskname: taskname,
            projectname: projectname,
            username: username,
            prestarttime: prestarttime,
            preendtime: preendtime,
            starttime: starttime,
            endtime: endtime,
            prehours: prehours,
            hours: hours,
            createdUser: createdUser,
            modulename:modulename
        };
        var taskid = Session.get('taskid');
        var res = Task.update({_id:taskid},{$set:param});
        if (res) {
            alert('编辑成功');
            template.find('#addTask').reset();
            event.target.disabled = false;
        } else {
            alert('编辑失败');
            event.target.disabled = false;
        }
        return false;
    }
});
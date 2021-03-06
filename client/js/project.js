Template.listProject.helpers({
    tasks: function() {
        var r = [];
        var user = Meteor.user();
        if (user) {
            var username = user.username;
            r = Task.find({
                username: username
            }, {
                transform: function(obj) {
                    obj.prehours = parseInt(obj.prehours);
                    obj.hours = parseInt(obj.hours);
                    return obj;
                }
            }).fetch();
        }
        return r;
    },
    username: function() {
        var user = Meteor.user();
        if (user) {
            return user.username;
        }
        return "";

    },
    pretotal: function() {
        var pretotal = 0;
        var user = Meteor.user();
        if (user) {
            var username = user.username;
            task = Task.find({
                username: username
            }, {
                pretotal: 1
            }).fetch();
            _.each(task, function(ele) {
                pretotal += parseInt(ele.prehours);
            })
        }
        return pretotal;

    },
    total: function() {
        var total = 0;
        var user = Meteor.user();
        if (user) {
            var username = user.username;
            task = Task.find({
                username: username
            }, {
                total: 1
            }).fetch();
            _.each(task, function(ele) {
                total += parseInt(ele.hours);
            })
        }
        return total;

    }

});
Template.addProject.events({
    'click #submit': function(event, template) {
        event.target.disabled = true;
        var projectname = template.find('#projectname').value;
        var pro = Project.findOne({
            projectname: projectname
        });
        var is_exist = false;
        if (pro) {
            is_exist = true;
        }
        if (is_exist == true) {
            alert(projectname + '项目已存在');
            event.target.disabled = false;
            return false;
        }
        var res = Project.insert({
            "projectname": projectname,
            "createAt": new Date
        });
        if (res) {
            alert('添加成功');
            template.find('#projectname').value = "";
            event.target.disabled = false;
        } else {
            alert('添加失败');
            event.target.disabled = false;
        }

    }
});
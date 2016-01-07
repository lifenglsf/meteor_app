/*jshint strict: true*/
/*jshint globals: true, devel: true, node: true, jquery: true*/
/*global $, jQuery, ko, moment, console, toastr, accounting, _,Template,Meteor,Router,Accounts,Module */
Template.addModule.helpers({
    projectlist: function () {
        'use strict';
        return Project.find({}).fetch();
    }
});
Template.editModule.helpers({
    projectlist: function () {
        'use strict';
        var id = Session.get('moduleid');
        var currentModule = Module.findOne({
            _id: id
        });
        console.log(currentModule);
        return Project.find({}, {
            transform: function (doc) {
                doc.isselect = false;
                if (doc.projectname === currentModule.project) {
                    doc.isselect = true;
                }
                return doc;
            }
        }).fetch();

    }

});
Template.listModule.helpers({
    modulelist: function () {
        'use strict';
        var obj = Module.find({}, {
            transform: function (doc) {
                doc.opertations = doc.operationlist.join(',');
                return doc;

            }
        }).fetch();
        return obj;
    }
});
Template.addModule.events({
    'click #add': function (event, template) {
        'use strict';
        event.preventDefault();
        var olist = template.findAll('.olist');
        var len = $(olist).length;
        var html = '<div class="col-sm-10 olist col-sm-offset-2"><input type="text" name="opname[]" id="opname' + (len + 1) + '" value="" placeholder="请输入操作名称" required class="form-control"></div>';
        $(template.find('#addBtnDiv')).before($(html));
    },
    'click #addModuleBtn': function (event, template) {
        'use strict';
        event.preventDefault();
        event.target.disabled = true;
        var modulename = template.find('#modulename').value;
        if ($.trim('modulename') === '') {
            alert('模块名称不能为空');
        }
        var moduleenname = template.find('#moduleenname').value;
        if ($.trim('moduleenname') === '') {
            alert('模块名称不能为空');
        }
        var olist = $(template.findAll('.olist'));
        var opertations = [];
        $.each(olist, function (index, ele) {
            var obj = $(ele).find('input');
            opertations.push(obj.val());
        });
        var role = {};
        role[moduleenname] = opertations;
        var superuser = Meteor.users.find({
            issuper: 1
        }).fetch();

        var param = {
            modulename: modulename,
            operationlist: opertations,
            moduleenname: moduleenname,
            createdAt: new Date()
        };
        var mo = Module.findOne({
            modulename: modulename
        });
        if (mo) {
            alert(modulename + '模块已存在');
            return false;
        }

        var res = Module.insert(param);
        if (res) {
            $.each(superuser, function (i, v) {
                var id = v._id;
                var newrole = v.role;
                newrole[moduleenname] = opertations;
                Meteor.users.update({
                    _id: v._id
                }, {
                    $set: {
                        role: newrole
                    }
                });
            });
            alert('添加成功');
            template.find('#addModule').reset();
            event.target.disabled = false;
        } else {
            alert('添加失败');
            event.target.disabled = false;
        }
        return false;
    }
});

Template.editModule.events({
    'click #add': function (event, template) {
        'use strict';
        event.preventDefault();
        var olist = template.findAll('.olist');
        var len = $(olist).length;
        var html = '<div class="col-sm-10 olist col-sm-offset-2"><input type="text" name="opname[]" id="opname' + len + '" value="" placeholder="请输入操作名称" required class="form-control"></div>';
        $(template.find('#addBtnDiv')).before($(html));
    },
    'click .del-op': function (event, template) {
        'use strict';
        var obj = event.target;
        $(obj).parent('div').remove();
    },
    'click #addModuleBtn': function (event, template) {
        'use strict';
        event.preventDefault();
        event.target.disabled = true;
        var modulename = template.find('#modulename').value;
        if ($.trim(modulename) === '') {
            alert('模块名称不能为空');
        }
         var project = template.find('#proejct').value;
        if ($.trim(project) === '') {
            alert('项目名称不能为空');
        }
        var obj = $(event.target);
        var id = obj.data('id');
        var moduleenname = template.find('#moduleenname').value;
        if ($.trim(moduleenname) === '') {
            alert('模块名称不能为空');
        }
        var olist = $(template.findAll('.olist'));
        var operations = [];
        $.each(olist, function (index, ele) {
            var obj = $(ele).find('input');
            operations.push(obj.val());
        });
        var mo = Module.findOne({
            modulename: modulename,
            _id: {
                '#ne': id
            }
        });
        if (mo) {
            alert(modulename + '模块已存在');
            return false;
        }

        var param = {
            '$set': {
                modulename: modulename,
                moduleenname: moduleenname,
                operationlist: operations,
                project:project
            }
        };
        var res = Module.update(id, param);
        if (res) {
            var user = Meteor.user();
            var role = user.role;
            role[moduleenname] = operations;
            Meteor.users.update({
                _id: Meteor.userId()
            }, {
                '$set': {
                    role: role
                }
            });
            var superuser = Meteor.users.find({
                issuper: 1
            }).fetch();
            $.each(superuser, function (i, v) {
                var id = v._id;
                var newrole = v.role;
                console.log(moduleenname);
                newrole[moduleenname] = operations;
                Meteor.users.update({
                    _id: v._id
                }, {
                    $set: {
                        role: newrole
                    }
                });
            });
            alert('添加成功');
            //template.find('#addModule').reset();
            event.target.disabled = false;
        } else {
            alert('添加失败');
            event.target.disabled = false;
        }
        return false;
    }
});
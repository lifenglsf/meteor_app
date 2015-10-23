"use strict";
Template.addRole.helpers({
    'modulelist': function() {
        var user = Meteor.users.findOne({
            _id: Meteor.userId()
        });

        var userrole = user['role'];
        var userrolemodule = _.keys(userrole);
        var module = Module.find({
            /* 'moduleenname': {
                '$in': userrolemodule
            }*/
        }, {
            transform:function(doc) {
                var tmplist = '[';
                var operation = doc.operationlist;
                var l = operation.length;
                var modulename = doc.moduleenname;
                var tmpuserop = userrole[modulename];
                var tops = {};
                _.each(operation, function(val, i) {
                   var  isexists = _.indexOf(tmpuserop, val);

                    if (i == (l - 1)) {
                        if (isexists == -1) {
                            tmplist += '{"values":"' + val + '","isex":false}]';
                        } else {
                            tmplist += '{"values":"' + val + '","isex":true}]';
                        }
                    } else {
                        if (isexists == -1) {
                            tmplist += '{"values":"' + val + '","isex":false},';
                        } else {
                            tmplist += '{"values":"' + val + '","isex":true},';
                        }
                    }
                    //tops[i] = tmplist;
                });
                tops = JSON.parse(tmplist);
                doc.operations = tops;
                return doc;
            }
        }).fetch();
        return module;
    }
});

Template.createSuperUser.events({
    'click button': function(event, template) {
        event.preventDefault();
        event.target.disabled = true;
        var module = Module.find({}).fetch();
        var role = {};
        $.each(module, function(i, v) {
            role[v.moduleenname] = v.operationlist;
        });
        Accounts.createUser({
            email: template.find("#email").value,
            username: template.find("#username").value,
            password: template.find("#password").value

        }, function(error) {
            if (error) {
                alert(error);
                // Display the user creation error to the user however you want
            } else {
                var r = Meteor.users.update({
                    _id: Meteor.userId()
                }, {
                    '$set': {
                        'role': role,
                        'issuper': 1
                    }
                });
                alert('注册成功');
                Router.go('/');
            }
        });
    }
});
Template.addRole.events({
    'click td input': function(event, template) {
        var targetobj = $(event.target);
        var ischecked = targetobj.prop('checked');
        var hasCheckAllClass = targetobj.hasClass('checkAll');
        if (hasCheckAllClass) { //全选/反选
            var opcobj = targetobj.parent('td').siblings('td').find('input');
            if (ischecked) {
                opcobj.prop('checked', true);
            } else {
                opcobj.prop('checked', false);
            }

        } else {

        }

    },
    'click #submit': function(event, template) {
        event.target.disabled = true;
        var tr = $(template.findAll('tbody tr'));
        var operation = {};
        $.each(tr, function(index, ele) {
            var modulename = $(ele).find('input[type="hidden"]').val();
            var tmpOperation = [];
            var cbox = $(ele).find('input:checked');
            var length = cbox.length;
            if (cbox.length > 0) {
                $.each(cbox, function(index, obj) {
                    var val = $(obj).val();
                    if (val != 'on') {
                        tmpOperation.push(val);
                    }

                    //console.log(tmpOperation)
                })
            }
            operation[modulename] = tmpOperation;
        });
        if (operation.length == 0) {
            alert('至少选择一个操作权限');
            return;
        }

        var r = Meteor.users.update({
            _id: Meteor.userId()
        }, {
            '$set': {
                'role': operation
            }
        });
        if (r) {
            alert('添加权限成功');
        } else {
            alert('添加权限失败');
        }
        event.target.disabled = false;
    }
});
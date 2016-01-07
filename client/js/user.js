/*jshint strict: true*/
/*jshint globals: true, devel: true, node: true, jquery: true*//*global $, jQuery, ko, moment, console, toastr, accounting, _,Template,Meteor,Router,Accounts,Module */
Template.addRole.helpers({
    'modulelist': function () {
        'use strict';
        var userId = Session.get('userId');
        var user = Meteor.users.findOne({
            '_id': userId
        });
        var userrole = {};
        userrole = user.role;
        var userrolemodule = _.keys(userrole);
        var module = Module.find({
            /* 'moduleenname': {
                '$in': userrolemodule
            }*/
        }, {
            transform : function (doc) {
                var tmplist = '[';
                var operation = doc.operationlist;
                var l = operation.length;
                var modulename = doc.moduleenname;
                var tmpuserop = userrole[modulename];
                var tops = {};
                _.each(operation, function (val, i) {
                   var isexists = _.indexOf(tmpuserop, val);

                    if (i === (l - 1)) {
                        if (isexists === -1) {
                            tmplist += '{"values":"' + val + '","isex":false}]';
                        } else {
                            tmplist += '{"values":"' + val + '","isex":true}]';
                        }
                    } else {
                        if (isexists === -1) {
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

Template.addUser.helpers({
    'modulelist': function () {
        'use strict';
        var module = Module.find({
            /* 'moduleenname': {
                '$in': userrolemodule
            }*/
        }, {
            transform : function (doc) {
                var tmplist = '[';
                var operation = doc.operationlist;
                var l = operation.length;
                var modulename = doc.moduleenname;
                var tmpuserop = []
                var tops = {};
                _.each(operation, function (val, i) {

                    if (i === (l - 1)) {
                            tmplist += '{"values":"' + val + '","isex":false}]';
                        
                    } else {
                            tmplist += '{"values":"' + val + '","isex":false},';
                        
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
Template.addUser.events({
    'click td input': function(event, template) {
        'use strict';
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
    'click #add-user-btn':function(event,template){
        event.preventDefault();
        event.target.disabled = true;
        var tr = $(template.findAll('tbody tr'));
        var operation = {};
        $.each(tr, function(index, ele) {
            var modulename = $(ele).find('input[type="hidden"]').val();
            var tmpOperation = [];
            var cbox = $(ele).find('input:checked');
            var length = cbox.length;
            if (cbox.length > 0) {
                $.each(cbox, function (index, obj) {
                    var val = $(obj).val();
                    if (val !== 'on') {
                        tmpOperation.push(val);
                    }

                    //console.log(tmpOperation)
                });
            }
            operation[modulename] = tmpOperation;
        });
        param={
            username:template.find("#username").value,
            email: template.find("#email").value,
             password: template.find("#password").value,
             role:operation
        }
        Accounts.createUser(param
        , function(error) {
            if (error) {
                alert(error);
                // Display the user creation error to the user however you want
            } else {
                var r = Meteor.users.update({
                    _id: Meteor.userId()
                }, {
                    '$set': {
                        'role': operation,
                    }
                });
                alert('添加用户成功');
                template.find('#addUser').reset();
            }
        });
        event.target.disabled = false;
    }
})

Template.createSuperUser.events({
    'click button': function(event, template) {
        'use strict';
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
        'use strict';
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
        'use strict';
        event.target.disabled = true;
        var tr = $(template.findAll('tbody tr'));
        var operation = {};
        $.each(tr, function(index, ele) {
            var modulename = $(ele).find('input[type="hidden"]').val();
            var tmpOperation = [];
            var cbox = $(ele).find('input:checked');
            var length = cbox.length;
            if (cbox.length > 0) {
                $.each(cbox, function (index, obj) {
                    var val = $(obj).val();
                    if (val !== 'on') {
                        tmpOperation.push(val);
                    }

                    //console.log(tmpOperation)
                });
            }
            operation[modulename] = tmpOperation;
        });
        if (operation.length === 0) {
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

Template.listUser.helpers({
    userList:function(){
        return Meteor.users.find({},{
            transform:function(doc){
                roles = '';
                _.each(doc.role,function(ele,index){
                    if(!_.isEmpty(ele)){
                        if(roles !=''){
                            roles+='=='+index+':'+ele.toString();
                        }else{
                            roles+=index+':'+ele.toString();
                        }
                    }
                    
                })
                doc.roles = roles;
                return doc;
            }
        })
    }
})
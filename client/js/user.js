Template.addRole.helpers({
    'modulelist': function() {
        user = Meteor.users.findOne({
            _id: Meteor.userId()
        });

        userrole = user['role'];
        userrolemodule = _.keys(userrole);
        module = Module.find({
           /* 'moduleenname': {
                '$in': userrolemodule
            }*/
        }, {
            transform(doc) {
                tmplist = '[';
                operation = doc.operationlist;
                l = operation.length;
                modulename = doc.moduleenname;
                tmpuserop = userrole[modulename];
                tops = {};
                _.each(operation, function(val, i) {
                    isexists = _.indexOf(tmpuserop, val);

                    if (i == (l - 1)) {
                        if (isexists == -1) {
                                tmplist += '{"values":"'+val+'","isex":false}]';
                        } else {
                            tmplist += '{"values":"'+val+'","isex":true}]';
                        }
                    } else {
                        if (isexists == -1) {
                                tmplist += '{"values":"'+val+'","isex":false},';
                        } else {
                            tmplist += '{"values":"'+val+'","isex":true},';
                        }
                    }
                    //tops[i] = tmplist;
                })
                tops = JSON.parse(tmplist);
                doc.operations = tops;
                return doc;
            }
        }).fetch();
        return module;
    }
})

Template.createSuperUser.events({
    'click button':function(event,template){
        event.preventDefault();
        event.target.disabled=true;
        module = Module.find({}).fetch();
        role = {};
        $.each(module,function(i,v){
            role[v.moduleenname] =v.operationlist; 
        })
        Accounts.createUser({
          email:template.find("#email").value,
          username: template.find("#username").value,
          password: template.find("#password").value,
          
        }, function(error) {
          if (error) {
            alert(error);
            // Display the user creation error to the user however you want
          }else{
             r = Meteor.users.update({
                _id: Meteor.userId()
            }, {
                '$set': {
                    'role': role,
                    'issuper' :1
                }
            });
            alert('注册成功');
            Router.go('/');
          }
        });
    }
})
Template.addRole.events({
    'click td input': function(event, template) {
        targetobj = $(event.target);
        ischecked = targetobj.prop('checked');
        hasCheckAllClass = targetobj.hasClass('checkAll');
        console.log(targetobj.hasClass('checkAll'))
        console.log(targetobj.prop('checked'))
        console.log(targetobj.val())
        if (hasCheckAllClass) { //全选/反选
            opcobj = targetobj.parent('td').siblings('td').find('input');
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
        tr = $(template.findAll('tbody tr'));
        operation = {};
        $.each(tr, function(index, ele) {
            modulename = $(ele).find('input[type="hidden"]').val();
            tmpOperation = [];
            cbox = $(ele).find('input:checked');
            length = cbox.length;
            if (cbox.length > 0) {
                $.each(cbox, function(index, obj) {
                    val = $(obj).val();
                    if(val !='on'){
                        tmpOperation.push(val);
                    }
                    
                    //console.log(tmpOperation)
                })
            }
            console.log(tmpOperation)
            operation[modulename] = tmpOperation;
            console.log(operation);
        })
        console.log(operation.length);
        if (operation.length == 0) {
            alert('至少选择一个操作权限');
            return;
        }

        r = Meteor.users.update({
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
})


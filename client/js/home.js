/*jshint strict: true*/
/*jshint globals: true, devel: true, node: true, jquery: true*//*global $, jQuery, ko, moment, console, toastr, accounting, _,Template,Meteor,Router,Accounts */
Template.signupForm.events({
    "submit #signup-form": function (event, template) {
        'use strict';
        event.preventDefault();
        Accounts.createUser({
            email: template.find("#email").value,
            username: template.find("#username").value,
            password: template.find("#password").value
        }, function (error) {
            if (error) {
                alert(error);
                // Display the user creation error to the user however you want
            } else {
                alert('注册成功');
                Router.go('/');
            }
        });
    }
});

Template.loginForm.events({
    "submit #login-form": function (event, template) {
        'use strict';
        event.preventDefault();
        Meteor.loginWithPassword(
            template.find("#login-username").value,
            template.find("#login-password").value,
            function (error) {
                if (error) {
                    alert('用户名不存在,请先注册');
                }
            }
        );
    }
});

Template.loginStatusBar.helpers({
    username: function () {
        'use strict';
        var user = Meteor.user();
        if (user) {
            return user.username;
        }
        return "";

    },
    isLoginIn: function () {
        'use strict';
        return isLoginIn();
    }
});

Template.loginStatusBar.events({
    'click #logout': function () {
        'use strict';
        Meteor.logout();
    }
});

var isLoginIn = function () {
    'use strict';
    if (Meteor.userId()) {
        return true;
    } else {
        return false;
    }
};
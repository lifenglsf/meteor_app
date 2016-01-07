/*jshint strict: true*/
/*jshint globals: true, devel: true, node: true, jquery: true*//*global $, jQuery, ko, moment, console, toastr, accounting, _,Template,Meteor,Router,Accounts */
Meteor.subscribe('users');
Meteor.subscribe('tasks');
Meteor.subscribe('projects');
Meteor.subscribe('modules');
Meteor.subscribe('bugs');
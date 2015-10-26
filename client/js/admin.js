"use strict";
Template.adminIndex.events({
    'click #addProject': function () {
        Router.go('add-project');
    },
    'click #addBug': function () {
        Router.go('add-bug');
    },
    'click #addTask': function () {
        Router.go('add-task');
    },
    'click #taskList': function () {
        Router.go('task-list');
    }
});
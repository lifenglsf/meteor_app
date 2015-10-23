"use strict";
Meteor.publish('users', function() {
    return Meteor.users.find({}, {
        'fields': {
            id: 1,
            role: 1,
            emails: 1,
            username: 1,
            issuper: 1
        }
    });
});
Meteor.publish('tasks', function() {
    return Task.find({});
});
Meteor.publish('projects', function() {
    return Project.find({});
});
Meteor.publish('bugs', function() {
    return Bug.find({});
});
Meteor.publish('modules', function() {
    return Module.find({});
});
/*jshint strict: true*/
/*jshint globals: true, devel: true, node: true, jquery: true*//*global $, jQuery, ko, moment, console, toastr, accounting, _,Template,Meteor,Router,Accounts,Task,Bug,Project,Module */
Meteor.publish('users', function() {
    'use strict';
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
    'use strict';
    return Task.find({});
});
Meteor.publish('projects', function() {
    'use strict';
    return Project.find({});
});
Meteor.publish('bugs', function() {
    'use strict';
    return Bug.find({});
});
Meteor.publish('modules', function() {
    'use strict';
    return Module.find({});
});
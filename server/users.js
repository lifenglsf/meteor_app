/*jshint strict: true*/
/*jshint globals: true, devel: true, node: true, jquery: true*//*global $, jQuery, ko, moment, console, toastr, accounting, _,Template,Meteor,Router,Accounts */
Meteor.users.allow({
    update: function (userId, docs, fields, modifier) {
        'use strict';
        return true;
    },
    remove:function(userId,doc,fields,modifier){
        'use strict';
        return true;
    },
    insert:function(userId,docs,fields,modifier){
    	'use strict';
    	return true;
    }
});
Accounts.onCreateUser(function(options, user) {
	console.log(options);
	if(options.role){
		user.role = options.role
	}
	return user;
    
});
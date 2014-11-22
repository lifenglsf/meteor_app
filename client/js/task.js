Template.addTask.helpers({
	projectList:function(){
		return Project.find({});
	},
	userList:function(){
		return Meteor.users.find({});
	}
});
Template.addTask.events({
	'click #addTaskSubmit':function (event,template) {
		event.target.disabled=true;
		taskname = template.find('#taskname').value;
		projectname = template.find('#projectname').value;
		username = template.find('#username').value;
		prestarttime = template.find('#prestarttime').value;
		preendtime = template.find('#preendtime').value;
		starttime = template.find('#starttime').value;
		endtime = template.find('#endtime').value;
		prehours = template.find('#prehours').value;
		hours = template.find('#hours').value;
		createdUser = Meteor.user().username;
		param = {
			taskname:taskname,
			projectname:projectname,
			username:username,
			prestarttime:prestarttime,
			preendtime:preendtime,
			starttime:starttime,
			endtime:endtime,
			prehours:prehours,
			hours:hours,
			createdAt:new Date(),
			createdUser:createdUser
		}
		res = Task.insert(param);
		if(res){
			alert('添加成功');
			template.find('#addTask').reset();
			event.target.disabled=false;
		}else{
			alert('添加失败');
			event.target.disabled=false;
		}
		return false;
	}
});
Template.addTask.rendered = function(template){
	$('#prestarttime').datepicker({
		format:"yyyy-mm-dd",
		autoclose:true,
		weekStart:1
	});
	$('#preendtime').datepicker({
		format:"yyyy-mm-dd",
		autoclose:true,
		weekStart:1,
	});
	$('#starttime').datepicker({
		format:"yyyy-mm-dd",
		autoclose:true,
		weekStart:1
	});
	$('#endtime').datepicker({
		format:"yyyy-mm-dd",
		autoclose:true,
		weekStart:1
	});
}
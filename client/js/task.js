Template.addTask.helpers({
	projectList:function(){
		return Project.find({});
	},
	userList:function(){
		return Meteor.users.find({});
	}
});
Template.addTask.events({
	'submit #addTask':function (event,template) {
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
		task = Task.findOne({taskname:taskname});
		if(task){
			alert(taskname+"任务已经存在，请更换任务名称");
			return false;
		}
		if(!taskname){
			alert('任务名称不能为空');
			return false;
		}
		if(!projectname){
			alert('项目名称不能为空');
			return false;
		}
		if(!username){
			alert('制作人不能为空');
			return false;
		}
		if(!prestarttime){
			alert('预期开始时间不能为空');
			return false;
		}
		if(!preendtime){
			alert('预期结束时间不能为空');
			return false;
		}
		if(!starttime){
			alert('实际开始时间不能为空');
			return false;
		}
		if(!endtime){
			alert('实际开始时间不能为空');
			return false;
		}
		if(!prehours){
			alert('预期工时不能为空');
			return false;
		}
		if(!hours){
			alert('实际工时不能为空');
			return false;
		}
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

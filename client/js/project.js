Template.projectList.helpers({
	tasks:function(){
		r = [];
		user = Meteor.user();
		if(user){
			username = user.username;
			r =  Task.find({username:username},{transform:function(obj){
				obj.prehours = parseInt(obj.prehours);
				obj.hours = parseInt(obj.hours);
				return obj;
			}
			}).fetch();
		}
		return r;
	},
	username:function(){
			user = Meteor.user();
			if(user){
				return user.username;
			}
			return "";
		
	},
	pretotal:function(){
		pretotal = 0;
		user = Meteor.user();
		if(user){
			username = user.username;
			task = Task.find({username:username},{pretotal:1}).fetch();
			_.each(task,function(ele){
				pretotal += parseInt(ele.prehours);
			})
		}
		return pretotal;

	},
	total:function(){
                total = 0;
                user = Meteor.user();
                if(user){
                        username = user.username;
                        task = Task.find({username:username},{total:1}).fetch();
                        _.each(task,function(ele){
                                total += parseInt(ele.hours);
                        })
                }
                return pretotal;

        }
	
})
Template.addProject.events({
	'click #submit':function(event,template){
		event.target.disabled=true;
		projectname = template.find('#projectname').value;
		pro = Project.findOne({projectname:projectname});
		is_exist = false;
		if(pro){
			is_exist = true;
		}
		if(is_exist == true){
			alert(projectname+'项目已存在');
			event.target.disabled=false;
			return false;
		}
		res = Project.insert({"projectname":projectname,"createAt":new Date});
		if(res){
			alert('添加成功');
			template.find('#projectname').value = "";
			event.target.disabled=false;
		}else{
			alert('添加失败');
			event.target.disabled=false;
		}
		
	}
})

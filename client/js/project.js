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
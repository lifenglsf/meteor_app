Template.listModule.helpers({
	'modulelist':function(){
		obj = Module.find({},
			{transform(doc){
			doc.opertations = doc.operationlist.join(',');
			return doc;

		}
		}).fetch();
		return obj;
	}
})
Template.addModule.events({
	'click #add':function(event,template){
		olist = template.findAll('.olist');
		console.log(olist)
		len = $(olist).length;
		html='<div class="col-sm-10 olist col-sm-offset-2"><input type="text" name="opname[]" id="opname'+(len+1)+'" value="" placeholder="请输入操作名称" required class="form-control"></div>';
		$(template.find('#addBtnDiv')).before($(html));
	},
	'click #addModuleBtn':function(event,template){
		event.target.disabled=true;
		modulename = template.find('#modulename').value;
		if($.trim('modulename') == ''){
			alert('模块名称不能为空');
		}
		moduleenname = template.find('#moduleenname').value;
		if($.trim('moduleenname') == ''){
			alert('模块名称不能为空');
		}
		olist = $(template.findAll('.olist'));
		opertations = [];
		$.each(olist,function(index,ele){
			obj = $(ele).find('input');
			opertations.push(obj.val())
		});
		param = {
			modulename:modulename,
			operationlist:opertations,
			moduleenname:moduleenname,
			createdAt:new Date()
		}
		mo = Module.findOne({'modulename':modulename});
		if(mo){
			alert(modulename+'模块已存在');
			return false;
		}
		res = Module.insert(param);
		if(res){
			alert('添加成功');
			template.find('#addModule').reset();
			event.target.disabled=false;
		}else{
			alert('添加失败');
			event.target.disabled=false;
		}
		return false;
	}
})

Template.editModule.events({
	'click #add':function(event,template){
		olist = template.findAll('.olist');
		console.log(olist)
		len = $(olist).length;
		html='<div class="col-sm-10 olist col-sm-offset-2"><input type="text" name="opname[]" id="opname'+len+'" value="" placeholder="请输入操作名称" required class="form-control"></div>';
		$(template.find('#addBtnDiv')).before($(html));
	},
	'click .del-btn':function(event,template){
		obj = event.target;
		$(obj).parent('div').remove();
	},
	'click #addModuleBtn':function(event,template){
		event.target.disabled=true;
		modulename = template.find('#modulename').value;
		if($.trim('modulename') == ''){
			alert('模块名称不能为空');
		}
		obj = $(event.target);
		id = obj.data('id');
		moduleenname = template.find('#moduleenname').value;
		if($.trim('moduleenname') == ''){
			alert('模块名称不能为空');
		}
		olist = $(template.findAll('.olist'));
		opertations = [];
		$.each(olist,function(index,ele){
			obj = $(ele).find('input');
			opertations.push(obj.val())
		});
		mo = Module.findOne({modulename:modulename,_id:{'#ne':id}});
		if(mo){
			alert(modulename+'模块已存在');
			return false;
		}
		param = {
			'$set':{
				modulename:modulename,
				moduleenname:moduleenname,
				operationlist:opertations,
			}
		}
		res = Module.update(id,param);
		if(res){
			alert('添加成功');
			//template.find('#addModule').reset();
			event.target.disabled=false;
		}else{
			alert('添加失败');
			event.target.disabled=false;
		}
		return false;
	}
})
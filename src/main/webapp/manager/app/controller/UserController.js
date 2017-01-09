Ext.define('KLKK.controller.UserController', {
	extend : 'KLKK.controller.MainController',
	views : [ 'userView.UserFormSearch', 'userView.UserGrid','userView.UserGridEditWin' ],
	stores : [ 'userStore.UserStore' ],
	models : [],
	refs : [// 相当于一个映射,这样就可以在控制层方便的通过geter取得相应的对象了
	{
		ref : 'managerpanel',
		selector : 'managerpanel'
	}, {
		ref : 'userpanel',
		selector : 'managerpanel #southPanel #userPanel'
	},{
		ref : 'usergrideditwin',
		selector : 'usergrideditwin'
	} ],
	init : function() {
		var me = this;
		this.control({
			'managerpanel #southPanel #userPanel #userGrid' : {
				afterrender : me.userGridAfterrender,
				select : me.userGridSelect,
				deselect : me.userGridSelect,
				itemdblclick : me.userGriddbClcik
			},
			'managerpanel #southPanel #userPanel #add' : {
				click: me.userGridAdd
			},
			'managerpanel #southPanel #userPanel #userGridEdit' : {
				click: me.userGridEdit
			},
			'managerpanel #southPanel #userPanel #searchAllUser':{
				click: me.searchAllUser
			},
			'managerpanel #southPanel #userPanel #resetAllUser':{
				click: me.resetAllUser
			},
			'managerpanel #southPanel #userPanel #userGridDelete':{
				click: me.userGridDelete
			},
			'managerpanel #southPanel #userPanel #setManager':{
				click: me.setManager
			},
			'managerpanel #southPanel #userPanel #cancaleManager':{
				click: me.cancaleManager
			},
			'usergrideditwin #userGridEditPictureUpload':{
				change: me.userGridEditPictureUpload
			},
			'usergrideditwin #userEditSave':{
				click: me.userEditSave
			},
			'usergrideditwin': {
				close: me.userEditWinClose
			}
		});
	},
	userGridAfterrender : function(self, eOpts) {
		var me = this;
		var store = self.getStore();
		store.on('beforeload', function(store, options) {
			var new_params = me.getUserpanel().down("#userFormSearch")
					.getForm().getValues();
			Ext.apply(store.proxy.extraParams, new_params);
		});
//		store.load();
	},
	userGridSelect : function(self, record, index, eOpts) {
		var me = this;
		var selection = self.getSelection();
		var userGridEdit = me.getUserpanel().down("#userGridEdit");
		var userGridDelete = me.getUserpanel().down("#userGridDelete");
		var setManager = me.getUserpanel().down("#setManager");
		var cancaleManager = me.getUserpanel().down("#cancaleManager");
		if (!userGridEdit || !userGridDelete || !setManager || !cancaleManager) {
			return;
		}
		if (selection.length == 0) {
			userGridEdit.disable();
			userGridDelete.disable();
			setManager.disable();
			cancaleManager.disable();
		} else if (selection.length == 1) {
			userGridEdit.enable();
			userGridDelete.enable();
			setManager.enable();
			cancaleManager.enable();
		} else if (selection.length > 1) {
			userGridEdit.disable();
			userGridDelete.enable();
			setManager.enable();
			cancaleManager.enable();
		}
		if (me.getUserpanel().down("#userGrid").getSelectionModel().isSelected(
				record)) {
			var path = "无图片";
			if (record.get("image.name")) {
				path = '/klkk/image/upload/' + record.get("image.name");
				me.getManagerpanel().down("#picturePath").setSrc(path);
			} else {
				me.getManagerpanel().down("#picturePath").setSrc("");
			}
			me.getManagerpanel().down("#pictureText").setText(path);
		} else {
			me.getManagerpanel().down("#picturePath").setSrc("");
			me.getManagerpanel().down("#pictureText").setText("");
		}
	},
	userGriddbClcik: function(self, record, item, index, e, eOpts){
		self.select(record);
		this.userGridEdit(self, e, eOpts);
	},
	userGridAdd: function(self, e, eOpts){
		var me = this;
		var mainController = this.getApplication().getMainControllerController();
		if (!mainController.user.id){
			Ext.MessageBox.alert('提示', '不能获取当前操作用户的ID，请刷新页面重试');
			return;
		}
		me.getUsergrideditwin().down("#userEditForm").getForm().reset();
		me.getUsergrideditwin().down("#userGridEditPictureForm").getForm().reset();
		me.getUsergrideditwin().down("#userGridEditPictureForm").down("#userGridEditManagerId").setValue(mainController.user.id);
		me.getUsergrideditwin().show();
	},
	userGridEdit: function(self, e, eOpts){
		var me = this;
		var mainController = this.getApplication().getMainControllerController();
		var gridSelection = me.getUserpanel().down("#userGrid").getSelectionModel().getSelection();
		
		if (gridSelection && gridSelection.length == 1){
			me.getUsergrideditwin().down("#userEditForm").getForm().reset();
			var path = "无图片";
			if (gridSelection[0].get("image.name")){
				path = '/klkk/image/upload/' + gridSelection[0].get("image.name");
				me.getUsergrideditwin().down("#userGridEditPicturePath").setSrc(path);
			} else {
				me.getUsergrideditwin().down("#userGridEditPicturePath").setSrc("");
			}
			me.getUsergrideditwin().down("#userGridEditManagerId").setValue(mainController.user.id);
			me.getUsergrideditwin().down("#userEditForm").loadRecord(gridSelection[0]);
			me.getUsergrideditwin().show();
		} else {
			Ext.MessageBox.alert('提示', '请选择一条记录');
		}
	},
	searchAllUser:function (self, e, eOpts){
		this.getUserpanel().down("#userGrid").getStore().load();
	},
	resetAllUser: function (self, e, eOpts){
		this.getUserpanel().down("#userFormSearch").getForm().reset();
	},
	userGridDelete: function(self, e, eOpts){
		var me = this;
		var gridSelection = me.getUserpanel().down("#userGrid").getSelectionModel().getSelection();
		if (gridSelection.length == 0){
			Ext.MessageBox.alert('提示', '请选择一条记录');
		} else {
			var ids = [];
			Ext.Array.each(gridSelection, function(record, index, countriesItSelf) {
				ids.push(record.get("id"));
			});
			if (ids.length == 0){
				Ext.MessageBox.alert('提示', '不能正确获取到删除ID信息');
			} else {
				Ext.Msg.confirm('', "确定要删除选中的条目", function(btn) {
					if (btn == 'yes') {
						Ext.Msg.wait('正在处理数据，请稍候','提示');
						Ext.Ajax.request({
							url : '/klkk/manage/user',
							method : 'DELETE',
							contentType : "application/json",
						    jsonData:{ids: ids},
							waitMsg: '正在提交，请等待...',
							success : function(response) {
								Ext.Msg.hide();
								var result = Ext.decode(response.responseText);
								if (result.status){
									me.getUserpanel().down("#userGrid").getStore().load();
								} else {
									Ext.MessageBox.alert('提示', result.message);
								}
							},
							failure : function() {
								Ext.Msg.hide();
								Ext.MessageBox.alert('提示', '删除失败，可能是网络异常或服务器异常');
							}
						});
					}
				});
			}
			
		}
	},
	setManager: function(self, e, eOpts){
		this.updateUserManager(true);
	},
	cancaleManager: function(self, e, eOpts){
		this.updateUserManager(false);
	},
	updateUserManager: function(isManager){
		var me = this;
		var grid = me.getUserpanel().down("#userGrid");
		var gridSelection = grid.getSelectionModel().getSelection();
		if (gridSelection.length == 0){
			Ext.MessageBox.alert('提示', '请选择一条记录');
		} else {
			var ids = [];
			Ext.Array.each(gridSelection, function(record, index, countriesItSelf) {
				ids.push(record.get("id"));
			});
			if (ids.length == 0){
				Ext.MessageBox.alert('提示', '不能正确获取到删除ID信息');
			} else {
				Ext.Msg.wait('正在处理数据，请稍候','提示');
				Ext.Ajax.request({
					url : '/klkk/manage/user/' + isManager,
					method : 'PUT',
					contentType : "application/json",
				    jsonData:{ids: ids},
					success : function(response) {
						Ext.Msg.hide();
						var result = Ext.decode(response.responseText);
						if (result.status){
							grid.getStore().load();
						} else {
							Ext.MessageBox.alert('提示', result.message);
						}
					},
					failure : function() {
						Ext.Msg.hide();
						Ext.MessageBox.alert('提示', '删除失败，可能是网络异常或服务器异常');
					}
				});
			}
		}
	},
	userGridEditPictureUpload: function(self, value, eOpts){
		var me = this;
		if (value){
			var form = me.getUsergrideditwin().down("#userGridEditPictureForm").getForm();
			if (form.isValid()){
				form.submit({
                    url: '/klkk/upload/image',
                    waitMsg: '正在上传图片....',
                    success: function(fp, response) {
                    	var result = Ext.decode(response.response.responseText);
                    	if (result.status){
                    		me.getUsergrideditwin().down("#userGridEditImageId").setValue(result.dataModel.id);
                    		var imagePath = "/klkk/image/upload/" + result.dataModel.name;
                    		me.getUsergrideditwin().down("#userGridEditPicturePath").setSrc(imagePath);
    					} else {
    						Ext.MessageBox.alert('提示', result.message);
    					}
                    },
                    failure : function() {
    					Ext.MessageBox.alert('提示', '上传失败，可能是网络异常或服务器异常');
    				}
                });
			}
		}
	},
	userEditSave:function(self, e, eOpts){
		var me = this;
		var form = me.getUsergrideditwin().down("#userEditForm").getForm();
		if (form.isValid()){
			var value = form.getValues();
			var method = value.id ? "PUT":"POST";
			Ext.Msg.wait('正在处理数据，请稍候','提示'); 
			Ext.Ajax.request({
				url : '/klkk/manage/user',
				method : method,
				contentType : "application/json",
				jsonData: value,
				success : function(response) {
					Ext.Msg.hide();
					var result = Ext.decode(response.responseText);
					if (result.status){
						me.getUsergrideditwin().down("#userGridEditImageId").reset();
						me.getUsergrideditwin().close();
						me.getUserpanel().down("#userGrid").getStore().load();
					} else {
						Ext.MessageBox.alert('提示', result.message);
					}
				},
				failure : function() {
					Ext.Msg.hide();
					Ext.MessageBox.alert('提示', '删除失败，可能是网络异常或服务器异常');
				}
			});
		}
	},
	userEditWinClose: function(){
		var me = this;
		me.getUsergrideditwin().down("#userGridEditPicturePath").setSrc("");
		var existImageId = me.getUsergrideditwin().down("#userGridEditImageId").getValue();
		if (existImageId){
			me.commonDelectePicture(existImageId);
		}
	}
	

});
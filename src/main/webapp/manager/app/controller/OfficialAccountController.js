Ext.define('KLKK.controller.OfficialAccountController', {
	extend : 'KLKK.controller.MainController',
	views : [ 'officialAccountView.OfficialAccountAllGrid','officialAccountView.OfficialAccountFormSearch',
	          'officialAccountView.OfficialAccountAddOrEditWin','officialAccountView.OfficialAccountFocusGrid'],
	stores : [ 'officialAccountStore.OfficialAccountAllStore','officialAccountStore.OfficialAccountFocusStore' ],
	models : [],
	refs : [// 相当于一个映射,这样就可以在控制层方便的通过geter取得相应的对象了
	{
		ref : 'managerpanel',
		selector : 'managerpanel'
	},{
		ref : 'officialAccountPanel',
		selector : 'managerpanel #southPanel #officialAccountPanel'
	},{
		ref : 'officialaccountaddoreditwin',
		selector : 'officialaccountaddoreditwin'
	},{
		ref : 'officialAccountFocusGrid',
		selector : 'managerpanel #centerPanel #officialAccountFocusGrid'
	}],
	init : function() {
		var me = this;
		this.control({
			'managerpanel #southPanel #officialAccountPanel #officialAccountAllGrid' : {
				afterrender : me.officialAccountAfterrender,
				select : me.officialAccountGridSelect,
				deselect : me.officialAccountGridSelect,
				itemdblclick : me.officialAccountGriddbClcik
			},
			'managerpanel #southPanel #officialAccountPanel #searchAllOfficialAccount' : {
				click: me.searchAllofficialAccount
			},
			'managerpanel #southPanel #officialAccountPanel #resetAllOfficialAccount' : {
				click: me.resetAllofficialAccount
			},
			'managerpanel #southPanel #officialAccountPanel #add' : {
				click: me.officialAccountGridAdd
			},
			'managerpanel #southPanel #officialAccountPanel #officialAccountGridEdit' : {
				click: me.officialAccountGridEdit
			},
			'managerpanel #southPanel #officialAccountPanel #officialAccountGridDelete' : {
				click: me.officialAccountGridDelete
			},
			'officialaccountaddoreditwin #officialAccountPictureUpload': {
				change: me.officialAccountPictureUpload
			},
			'officialaccountaddoreditwin #officialAccountSave': {
				click: me.officialAccountSave
			},
			'officialaccountaddoreditwin': {
				close: me.officialAccounttWinClose
			},
			'officialaccountfocusgrid': {
				select : me.officialAccountFocusGridSelect,
				deselect : me.officialAccountFocusGridSelect,
				itemdblclick : me.officialAccountFocusGriddbClcik
			},
			'officialaccountfocusgrid #officialAccountFocusEdit' : {
				click: me.officialAccountGridFocusEdit
			},
			'officialaccountfocusgrid #officialAccountFocusCancle' : {
				click: me.officialAccountFocusCancle
			}
		});
	},
	
	officialAccountAfterrender: function(self, eOpts){
		var me = this;
		var store = self.getStore();
		store.on('beforeload', function(store, options) {
			var new_params = me.getOfficialAccountPanel().down("#officialAccountFormSearch")
					.getForm().getValues();
			Ext.apply(store.proxy.extraParams, new_params);
		});
	},
	officialAccountGridSelect: function (self, record, index, eOpts){
		var me = this;
		var selection = self.getSelection();
		var officialAccountGridEdit = me.getOfficialAccountPanel().down("#officialAccountGridEdit");
		var officialAccountGridDelete = me.getOfficialAccountPanel().down("#officialAccountGridDelete");
		if (!officialAccountGridEdit || !officialAccountGridDelete) {
			return;
		}
		if (selection.length == 0) {
			officialAccountGridEdit.disable();
			officialAccountGridDelete.disable();
		} else if (selection.length == 1) {
			officialAccountGridEdit.enable();
			officialAccountGridDelete.enable();
		} else if (selection.length > 1) {
			officialAccountGridEdit.disable();
			officialAccountGridDelete.enable();
		}
		if (me.getOfficialAccountPanel().down("#officialAccountAllGrid").getSelectionModel().isSelected(
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
	officialAccountGriddbClcik: function(self, record, item, index, e, eOpts){
		self.select(record);
		this.officialAccountGridEdit(self, e, eOpts);
	},
	officialAccountGridAdd: function(self, e, eOpts){
		var me = this;
		var mainController = this.getApplication().getMainControllerController();
		if (!mainController.user.id){
			Ext.MessageBox.alert('提示', '不能获取当前操作用户的ID，请刷新页面重试');
			return;
		}
		me.getOfficialaccountaddoreditwin().down("#officialAccountWinForm").getForm().reset();
//		me.getOfficialaccountaddoreditwin().down("#officialAccountGridEditPictureForm").getForm().reset();
		me.getOfficialaccountaddoreditwin().down("#officialAccountWinForm").down("#officialAccountManagerId").setValue(mainController.user.id);
		me.getOfficialaccountaddoreditwin().show();
	},
	officialAccountGridEdit: function(self, e, eOpts){
		var me = this;
		me.openAddOrEditWin(me.getOfficialAccountPanel().down("#officialAccountAllGrid"));
	},
	openAddOrEditWin: function(grid){
		var me = this;
		var mainController = this.getApplication().getMainControllerController();
		var gridSelection = grid.getSelectionModel().getSelection();
		
		if (gridSelection && gridSelection.length == 1){
			me.getOfficialaccountaddoreditwin().down("#officialAccountWinForm").getForm().reset();
			var path = "无图片";
			if (gridSelection[0].get("image.name")){
				path = '/klkk/image/upload/' + gridSelection[0].get("image.name");
				me.getOfficialaccountaddoreditwin().down("#officialAccountPicturePath").setSrc(path);
			} else {
				me.getOfficialaccountaddoreditwin().down("#officialAccountPicturePath").setSrc("");
			}
			me.getOfficialaccountaddoreditwin().down("#officialAccountManagerId").setValue(mainController.user.id);
			me.getOfficialaccountaddoreditwin().down("#officialAccountWinForm").loadRecord(gridSelection[0]);
			me.getOfficialaccountaddoreditwin().show();
		} else {
			Ext.MessageBox.alert('提示', '请选择一条记录');
		}
	},
	searchAllofficialAccount:function (self, e, eOpts){
		this.getOfficialAccountPanel().down("#officialAccountAllGrid").getStore().load();
	},
	resetAllofficialAccount: function (self, e, eOpts){
		this.getOfficialAccountPanel().down("#officialAccountFormSearch").getForm().reset();
	},
	officialAccountGridDelete: function(self, e, eOpts){
		var me = this;
		var gridSelection = me.getOfficialAccountPanel().down("#officialAccountAllGrid").getSelectionModel().getSelection();
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
							url : '/klkk/officialAccount/delete',
							method : 'DELETE',
							contentType : "application/json",
						    jsonData:{ids: ids},
							waitMsg: '正在提交，请等待...',
							success : function(response) {
								Ext.Msg.hide();
								var result = Ext.decode(response.responseText);
								if (result.status){
									me.getOfficialAccountPanel().down("#officialAccountAllGrid").getStore().load();
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
	officialAccountPictureUpload: function (self, value, eOpts){
		var me = this;
		if (value){
			var form = me.getOfficialaccountaddoreditwin().down("#officialAccountPictureForm").getForm();
			if (form.isValid()){
				form.submit({
                    url: '/klkk/upload/image',
                    waitMsg: '正在上传图片....',
                    success: function(fp, response) {
                    	var result = Ext.decode(response.response.responseText);
                    	if (result.status){
                    		me.getOfficialaccountaddoreditwin().down("#officialAccountImageId").setValue(result.dataModel.id);
                    		var imagePath = "/klkk/image/upload/" + result.dataModel.name;
                    		me.getOfficialaccountaddoreditwin().down("#officialAccountPicturePath").setSrc(imagePath);
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
	officialAccountSave: function(){
		var me = this;
		var form = me.getOfficialaccountaddoreditwin().down("#officialAccountWinForm").getForm();
		if (form.isValid()){
			var value = form.getValues();
			if(value.managerId){
				value.user = {id:value.managerId}
			}
			if (value.imageId){
				value.image = {id:value.imageId}
			}
			var url = value.id ? "/klkk/officialAccount/update" : "/klkk/officialAccount/add";
			var method = value.id ? "PUT":"POST";
			Ext.Msg.wait('正在处理数据，请稍候','提示'); 
			Ext.Ajax.request({
				url : url,
				method : method,
				contentType : "application/json",
				jsonData: value,
				success : function(response) {
					Ext.Msg.hide();
					var result = Ext.decode(response.responseText);
					if (result.status){
						me.getOfficialaccountaddoreditwin().down("#officialAccountImageId").reset();
						me.getOfficialaccountaddoreditwin().close();
						me.getOfficialAccountPanel().down("#officialAccountAllGrid").getStore().load();
						me.getOfficialAccountFocusGrid().getStore().load();
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
	officialAccounttWinClose: function(){
		var me = this;
		me.getOfficialaccountaddoreditwin().down("#officialAccountPicturePath").setSrc("");
		var existImageId = me.getOfficialaccountaddoreditwin().down("#officialAccountImageId").getValue();
		if (existImageId){
			me.commonDelectePicture(existImageId);
		}
	},
	officialAccountFocusGridSelect:function(self, record, index, eOpts){
		var me = this;
		var selection = self.getSelection();
		var foucsEdit = me.getOfficialAccountFocusGrid().down("#officialAccountFocusEdit");
		var focusCancle = me.getOfficialAccountFocusGrid().down("#officialAccountFocusCancle");
		if (!foucsEdit || !focusCancle) {
			return;
		}
		if (selection.length == 0) {
			foucsEdit.disable();
			focusCancle.disable();
		} else if (selection.length == 1) {
			foucsEdit.enable();
			focusCancle.enable();
		} else if (selection.length > 1) {
			foucsEdit.disable();
			focusCancle.enable();
		}
		me.commonSetDisplayPicture(me.getOfficialAccountFocusGrid(),record);
	},
	officialAccountFocusGriddbClcik: function(self, record, item, index, e, eOpts){
		self.select(record);
		this.openAddOrEditWin(this.getOfficialAccountFocusGrid());
	},
	officialAccountGridFocusEdit: function(self, e, eOpts){
		var me = this;
		me.openAddOrEditWin(me.getOfficialAccountFocusGrid());
	},
	officialAccountFocusCancle: function(){
		var me = this;
		var gridSelection = me.getOfficialAccountFocusGrid().getSelectionModel().getSelection();
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
							url : '/klkk/officialAccount/foucus/cancle',
							method : 'DELETE',
							contentType : "application/json",
						    jsonData:{ids: ids},
							waitMsg: '正在提交，请等待...',
							success : function(response) {
								Ext.Msg.hide();
								var result = Ext.decode(response.responseText);
								if (result.status){
									me.getOfficialAccountPanel().down("#officialAccountAllGrid").getStore().load();
									me.getOfficialAccountFocusGrid().getStore().load();
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
	}

});
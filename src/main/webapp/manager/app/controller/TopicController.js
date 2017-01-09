Ext.define('KLKK.controller.TopicController', {
	extend : 'KLKK.controller.MainController',
	views : ['AllTopicGrid','AllTopicFormSearch', 'AllTopicEditWin',],
	stores : [ 'AllTopicStore','userStore.PublisherStore' ],
	models : [],
	refs : [// 相当于一个映射,这样就可以在控制层方便的通过geter取得相应的对象了
	{
		ref : 'managerpanel',
		selector : 'managerpanel'
	},{
		ref: "allTopicGrid",
		selector: "managerpanel #southPanel #allTopicPanel #allTopicGrid"
	},{
		ref : 'alltopiceditwin',
		selector : 'alltopiceditwin'
	}],
	init : function() {
		var me = this;
		this.control({
			'alltopiceditwin': {
				close: me.allTopicEditWinClose
			},
			'alltopiceditwin #allTopicEditSave': {
				click: me.allTopicEditSave
			},
			'managerpanel #southPanel #allTopicPanel #allTopicGrid' :{
				afterrender: me.allTopicGridAfterrender,
				select : me.allTopicGridSelect,
				deselect: me.allTopicGridSelect,
				itemdblclick: me.allTopicGriddbClcik
			},
			'managerpanel #southPanel #allTopicPanel #allTopicGrid #add' :{
				click: me.allTopicAdd
			},
			'managerpanel #southPanel #allTopicPanel #allTopicGrid #allTopicEdit' :{
				click: me.allTopicEdit
			},
			'managerpanel #southPanel #allTopicPanel #allTopicGrid #allTopicDelete' :{
				click: me.allTopicDelete
			},
			'managerpanel #allTopicGrid #allTopicCheck' :{
				click: me.allTopicCheck
			},
			'managerpanel #allTopicGrid #cancleAllTopictCheck' :{
				click: me.cancleAllTopictCheck
			},
			'managerpanel #searchAllTopic':{
				click: me.searchAllTopic
			},
			'managerpanel #resetAllTopic':{
				click: me.resetAllTopic
			},
			'alltopiceditwin #allTopicEditSave': {
				click: me.allTopicEditSave
			}
		});
	},
	allTopicGridAfterrender: function(self,eOpts){
		var me = this;
		console.log("test");
		var store = self.getStore();
		store.on('beforeload', function (store, options) {
	        var new_params = me.getManagerpanel().down("#allTopickSearchForm").getForm().getValues();
	        Ext.apply(store.proxy.extraParams, new_params);
	    });
//	    store.load();
	},
	allTopicGridSelect: function (self, record, index, eOpts){
		var me = this;
		var selection = self.getSelection();
		var allTopicEdit = me.getManagerpanel().down("#allTopicEdit");
		var allTopicDelete = me.getManagerpanel().down("#allTopicDelete");
		var allTopicCheck = me.getManagerpanel().down("#allTopicCheck");
		var cancleAllTopictCheck = me.getManagerpanel().down("#cancleAllTopictCheck");
		if (!allTopicEdit || !allTopicDelete || !allTopicCheck || !cancleAllTopictCheck){
			return;
		}
		if(selection.length == 0){
			allTopicEdit.disable();
			allTopicDelete.disable();
			allTopicCheck.disable();
			cancleAllTopictCheck.disable();
		} else if (selection.length == 1){
			allTopicEdit.enable();
			allTopicDelete.enable();
			allTopicCheck.enable();
			cancleAllTopictCheck.enable();
		} else if (selection.length > 1){
			allTopicEdit.disable();
			allTopicDelete.enable();
			allTopicCheck.enable();
			cancleAllTopictCheck.enable();
		}
	},
	allTopicGriddbClcik: function (self, record, item, index, e, eOpts){
		self.select(record);
		this.allTopicEdit();
	},
	allTopicEditWinClose : function (){
//		var me =this;
//		me.getAllTopicGrid().down("#add").timeIntervale = null;
	},
	allTopicEditSave: function(self, e, eOpts){
		var me = this;
		var form = me.getAlltopiceditwin().down("#allTopicEditForm").getForm();
		if (form.isValid()){
			var value = form.getValues();
			var method = value.id ? "PUT":"POST";
			Ext.Msg.wait('正在处理数据，请稍候','提示'); 
			Ext.Ajax.request({
				url : '/klkk/manage/topic',
				method : method,
				contentType : "application/json",
				jsonData: value,
				success : function(response) {
					Ext.Msg.hide();
					var result = Ext.decode(response.responseText);
					if (result.status){
						me.getAlltopiceditwin().close();
						me.getManagerpanel().down("#allTopicGrid").getStore().load();
						me.getManagerpanel().down("#topicfocusview").getStore().load();
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
	allTopicEdit: function(self, e, eOpts){
		var me = this;
		var gridSelection = me.getManagerpanel().down("#allTopicGrid").getSelectionModel().getSelection();
		
		if (gridSelection && gridSelection.length == 1){
			me.getAlltopiceditwin().down("#allTopicEditForm").getForm().reset();
			var displayUserCombo = me.getAlltopiceditwin().down("#allTopicEditForm").down("#displayUserId");
			displayUserCombo.getStore().load();
			me.getAlltopiceditwin().down("#allTopicEditForm").loadRecord(gridSelection[0]);
			if (gridSelection[0].get("displayUser.username")){
				displayUserCombo.setValue(gridSelection[0].get("displayUser.username"));
			}
			me.getAlltopiceditwin().show();
		} else {
			Ext.MessageBox.alert('提示', '请选择一条记录');
		}
	},
	allTopicAdd: function(self, e, eOpts){
		var me = this;
		var mainController = this.getApplication().getMainControllerController();
		if (!mainController.user.id){
			Ext.MessageBox.alert('提示', '不能获取当前操作用户的ID，请刷新页面重试');
			return;
		}
		me.getAlltopiceditwin().down("#allTopicEditForm").getForm().reset();
		me.getAlltopiceditwin().down("#allTopicEditForm").down("#displayUserId").getStore().load();
		me.getAlltopiceditwin().down("#allTopicEditForm").down("#userId").setValue(mainController.user.id);
		me.getAlltopiceditwin().show();
	},
	allTopicDelete: function (){
		var me = this;
		var gridSelection = me.getManagerpanel().down("#allTopicGrid").getSelectionModel().getSelection();
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
							url : '/klkk/manage/topic',
							method : 'DELETE',
							contentType : "application/json",
						    jsonData:{ids: ids},
							success : function(response) {
								Ext.Msg.hide();
								var result = Ext.decode(response.responseText);
								if (result.status){
									me.getManagerpanel().down("#allTopicGrid").getStore().load();
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
	allTopicCheck: function (self, e, eOpts){
		this.updateTopicCheck(true);
	},
	cancleAllTopictCheck: function (self, e, eOpts){
		this.updateTopicCheck(false);
	},
	updateTopicCheck: function(pass){
		var me = this;
		var gridSelection = me.getManagerpanel().down("#allTopicGrid").getSelectionModel().getSelection();
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
					url : '/klkk/manage/topic/' + pass,
					method : 'PUT',
					contentType : "application/json",
				    jsonData:{ids: ids},
					success : function(response) {
						Ext.Msg.hide();
						var result = Ext.decode(response.responseText);
						if (result.status){
							me.getManagerpanel().down("#allTopicGrid").getStore().load();
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
	searchAllTopic: function (self, e, eOpts){
		this.getManagerpanel().down("#allTopicGrid").getStore().load();
	},
	resetAllTopic: function (self, e, eOpts){
		this.getManagerpanel().down("#allTopickSearchForm").getForm().reset();
	},
	allTopicEditSave: function(self, e, eOpts){
		var me = this;
		var form = me.getAlltopiceditwin().down("#allTopicEditForm").getForm();
		if (form.isValid()){
			var value = form.getValues();
			if(value.displayUserId){
				value.displayUser = {id: value.displayUserId};
			}
			var method = value.id ? "PUT":"POST";
			Ext.Msg.wait('正在处理数据，请稍候','提示'); 
			Ext.Ajax.request({
				url : '/klkk/manage/topic',
				method : method,
				contentType : "application/json",
				jsonData: value,
				success : function(response) {
					Ext.Msg.hide();
					var result = Ext.decode(response.responseText);
					if (result.status){
						me.getAlltopiceditwin().close();
						me.getManagerpanel().down("#allTopicGrid").getStore().load();
						me.getManagerpanel().down("#topicfocusview").getStore().load();
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

});
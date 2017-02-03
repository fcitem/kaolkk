Ext.define('KLKK.controller.MainController', {
	extend : 'Ext.app.Controller',
	views : [ 'MainPanel', 'LoginWin',
			'ManagerPanel','IndexFocus','AllProductView','ProductEditWin','IndexFocusEditWin',
			'TopicFocusView','wyAPI'],
	stores : [ 'ProductStore','IndexFocusStore','TopicFocusStore','userStore.UserStoreNoPage','WyApiStore' ],
	models : [  ],
	refs : [//相当于一个映射,这样就可以在控制层方便的通过geter取得相应的对象了
		{
			ref : 'managerpanel',
			selector : 'managerpanel'
		}, {
			ref : 'producteditwin',
			selector : 'producteditwin'
		}, {
			ref : 'indexfocuseditwin',
			selector : 'indexfocuseditwin'
		}, {
			ref : 'alltopiceditwin',
			selector : 'alltopiceditwin'
		},{
			ref : 'centerPanel',
			selector : 'managerpanel #centerPanel'
		},{
			ref : 'southPanel',
			selector : 'managerpanel #southPanel'
		}],
	user: null,
//	user: {id:'4028818655d473d60155d48ea78f0003'},
	init : function() {
		var me = this;
//		me.getManagerpanel({inited : false}).add(me.getProducteditwin()); 
		this.control({
			'loginwin button[action=save]' : {
				click : me.login
			},
			'managerpanel #allProduct' :{
				afterrender: me.AfterAllProductView,
				select : me.allProductSelect,
				deselect: me.allProductSelect,
				itemdblclick: me.allProductdbClcik
			},
			'managerpanel #searchProduct':{
				click: me.searchProduct
			},
			'managerpanel #resetProduct':{
				click: me.resetProduct
			},
			'managerpanel #allProduct #allProductEdit' :{
				click: me.allProductEdit
			},
			'managerpanel #allProduct #allProductDelete' :{
				click: me.allProductDelete
			},
			'managerpanel #allProduct #allProductCheck' :{
				click: me.allProductCheck
			},
			'managerpanel #allProduct #cancleAllProductCheck' :{
				click: me.cancleAllProductCheck
			},
			'producteditwin #allProductSave': {
				click: me.allProductSave
			},
			'producteditwin #allProductEditPictureUpload': {
				change: me.allProductEditPictureUpload
			},
			'managerpanel #indexFocus' :{
				select : me.indexFocusSelect,
				deselect: me.indexFocusSelect,
				itemdblclick: me.indexFocusdbClcik
			},
			'managerpanel #indexFocus #indexFocusEdit':{
				click: me.indexFocusEdit
			},
			'managerpanel #indexFocus #cancleIndexFocusDisplay':{
				click: me.cancleIndexFocusDisplay
			},
			'indexfocuseditwin #indexFocusEditSave': {
				click: me.indexFocusEditSave
			},
			'indexfocuseditwin #indexFocusPictureUpload':{
				change: me.indexFocusPictureUpload
			},
			'managerpanel #topicfocusview' :{
				select : me.topicFocusSelect,
				deselect: me.topicFocusSelect,
				itemdblclick: me.topicFocusdbClcik
			},
			'managerpanel #topicFocusEdit': {
				click: me.topicFocusEdit
			},
			'managerpanel #wyAPI' :{
				select : me.wyApiSelect,
				deselect: me.wyApiSelect,
				itemdblclick: me.wyApiSelectdbClcik
			},
			'managerpanel #wyAPI #bookadd': {
				click: me.wyApiAddBook
			},
			'managerpanel #wyAPI #bookedit': {
				click: me.wyApiSelectEdit
			},
			'managerpanel #wyAPI #bookupdate': {
				click: me.wyApiSelectEdit
			},
			'managerpanel #wyAPI #bookdelete': {
				click: me.canclewyApiSelectDisplay
			},
			'managerpanel #treePanel':{
				itemclick: me.treePanelClick
			},
			'managerpanel #centerPanel':{
				tabchange: me.tabChange
			},
			'managerpanel #southPanel':{
				tabchange: me.southTabChange
			}
		});
	},
	treePanelClick: function( self, record, item, index, e, eOpts){
		var me = this;
		if (record.get("leaf")){
			var itemId = record.raw.tabId;
			if (itemId){
				var tab = me.getCenterPanel().down("#"+itemId);
				if (!tab.isVisible()){
					tab.setVisible(true);
				}
			}
		}
	},
	tabChange:function(tabPanel, newCard, oldCard, eOpts){
		if (newCard.getStore){
			newCard.getStore().load();
		}
	},
	southTabChange: function(tabPanel, newCard, oldCard, eOpts){
		newCard.items.items[1].getStore().load();
	},
	login : function(self, e, eOpts) {
		var me = this;
		var logWin = self.up('window');
		var form = logWin.down("#loginForm").getForm();
		if (form.isValid()){
			var value = form.getValues();
			Ext.Msg.wait('正在登录，请稍候...','提示');
			Ext.Ajax.request({
				url : '/klkk/manage/login',
				method : 'POST',
				contentType : "application/json",
				jsonData: value,
				success : function(response) {
					Ext.Msg.hide();
					var result = Ext.decode(response.responseText);
					if (result.status){
						me.user = result.dataModel;
						logWin.hide();
						me.getManagerpanel().show();
						me.getCenterPanel().getActiveTab().getStore().load();
						me.getSouthPanel().getActiveTab().items.items[1].getStore().load();
					} else {
						Ext.MessageBox.alert('提示', result.message);
					}
				},
				failure : function() {
					Ext.Msg.hide();
					Ext.MessageBox.alert('提示', '登录失败，可能是网络异常或服务器异常');
				}
			});
		}
		
//		this.initCompleteYearComboxValue();
//		this.getManagerpanel().down("#indexFocus").getStore().load();
//		this.getManagerpanel().down("#indexFocus").getStore().load({
//		    params:{
//		        start:0,
//		        limit: 1
//		    }
//		});
	},
	initCompleteYearComboxValue: function(){
//		var year = new Date().getFullYear();
//		var yearData = [];
//		for(var i=0;i<10;i++){
//			var yearStr = (year + i) + '年';
//			var yearObj = {"value":yearStr, "text":yearStr};
//			yearData.push(yearObj);
//		}
		this.getManagerpanel().down("#completeYear").getStore().loadData(this.getYearData());
	},
	getYearData:function (){
		var year = new Date().getFullYear();
		var yearData = [];
		for(var i=0;i<10;i++){
			var yearStr = (year + i) + '年';
			var yearObj = {"value":yearStr, "text":yearStr};
			yearData.push(yearObj);
		}
		return yearData;
	},
	searchProduct: function (self, e, eOpts){
		if (self.timeIntervale){
			var  newTime = new Date().getTime();
			if (newTime - self.timeIntervale < 500){
				self.timeIntervale = null;
				return;
			}
		} else {
			self.timeIntervale = new Date().getTime();
		}
		this.getManagerpanel().down("#allProduct").getStore().load();
	},
	resetProduct: function (self, e, eOpts){
		if (self.timeIntervale){
			var  newTime = new Date().getTime();
			if (newTime - self.timeIntervale < 500){
				self.timeIntervale = null;
				return;
			}
		} else {
			self.timeIntervale = new Date().getTime();
		}
		this.getManagerpanel().down("#productForm").getForm().reset();
	},
	AfterAllProductView: function( self, eOpts){
		var me = this;
		this.initCompleteYearComboxValue();
		var store = self.getStore();
		store.on('beforeload', function (store, options) {
	        var new_params = me.getManagerpanel().down("#productForm").getForm().getValues();
	        Ext.apply(store.proxy.extraParams, new_params);
	    });
//	    store.load();
	},
	allProductSelect: function(self, record, index, eOpts ){
		var me = this;
		var selection = self.getSelection();
		var allProductEdit = me.getManagerpanel().down("#allProductEdit");
		var allProductDelete = me.getManagerpanel().down("#allProductDelete");
		var allProductCheck = me.getManagerpanel().down("#allProductCheck");
		var cancleAllProductCheck = me.getManagerpanel().down("#cancleAllProductCheck");
		if (!allProductEdit || !allProductDelete || !allProductCheck || !cancleAllProductCheck){
			return;
		}
		if(selection.length == 0){
			allProductEdit.disable();
			allProductDelete.disable();
			allProductCheck.disable();
			cancleAllProductCheck.disable();
		} else if (selection.length == 1){
			allProductEdit.enable();
			allProductDelete.enable();
			allProductCheck.enable();
			cancleAllProductCheck.enable();
		} else if (selection.length > 1){
			allProductEdit.disable();
			allProductDelete.enable();
			allProductCheck.enable();
			cancleAllProductCheck.enable();
		}
		if (me.getManagerpanel().down("#allProduct").getSelectionModel().isSelected(record)){
			var path = "无图片";
			if (record.get("image.name")){
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
	allProductdbClcik: function (self, record, item, index, e, eOpts){
		self.select(record);
		this.allProductEdit();
	},
	allProductEdit: function (self, e, eOpts){
		var me = this;
		me.commonOpenProductEditWin(me.getManagerpanel().down("#allProduct"),me);
	},
	allProductDelete: function (self, e, eOpts){
		var me = this;
		me.commonProductDelete(me.getManagerpanel().down("#allProduct"));
	},
	allProductCheck: function (self, e, eOpts){
		this.updateProductCheck(true);
	},
	cancleAllProductCheck: function (self, e, eOpts){
		this.updateProductCheck(false);
	},
	allProductSave:function (self, e, eOpts){
		if (self.timeIntervale){
			var  newTime = new Date().getTime();
			console.log(newTime - self.timeIntervale);
			if (newTime - self.timeIntervale < 500){
				self.timeIntervale = null;
				return;
			}
		} else {
			self.timeIntervale = new Date().getTime();
		}
		var me = this;
		var form = me.getProducteditwin().down("#productEditForm").getForm();
		if (form.isValid()){
			var value = form.getValues();
			if(value.displayUserId){
				value.displayUser = {id: value.displayUserId};
			}
			var method = value.id ? "PUT":"POST"; 
			Ext.Msg.wait('正在处理数据，请稍候','提示');
			Ext.Ajax.request({
				url : '/klkk/manage/production',
				method : method,
				contentType : "application/json",
				jsonData:value,
				success : function(response) {
					Ext.Msg.hide();
					var result = Ext.decode(response.responseText);
					if (result.status){
						me.getProducteditwin().down("#allProductEditImageId").reset();
						me.getProducteditwin().close();
						me.commonProductRefresh();
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
	updateProductCheck: function(pass){
		var me = this;
		var gridSelection = me.getManagerpanel().down("#allProduct").getSelectionModel().getSelection();
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
					url : '/klkk/manage/production/' + pass,
					method : 'PUT',
					contentType : "application/json",
				    jsonData:{ids: ids},
					success : function(response) {
						Ext.Msg.hide();
						var result = Ext.decode(response.responseText);
						if (result.status){
							me.getManagerpanel().down("#allProduct").getStore().load();
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
	indexFocusSelect: function(self, record, index, eOpts){
		var me = this;
		var selection = self.getSelection();
		var indexFocusEdit = me.getManagerpanel().down("#indexFocusEdit");
		var cancleIndexFocusDisplay = me.getManagerpanel().down("#cancleIndexFocusDisplay");
		if (!indexFocusEdit || !cancleIndexFocusDisplay){
			return;
		}
		if(selection.length == 0){
			indexFocusEdit.disable();
			cancleIndexFocusDisplay.disable();
		} else if (selection.length == 1){
			indexFocusEdit.enable();
			cancleIndexFocusDisplay.enable();
		} else if (selection.length > 1){
			indexFocusEdit.disable();
			cancleIndexFocusDisplay.enable();
		}
		if (me.getManagerpanel().down("#indexFocus").getSelectionModel().isSelected(record)){
			var path = "无图片";
			if (record.get("image.name")){
				path = '/klkk/image/upload/' + record.get("image.name");
			}
			me.getManagerpanel().down("#picturePath").setSrc(path);
			me.getManagerpanel().down("#pictureText").setText(path);
		} else {
			me.getManagerpanel().down("#picturePath").setSrc("");
			me.getManagerpanel().down("#pictureText").setText("");
		}
	},
	indexFocusdbClcik: function(self, record, item, index, e, eOpts){
		self.select(record);
		this.indexFocusEdit();
	},
	indexFocusEdit: function (self, e, eOpts){
		var me = this;
		var gridSelection = me.getManagerpanel().down("#indexFocus").getSelectionModel().getSelection();
		
		if (gridSelection && gridSelection.length == 1){
			me.getIndexfocuseditwin().down("#indexFocusEditForm").getForm().reset();
			var path = "无图片";
			if (gridSelection[0].get("image.name")){
				path = '/klkk/image/upload/' + gridSelection[0].get("image.name");
			} 
			me.getIndexfocuseditwin().down("#indexFocusPicturePath").setSrc(path);
			me.getIndexfocuseditwin().down("#indexFocusManagerId").setValue(me.user.id);
			me.getIndexfocuseditwin().down("#indexFocusEditForm").loadRecord(gridSelection[0]);
			me.getIndexfocuseditwin().show();
		} else {
			Ext.MessageBox.alert('提示', '请选择一条记录');
		}
	},
	cancleIndexFocusDisplay: function (self, e, eOpts){
		var me = this;
		var gridSelection = me.getManagerpanel().down("#indexFocus").getSelectionModel().getSelection();
		if (gridSelection.length == 0){
			Ext.MessageBox.alert('提示', '请选择一条记录');
		} else {
			var ids = [];
			Ext.Array.each(gridSelection, function(record, index, countriesItSelf) {
				ids.push(record.get("id"));
			});
			if (ids.length == 0){
				Ext.MessageBox.alert('提示', '不能正确获取到ID信息，请刷新页面重试');
			} else {
				Ext.Msg.confirm('', "确定要取消在主页显示的这些条目", function(btn) {
					if (btn == 'yes') {
						Ext.Ajax.request({
							url : '/klkk/manage/product/focus',
							method : 'DELETE',
							contentType : "application/json",
						    jsonData:{ids: ids},
							waitMsg: '正在提交，请等待...',
							success : function(response) {
								var result = Ext.decode(response.responseText);
								if (result.status){
									me.getManagerpanel().down("#indexFocus").getStore().load();
								} else {
									Ext.MessageBox.alert('提示', result.message);
								}
							},
							failure : function() {
								Ext.MessageBox.alert('提示', '取消显示失败，可能是网络异常或服务器异常');
							}
						});
					}
				});
			}
			
		}
	},
	indexFocusEditSave: function(self, e, eOpts){
		var me = this;
		var form = me.getIndexfocuseditwin().down("#indexFocusEditForm").getForm();
		if (form.isValid()){
			var value = form.getValues();
			Ext.Msg.wait('正在处理数据，请稍候','提示');
			Ext.Ajax.request({
				url : '/klkk/manage/product/focus',
				method : 'PUT',
				contentType : "application/json",
				jsonData: value,
				success : function(response) {
					Ext.Msg.hide();
					var result = Ext.decode(response.responseText);
					if (result.status){
						me.getIndexfocuseditwin().close();
						me.getManagerpanel().down("#indexFocus").getStore().load();
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
	indexFocusPictureUpload: function(self, value, eOpts){
		var me = this;
		if (value){
			var form = me.getIndexfocuseditwin().down("#indexFocusEditForm").getForm();
			if (form.isValid()){
				form.submit({
                    url: '/klkk/upload/image',
                    waitMsg: '正在上传图片....',
                    success: function(fp, response) {
                    	var result = Ext.decode(response.response.responseText);
                    	if (result.status){
                    		me.getIndexfocuseditwin().down("#existImageId").setValue(result.dataModel.id);
                    		var imagePath = "/klkk/image/upload/" + result.dataModel.name;
                    		me.getIndexfocuseditwin().down("#indexFocusPicturePath").setSrc(imagePath);
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
	allProductEditPictureUpload: function(self, value, eOpts){
		console.log("22="+self.timeIntervale);
		if (self.timeIntervale){
			var  newTime = new Date().getTime();
			console.log("dd:"+(newTime - self.timeIntervale));
			if (newTime - self.timeIntervale < 500){
				self.timeIntervale = null;
				return;
			}
		} else {
			self.timeIntervale = new Date().getTime();
		}
		
		var me = this;
		if (value){
			var form = me.getProducteditwin().down("#allProductEditPictureForm").getForm();
			if (form.isValid()){
				form.submit({
                    url: '/klkk/upload/image',
                    waitMsg: '正在上传图片....',
                    success: function(fp, response) {
                    	self.timeIntervale = null;
                    	var result = Ext.decode(response.response.responseText);
                    	if (result.status){
                    		me.getProducteditwin().down("#allProductEditImageId").setValue(result.dataModel.id);
                    		var imagePath = "/klkk/image/upload/" + result.dataModel.name;
                    		me.getProducteditwin().down("#allProductEditPicturePath").setSrc(imagePath);
    					} else {
    						Ext.MessageBox.alert('提示', result.message);
    					}
                    },
                    failure : function() {
                    	self.timeIntervale = null;
    					Ext.MessageBox.alert('提示', '上传失败，可能是网络异常或服务器异常');
    				}
                });
			}
		}
	},
	topicFocusSelect: function(self, record, index, eOpts){
		var me = this;
		var selection = self.getSelection();
		var topicFocusEdit = me.getManagerpanel().down("#topicFocusEdit");
		var cancleTopicFocusDisplay = me.getManagerpanel().down("#cancleTopicFocusDisplay");
		if (!topicFocusEdit || !cancleTopicFocusDisplay){
			return;
		}
		if(selection.length == 0){
			topicFocusEdit.disable();
			cancleTopicFocusDisplay.disable();
		} else if (selection.length == 1){
			topicFocusEdit.enable();
			cancleTopicFocusDisplay.enable();
		} else if (selection.length > 1){
			topicFocusEdit.disable();
			cancleTopicFocusDisplay.enable();
		}
	},
	topicFocusdbClcik: function(self, record, item, index, e, eOpts){
		self.select(record);
		this.topicFocusEdit();
	},
	topicFocusEdit: function(self, e, eOpts){
		var me = this;
		var gridSelection = me.getManagerpanel().down("#topicfocusview").getSelectionModel().getSelection();
		
		if (gridSelection && gridSelection.length == 1){
			me.getAlltopiceditwin().down("#allTopicEditForm").getForm().reset();
			me.getAlltopiceditwin().down("#allTopicEditForm").loadRecord(gridSelection[0]);
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
	cancleTopicFocusDisplay:function(self, e, eOpts){
		var me = this;
		var gridSelection = me.getManagerpanel().down("#topicfocusview").getSelectionModel().getSelection();
		if (gridSelection.length == 0){
			Ext.MessageBox.alert('提示', '请选择一条记录');
		} else {
			var ids = [];
			Ext.Array.each(gridSelection, function(record, index, countriesItSelf) {
				ids.push(record.get("id"));
			});
			if (ids.length == 0){
				Ext.MessageBox.alert('提示', '不能正确获取到ID信息，请刷新页面重试');
			} else {
				Ext.Msg.confirm('', "确定要取消在主页显示的这些条目", function(btn) {
					if (btn == 'yes') {
						Ext.Ajax.request({
							url : '/klkk/manage/topic/focus',
							method : 'DELETE',
							contentType : "application/json",
						    jsonData:{ids: ids},
							waitMsg: '正在提交，请等待...',
							success : function(response) {
								var result = Ext.decode(response.responseText);
								if (result.status){
									me.getManagerpanel().down("#topicfocusview").getStore().load();
									me.getManagerpanel().down("#allTopicGrid").getStore().load();
								} else {
									Ext.MessageBox.alert('提示', result.message);
								}
							},
							failure : function() {
								Ext.MessageBox.alert('提示', '取消显示失败，可能是网络异常或服务器异常');
							}
						});
					}
				});
			}
			
		}
	},
	commonSetDisplayPicture:function(grid,record){
		var me = KLKK.app.getController("KLKK.controller.MainController");;
		if (grid && grid.getSelectionModel().isSelected(record)) {
			var path = "无图片";
			if (record.get("image.name")) {
				path = '/klkk/image/upload/' + record.get("image.name");
			}
			me.getManagerpanel().down("#picturePath").setSrc(path);
			me.getManagerpanel().down("#pictureText").setText(path);
		} else {
			me.getManagerpanel().down("#picturePath").setSrc("");
			me.getManagerpanel().down("#pictureText").setText("");
		}
	},
	commonOpenProductEditWin: function (grid,scope){
//		var me = KLKK.app.getController("KLKK.controller.MainController");
//		var me = scope;
		var me = this.getApplication().getMainControllerController();
		var gridSelection = grid.getSelectionModel().getSelection();
		
		if (gridSelection && gridSelection.length == 1){
			me.getProducteditwin().down("#productEditForm").getForm().reset();
			var path = "无图片";
			if (gridSelection[0].get("image.name")){
				path = '/klkk/image/upload/' + gridSelection[0].get("image.name");
				me.getProducteditwin().down("#allProductEditPicturePath").setSrc(path);
			} 
			me.getProducteditwin().down("#allProductEditManagerId").setValue(me.user.id);
			me.getProducteditwin().down("#completeYear").getStore().loadData(this.getYearData());
			me.getProducteditwin().down("#productEditForm").loadRecord(gridSelection[0]);
			var displayUserCombo = me.getProducteditwin().down("#productEditForm").down("#displayUserId");
			displayUserCombo.getStore().load();
			if (gridSelection[0].get("displayUser.username")){
				displayUserCombo.setValue(gridSelection[0].get("displayUser.username"));
			}
			me.getProducteditwin().down("#allProductSave").timeIntervale = null;
			me.getProducteditwin().show();
		} else {
			Ext.MessageBox.alert('提示', '请选择一条记录');
		}
	},
	commonProductDelete: function (grid){
		var me = this;
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
				Ext.Msg.confirm('', "确定要删除选中的条目", function(btn) {
					if (btn == 'yes') {
						Ext.Msg.wait('正在处理数据，请稍候','提示');
						Ext.Ajax.request({
							url : '/klkk/manage/product/delete',
							method : 'DELETE',
							contentType : "application/json",
						    jsonData:{ids: ids},
							success : function(response) {
								Ext.Msg.hide();
								var result = Ext.decode(response.responseText);
								if (result.status){
									me.commonProductRefresh();
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
	commonProductRefresh: function(){
		var me = KLKK.app.getController("KLKK.controller.MainController");
		me.getManagerpanel().down("#allProduct").getStore().load();
		var group = me.getCenterPanel().getActiveTab() && me.getCenterPanel().getActiveTab().group;
		if (group && group == "product"){
			me.getCenterPanel().getActiveTab().getStore().load();
		}
	},
	commonAddProductWin: function (){
		var me = this.getApplication().getMainControllerController();
		me.getProducteditwin().down("#productEditForm").getForm().reset();
		me.getProducteditwin().down("#allProductEditPictureForm").getForm().reset();
		
		if (!me.user.id){
			return;
		}
		me.getProducteditwin().down("#productEditForm").down("#displayUserId").getStore().load();
		me.getProducteditwin().down("#allProductEditPictureForm").down("#allProductEditManagerId").setValue(me.user.id);
		me.getProducteditwin().down("#productEditForm").down("#userId").setValue(me.user.id);
		me.getProducteditwin().show();
	},
	commonDelectePicture:function(imageId){
		if (imageId){
			Ext.Ajax.request({
				url : '/klkk/upload/image/' + imageId,
				method : 'DELETE',
				contentType : "application/json",
				success : function(response) {
				},
				failure : function() {
				}
			});
		}
	},
	wyApiSelect: function(self, record, index, eOpts){
		var me = this;
		var selection = self.getSelection();
		var indexFocusEdit = me.getManagerpanel().down("#indexFocusEdit");
		var cancleIndexFocusDisplay = me.getManagerpanel().down("#cancleIndexFocusDisplay");
		if (!indexFocusEdit || !cancleIndexFocusDisplay){
			return;
		}
		if(selection.length == 0){
			indexFocusEdit.disable();
			cancleIndexFocusDisplay.disable();
		} else if (selection.length == 1){
			indexFocusEdit.enable();
			cancleIndexFocusDisplay.enable();
		} else if (selection.length > 1){
			indexFocusEdit.disable();
			cancleIndexFocusDisplay.enable();
		}
		if (me.getManagerpanel().down("#indexFocus").getSelectionModel().isSelected(record)){
			var path = "无图片";
			if (record.get("image.name")){
				path = '/klkk/image/upload/' + record.get("image.name");
			}
			me.getManagerpanel().down("#picturePath").setSrc(path);
			me.getManagerpanel().down("#pictureText").setText(path);
		} else {
			me.getManagerpanel().down("#picturePath").setSrc("");
			me.getManagerpanel().down("#pictureText").setText("");
		}
	},
	wyApiSelectdbClcik: function(self, record, item, index, e, eOpts){
		self.select(record);
		this.indexFocusEdit();
	},
	wyApiAddBook: function (self, e, eOpts){
		var me = this;
		var gridSelection = me.getManagerpanel().down("#wyAPI").getSelectionModel().getSelection();
		var winAdd=null;
		var abutton=[{xtype: "button",text : '下一步', handler:function(){ winAdd.hide();}},
			   {xtype: "button",text : '取消', handler:function(){winAdd.hide();}}];
		debugger;
		winAdd = Ext.create("Ext.window.Window",{
	        id:'addid',
			title : '上传新书',
			width : 650,
			height : 350,
			layout : 'fit',
			closeAction : 'hide',
			maximizable : false,
			resizable : false,
			border : false,
			autoScroll : true,
			html : '<iframe id="iframeAdd" name="ifr1" scrolling="yes" width="100%" height="100%"  src="/klkk/page/wyApi/addbook.html"/>'
			/*iconCls : 'CssIconForm',*/
			/*buttons :abutton*/
		});
		winAdd.show();
	},
	
	wyApiSelectEdit: function (self, e, eOpts){
		var me = this;
		var gridSelection = me.getManagerpanel().down("#wyAPI").getSelectionModel().getSelection();
		if (gridSelection && gridSelection.length == 1){
			me.getIndexfocuseditwin().down("#indexFocusEditForm").getForm().reset();
			var path = "无图片";
			if (gridSelection[0].get("image.name")){
				path = '/klkk/image/upload/' + gridSelection[0].get("image.name");
			}
			me.getIndexfocuseditwin().down("#wyAPI").setSrc(path);
			me.getIndexfocuseditwin().down("#indexFocusManagerId").setValue(me.user.id);
			me.getIndexfocuseditwin().down("#indexFocusEditForm").loadRecord(gridSelection[0]);
			me.getIndexfocuseditwin().show();
		} else {
			Ext.MessageBox.alert('提示', '请选择一条记录');
		}
	},
	canclewyApiSelectDisplay: function (self, e, eOpts){
		var me = this;
		var gridSelection = me.getManagerpanel().down("#indexFocus").getSelectionModel().getSelection();
		if (gridSelection.length == 0){
			Ext.MessageBox.alert('提示', '请选择一条记录');
		} else {
			var ids = [];
			Ext.Array.each(gridSelection, function(record, index, countriesItSelf) {
				ids.push(record.get("id"));
			});
			if (ids.length == 0){
				Ext.MessageBox.alert('提示', '不能正确获取到ID信息，请刷新页面重试');
			} else {
				Ext.Msg.confirm('', "确定要取消在主页显示的这些条目", function(btn) {
					if (btn == 'yes') {
						Ext.Ajax.request({
							url : '/klkk/manage/product/focus',
							method : 'DELETE',
							contentType : "application/json",
						    jsonData:{ids: ids},
							waitMsg: '正在提交，请等待...',
							success : function(response) {
								var result = Ext.decode(response.responseText);
								if (result.status){
									me.getManagerpanel().down("#indexFocus").getStore().load();
								} else {
									Ext.MessageBox.alert('提示', result.message);
								}
							},
							failure : function() {
								Ext.MessageBox.alert('提示', '取消显示失败，可能是网络异常或服务器异常');
							}
						});
					}
				});
			}
			
		}
	},
	wyApiSelectEditSave: function(self, e, eOpts){
		var me = this;
		var form = me.getIndexfocuseditwin().down("#indexFocusEditForm").getForm();
		if (form.isValid()){
			var value = form.getValues();
			Ext.Msg.wait('正在处理数据，请稍候','提示');
			Ext.Ajax.request({
				url : '/klkk/manage/product/focus',
				method : 'PUT',
				contentType : "application/json",
				jsonData: value,
				success : function(response) {
					Ext.Msg.hide();
					var result = Ext.decode(response.responseText);
					if (result.status){
						me.getIndexfocuseditwin().close();
						me.getManagerpanel().down("#indexFocus").getStore().load();
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
	wyApiSelectPictureUpload: function(self, value, eOpts){
		var me = this;
		if (value){
			var form = me.getIndexfocuseditwin().down("#indexFocusEditForm").getForm();
			if (form.isValid()){
				form.submit({
                    url: '/klkk/upload/image',
                    waitMsg: '正在上传图片....',
                    success: function(fp, response) {
                    	var result = Ext.decode(response.response.responseText);
                    	if (result.status){
                    		me.getIndexfocuseditwin().down("#existImageId").setValue(result.dataModel.id);
                    		var imagePath = "/klkk/image/upload/" + result.dataModel.name;
                    		me.getIndexfocuseditwin().down("#indexFocusPicturePath").setSrc(imagePath);
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
	
	
});

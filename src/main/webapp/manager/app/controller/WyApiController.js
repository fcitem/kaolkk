Ext.define('KLKK.controller.WyApiController', {
	extend : 'KLKK.controller.MainController',
	views : [ 'wyAPI'],
	stores : [ 'systemSetStore.SystemSetStore' ],
	models : [],
	refs : [// 相当于一个映射,这样就可以在控制层方便的通过geter取得相应的对象了
	{
		ref : 'managerpanel',
		selector : 'managerpanel'
	},{
		ref : 'systemSetFormPanel',
		selector : 'managerpanel #centerPanel #systemSetFormPanel'
	}],
	init : function() {
		var me = this;
		this.control({
			'managerpanel #centerPanel #systemSetFormPanel' : {
				show : me.initSystemSet,
			},
			'managerpanel #centerPanel #systemSetFormPanel #save' : {
				click: me.systemSave
			},
			'managerpanel #centerPanel #systemSetFormPanel #cancle' : {
				click: me.initSystemSet
			}
		});
	},
	initSystemSet: function(){
		var me = this;
		var mainController = this.getApplication().getMainControllerController();
		me.getSystemSetFormPanel().down("#userId").setValue(mainController.user.id);;
		Ext.Msg.wait('正在获取系统信息，请稍候','提示');
		Ext.Ajax.request({
			url : '/klkk/manage/systemSet',
			method : 'GET',
			contentType : "application/json",
			success : function(response) {
				Ext.Msg.hide();
				var result = Ext.decode(response.responseText);
				if (result.status){
					me.setSystemValue(result.dataModel);
				} else {
					Ext.MessageBox.alert('提示', result.message);
				}
			},
			failure : function() {
				Ext.Msg.hide();
				Ext.MessageBox.alert('提示', '获取失败，可能是网络异常或服务器异常');
			}
		});
	},
	setSystemValue: function(data){
		var me = this;
		var versionCombo = me.getSystemSetFormPanel().down("#version");
		var systemId = me.getSystemSetFormPanel().down("#systemId");
		if (data){
			versionCombo.setValue(data.version);
			systemId.setValue(data.id);
		}
	},
	systemSave:function (self, e, eOpts){
		var me = this;
		var form = me.getSystemSetFormPanel().getForm();
		if (form.isValid()){
			var value = form.getValues();
			var method = 'PUT';
			if (!value.id){
				method = 'POST';
			}
			var jsonData = {
					version: value.version,
					id: value.id,
					user: {
						id: value.userId
					}
			};
			Ext.Msg.wait('正在保存信息，请稍候','提示');
			Ext.Ajax.request({
				url : '/klkk/manage/systemSet',
				method : method,
				contentType : "application/json",
				jsonData: jsonData,
				success : function(response) {
					Ext.Msg.hide();
					var result = Ext.decode(response.responseText);
					if (result.status){
						Ext.MessageBox.alert('提示', "保存成功");
						me.setSystemValue(result.dataModel);
					} else {
						Ext.MessageBox.alert('提示', result.message);
					}
				},
				failure : function() {
					Ext.Msg.hide();
					Ext.MessageBox.alert('提示', '保存失败，可能是网络异常或服务器异常');
				}
			});
		}
	}
	

});
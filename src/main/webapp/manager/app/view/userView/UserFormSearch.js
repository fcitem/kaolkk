Ext.define('KLKK.view.userView.UserFormSearch', {
	extend : 'Ext.form.Panel',
	alias : 'widget.userformsearch',
	maxHeight : 80,
	autoScroll : true,
	defaultType : 'combobox',
	layout : {
		type : 'table',
		columns : 3
	},
	defaults : {
		margin : '5 10 5 20',
		labelWidth : 70
	},
	items : [  {
		fieldLabel : '用户姓名',
		name : 'username',
		xtype : 'textfield'
	},{
		fieldLabel : '邮箱',
		name : 'email',
		xtype : 'textfield'
	},{
		fieldLabel : '是否验证',
		name : 'active',
		queryMode : 'local',
		editable : false,
		store : Ext.create('Ext.data.Store', {
			fields : [ 'value', 'text' ],
			data : [ {
				"value" : "0",
				"text" : "否"
			}, {
				"value" : "1",
				"text" : "是"
			}, {
				"value" : "",
				"text" : "所有"
			} ]
		}),
		value : '',
		valueField : 'value',
		displayField : 'text'
	},{
		fieldLabel : '身份状态',
		name : 'status',
		queryMode : 'local',
		editable : false,
		store : Ext.create('Ext.data.Store', {
			fields : [ 'value', 'text' ],
			data : [ {
				"value" : "0",
				"text" : "出版人"
			}, {
				"value" : "1",
				"text" : "创作者"
			}, {
				"value" : "",
				"text" : "所有"
			} ]
		}),
		value : '',
		valueField : 'value',
		displayField : 'text'
	},{
		fieldLabel : '手机号码',
		name : 'phone',
		xtype : 'textfield'
	}, {
		xtype : 'container',
		defaults : {
			margin : '5 10 5 0',
			width : 100
		},
		items : [ {
			xtype : 'button',
			itemId : 'searchAllUser',
			text : '查询'
		}, {
			xtype : 'button',
			itemId : 'resetAllUser',
			text : '重置'
		} ]
	} ]
});
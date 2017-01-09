Ext.define('KLKK.view.officialAccountView.OfficialAccountFormSearch', {
	extend : 'Ext.form.Panel',
	alias : 'widget.officialaccountformsearch',
	maxHeight : 80,
	autoScroll : true,
	defaultType : 'textfield',
	layout : {
		type : 'table',
		columns : 3
	},
	defaults : {
		margin : '5 10 5 20',
		labelWidth : 70
	},
	items : [  {
		fieldLabel : '标题',
		name : 'title',
		xtype : 'textfield'
	},{
		fieldLabel : '标题信息',
		name : 'titleDesc',
		xtype : 'textfield'
	}, {
		xtype : 'container',
		defaults : {
			margin : '5 10 5 0',
			width : 100
		},
		items : [ {
			xtype : 'button',
			itemId : 'searchAllOfficialAccount',
			text : '查询'
		}, {
			xtype : 'button',
			itemId : 'resetAllOfficialAccount',
			text : '重置'
		} ]
	} ]
});
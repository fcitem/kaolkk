Ext.define('KLKK.view.systemView.SystemSetFormPanel', {
	extend : 'Ext.form.Panel',
	alias : 'widget.systemsetformpanel',
	// maxHeight : 80,
	autoScroll : true,
	defaults : {
		margin : '5 10 5 20'
	},
	items : [ {
		xtype : 'container',
		defaultType : 'button',
		layout : {
			type : 'table',
			columns : 3
		},
		items : [ {
			text : '添加',
			itemId : 'add',
			margin : '0 5 0 0',
			hidden: true,
			disabled : true
		}, {
			text : '保存',
			itemId : 'save',
			margin : '0 5 0 5',
			disabled : false
		}, {
			text : '取消',
			margin : '0 5 0 5',
			itemId : 'cancle'
		} ]
	}, {
		xtype : 'container',
		defaultType : 'combobox',
		layout : {
			type : 'table',
			columns : 2
		},
		items : [ {
			fieldLabel : '当前启用版本',
			itemId:'version',
			name:'version',
			queryMode : 'local',
			editable : false,
			store : Ext.create('Ext.data.Store', {
				fields : [ 'value', 'text' ],
				data : [ {
					"value" : "1.0",
					"text" : "1.0"
				}, {
					"value" : "2.0",
					"text" : "2.0"
				} ]
			}),
			value : '1.0',
			valueField : 'value',
			displayField : 'text'
		}, {
			xtype : 'label',
			name : 'cc'
		} ]
	},{
		xtype : 'container',
		hidden: true,
		defaultType : 'hiddenfield',
		items:[{
			name : 'id',
			itemId: 'systemId',
			xtype : 'hiddenfield'
		},{
			name : 'userId',
			itemId: 'userId',
			xtype : 'hiddenfield'
		}]
	} ]
});
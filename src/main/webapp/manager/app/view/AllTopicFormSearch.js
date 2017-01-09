Ext.define('KLKK.view.AllTopicFormSearch', {
	extend : 'Ext.form.Panel',
	alias : 'widget.alltopicformsearch',
	maxHeight : 80,
	itemId : 'allTopickSearchForm',
	autoScroll : true,
	defaultType : 'combobox',
	layout : {
		type : 'table',
		columns : 4
	},
	defaults : {
		margin : '5 10 5 10',
		labelWidth : 70
	},
	items : [  {
		fieldLabel : '选题类型',
		name : 'productionType',
		queryMode : 'local',
		editable : false,
		store : Ext.create('Ext.data.Store', {
			fields : [ 'value', 'text' ],
			data : [ {
				"value" : "互联网及创业",
				"text" : "互联网及创业"
			}, {
				"value" : "励志",
				"text" : "励志"
			}, {
				"value" : "人文与社科",
				"text" : "人文与社科"
			}, {
				"value" : "金融",
				"text" : "金融"
			}, {
				"value" : "经管",
				"text" : "经管"
			}, {
				"value" : "传记",
				"text" : "传记"
			}, {
				"value" : "其他",
				"text" : "其他"
			},{
				"value" : "",
				"text" : "所有"
			} ]
		}),
		value: '',
		valueField : 'value',
		displayField : 'text'
	},{
		fieldLabel : '选题内容',
		name : 'content',
		xtype : 'textfield'
	}, {
		fieldLabel : '审核通过',
		name : 'pass',
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
	}, {
		xtype : 'container',
		defaults : {
			margin : '5 10 5 0',
			width : 100
		},
		items : [ {
			xtype : 'button',
			itemId : 'searchAllTopic',
			text : '查询'
		}, {
			xtype : 'button',
			itemId : 'resetAllTopic',
			text : '重置'
		} ]
	} ]
});
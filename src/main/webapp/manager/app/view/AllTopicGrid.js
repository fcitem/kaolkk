Ext.define('KLKK.view.AllTopicGrid', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.alltopicgrid',
	loadMask : true,
	store : 'AllTopicStore',
	selModel : Ext.create('Ext.selection.CheckboxModel', {
		mode : "SIMPLE"
	}),
	columns : [
			{
				text : '选题类型',
				dataIndex : 'productionType',
				align : 'center',
				flex : 0.2
			},
			{
				text : '选题内容',
				dataIndex : 'content',
				align : 'center',
				flex : 0.2,
				renderer : function(value, metadata, record, rowIndex,
						colIndex, store, view) {
					metadata.tdAttr = 'data-qtip="' + value + '"';
					return value;
				}
			},
			{
				text : '用户姓名',
				dataIndex : 'displayUser.username',
				align : 'center',
				flex : 0.2
			},
			{
				text : '用户邮箱',
				dataIndex : 'displayUser.email',
				align : 'center',
				flex : 0.2
			},
			{
				text : "是否焦点图显示",
				dataIndex : 'headerDisplay',
				flex : 0.2,
				align : 'center',
				renderer : function(value, metadata, record, rowIndex,
						colIndex, store, view) {
					if (value == '1') {
						return "是";
					} else {
						return "否";
					}
				}
			},
			{
				text : "焦点内容描述",
				dataIndex : 'headerMsg',
				align : 'center',
				flex : 0.2,
				renderer : function(value, metadata, record, rowIndex,
						colIndex, store, view) {
					metadata.tdAttr = 'data-qtip="' + value + '"';
					return value;
				}
			},
			{
				text : "审核通过",
				dataIndex : 'pass',
				flex : 0.2,
				align : 'center',
				hidden : false,
				renderer : function(value, metadata, record, rowIndex,
						colIndex, store, view) {
					if (value == '1') {
						return "是";
					} else {
						return "否";
					}
				}
			}, {
				text : "排序",
				dataIndex : 'sort',
				align : 'center',
				flex : 0.1
			} ],
	initComponent : function() {
		Ext.apply(this, {
			tbar : [{
				text : "新增",
				itemId : "add",
				action : 'add'
			}, {
				text : "编辑",
				itemId : "allTopicEdit",
				disabled : true,
				action : 'edit'
			}, {
				text : "删除",
				itemId : "allTopicDelete",
				disabled : true,
				action : 'del'
			}, {
				text : "审核通过",
				itemId : "allTopicCheck",
				disabled : true
			}, {
				text : "取消审核通过",
				itemId : "cancleAllTopictCheck",
				disabled : true
			} ]
		});
		this.callParent(arguments);
	},
	dockedItems : [ {
		xtype : 'pagingtoolbar',
		store : "AllTopicStore", // same store GridPanel is using
		dock : 'bottom',
		displayInfo : true
	} ]
});
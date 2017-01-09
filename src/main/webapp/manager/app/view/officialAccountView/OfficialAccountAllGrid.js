Ext.define('KLKK.view.officialAccountView.OfficialAccountAllGrid', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.officialaccountallgrid',
	loadMask : true,
	store : 'officialAccountStore.OfficialAccountAllStore',
	selModel : Ext.create('Ext.selection.CheckboxModel', {
		mode : "SIMPLE"
	}),
	columns : [
			{
				text : '标题',
				dataIndex : 'title',
				align : 'center',
				flex : 0.1
			},
			{
				text : '标题描述',
				dataIndex : 'titleDesc',
				align : 'center',
				flex : 0.1
			},
			{
				text : '图片',
				dataIndex : 'image.name',
				align : 'center',
				flex : 0.1,
				renderer : function(value, metadata, record, rowIndex,
						colIndex, store, view) {
					metadata.tdAttr = 'data-qtip="' + value + '"';
					return value;
				}
			},{
				text : "是否顶部显示",
				dataIndex : 'focus',
				flex : 0.1,
				align : 'center',
				renderer : function(value, metadata, record, rowIndex,
						colIndex, store, view) {
					if (value =="1") {
						return '是';
					} else {
						return "否";
					}
				}
			},
			{
				text : 'URL',
				dataIndex : 'url',
				align : 'center',
				flex : 0.1,
				renderer : function(value, metadata, record, rowIndex,
						colIndex, store, view) {
					metadata.tdAttr = 'data-qtip="' + value + '"';
					return value;
				}
			},{
				text : '焦点图排序',
				dataIndex : 'focusSort',
				align : 'center',
				hiddent: true,
				flex : 0.1
			},{
				text : '排序',
				dataIndex : 'sort',
				align : 'center',
				flex : 0.1
			}],
	initComponent : function() {
		Ext.apply(this, {
			tbar : [ {
				text : "新增",
				itemId : "add",
				action : 'add'
			},{
				text : "编辑",
				itemId : "officialAccountGridEdit",
				disabled : true,
				action : 'edit'
			}, {
				text : "删除",
				itemId : "officialAccountGridDelete",
				disabled : true,
				action : 'del'
			} ]
		});
		this.callParent(arguments);
	},
	dockedItems : [ {
		xtype : 'pagingtoolbar',
		store : "officialAccountStore.OfficialAccountAllStore", // same store GridPanel is using
		dock : 'bottom',
		displayInfo : true
	} ]
});
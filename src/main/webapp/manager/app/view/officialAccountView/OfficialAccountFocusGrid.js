Ext.define('KLKK.view.officialAccountView.OfficialAccountFocusGrid', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.officialaccountfocusgrid',
	loadMask : true,
	store : 'officialAccountStore.OfficialAccountFocusStore',
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
				flex : 0.1,
				renderer : function(value, metadata, record, rowIndex,
						colIndex, store, view) {
					metadata.tdAttr = 'data-qtip="' + value + '"';
					return value;
				}
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
				flex : 0.1
			},{
				text : '排序',
				hidden : true,
				dataIndex : 'sort',
				align : 'center',
				flex : 0.1
			}],
	initComponent : function() {
		Ext.apply(this, {
			tbar : [{
				text : "编辑",
				itemId : "officialAccountFocusEdit",
				disabled : true,
				action : 'edit'
			}, {
				text : "取消焦点图显示",
				itemId : "officialAccountFocusCancle",
				disabled : true,
				action : 'del'
			},{
				xtype:'label',
				text:'提示：公众号顶部信息默认是取下面表格的第一条数据显示',
				style:{
					color: 'red'
				},
				margin:'0 0 0 20'
			} ]
		});
		this.callParent(arguments);
	},
	dockedItems : [ {
		xtype : 'pagingtoolbar',
		store : "officialAccountStore.OfficialAccountFocusStore", // same store GridPanel is using
		dock : 'bottom',
		displayInfo : true
	} ]
});
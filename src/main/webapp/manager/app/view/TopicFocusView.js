Ext.define('KLKK.view.TopicFocusView', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.topicfocusview',
	loadMask: true,
	store : 'TopicFocusStore',
	selModel: Ext.create('Ext.selection.CheckboxModel',{mode:"SIMPLE"}),
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
				hidden: true,
				align : 'center',
				flex : 0.2
			},
			{
				text : '用户邮箱',
				dataIndex : 'displayUser.email',
				hidden: true,
				align : 'center',
				flex : 0.2
			},
			{
				text : "是否焦点图显示",
				dataIndex : 'headerDisplay',
				flex : 0.2,
				hidden: true,
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
				hidden : true,
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
				dataIndex : 'indexFocusSort',
				align : 'center',
				flex : 0.1
			} ],
	initComponent : function() {
		Ext.apply(this, {
			tbar : [ {
				text : "编辑",
				disabled: true,
				itemId: 'topicFocusEdit',
				action : 'edit'
			}, {
				text : "取消首页焦点显示",
				disabled: true,
				itemId: 'cancleTopicFocusDisplay',
				action : 'del'
			},{
				xtype:'label',
				text:'提示：出版人自动滚动显示默认是取下面表格的前3条数据显示',
				style:{
					color: 'red'
				},
				margin:'0 0 0 20'
			} ]
		});
		this.callParent(arguments);
	},
	dockedItems: [{
        xtype: 'pagingtoolbar',
        store: "TopicFocusStore",   // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
    }]
});
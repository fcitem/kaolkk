Ext.define('KLKK.view.userView.UserGrid', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.usergrid',
	loadMask : true,
	store : 'userStore.UserStore',
	selModel : Ext.create('Ext.selection.CheckboxModel', {
		mode : "SIMPLE"
	}),
	columns : [
			{
				text : '用户姓名',
				dataIndex : 'username',
				align : 'center',
				flex : 0.1
			},
			{
				text : '笔名',
				dataIndex : 'pseudonym',
				align : 'center',
				flex : 0.1
			},
			{
				text : '邮箱',
				dataIndex : 'email',
				align : 'center',
				flex : 0.1,
				renderer : function(value, metadata, record, rowIndex,
						colIndex, store, view) {
					metadata.tdAttr = 'data-qtip="' + value + '"';
					return value;
				}
			},{
				text : "是否验证",
				dataIndex : 'active',
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
				text : '身份状态',
				dataIndex : 'status',
				align : 'center',
				flex : 0.1,
				renderer : function(value, metadata, record, rowIndex,
						colIndex, store, view) {
					metadata.tdAttr = 'data-qtip="' + value + '"';
					if (value == '1') {
						return "创作者";
					} else if (value =='0'){
						return "出版人";
					} else {
						return "";
					}
				}
			},
			{
				text : '手机号码',
				dataIndex : 'phone',
				align : 'center',
				flex : 0.1,
				renderer : function(value, metadata, record, rowIndex,
						colIndex, store, view) {
					metadata.tdAttr = 'data-qtip="' + value + '"';
					return value;
				}
			},
			{
				text : '自我介绍',
				dataIndex : 'introductionMyselef',
				align : 'center',
				flex : 0.15,
				renderer : function(value, metadata, record, rowIndex,
						colIndex, store, view) {
					metadata.tdAttr = 'data-qtip="' + value + '"';
					return value;
				}
			},
			{
				text : "擅长领域",
				dataIndex : 'speciality',
				flex : 0.15,
				align : 'center',
				renderer : function(value, metadata, record, rowIndex,
						colIndex, store, view) {
					metadata.tdAttr = 'data-qtip="' + value + '"';
					return value;
				}
			},
			{
				text : "代表作品",
				dataIndex : 'representativeWorks',
				align : 'center',
				flex : 0.15,
				renderer : function(value, metadata, record, rowIndex,
						colIndex, store, view) {
					metadata.tdAttr = 'data-qtip="' + value + '"';
					return value;
				}
			},
			{
				text : "出版类型",
				dataIndex : 'publishType',
				align : 'center',
				flex : 0.15,
				renderer : function(value, metadata, record, rowIndex,
						colIndex, store, view) {
					metadata.tdAttr = 'data-qtip="' + value + '"';
					return value;
				}
			},
			{
				text : "作品类型",
				dataIndex : 'productionType',
				align : 'center',
				flex : 0.15,
				renderer : function(value, metadata, record, rowIndex,
						colIndex, store, view) {
					metadata.tdAttr = 'data-qtip="' + value + '"';
					return value;
				}
			},
			{
				text : "选题要求",
				dataIndex : 'topicRequire',
				align : 'center',
				flex : 0.15,
				renderer : function(value, metadata, record, rowIndex,
						colIndex, store, view) {
					metadata.tdAttr = 'data-qtip="' + value + '"';
					return value;
				}
			},
			{
				text : "用户头像",
				dataIndex : 'image.name',
				flex : 0.15,
				align : 'center',
				hidden : true,
				renderer : function(value, metadata, record, rowIndex,
						colIndex, store, view) {
					metadata.tdAttr = 'data-qtip="' + value + '"';
					return value;
				}
			}, {
				text : "是否是管理员",
				dataIndex : 'manager',
				align : 'center',
				flex : 0.15,
				renderer : function(value, metadata, record, rowIndex,
						colIndex, store, view) {
					metadata.tdAttr = 'data-qtip="' + value + '"';
					if (value) {
						return "是";
					} else {
						return "否";
					}
				}
			} ],
	initComponent : function() {
		Ext.apply(this, {
			tbar : [ {
				text : "新增",
				itemId : "add",
				action : 'add'
			},{
				text : "编辑",
				itemId : "userGridEdit",
				disabled : true,
				action : 'edit'
			}, {
				text : "删除",
				itemId : "userGridDelete",
				disabled : true,
				action : 'del'
			}, {
				text : "设置为管理员",
				itemId : "setManager",
				disabled : true
			}, {
				text : "取消管理员",
				itemId : "cancaleManager",
				disabled : true
			} ]
		});
		this.callParent(arguments);
	},
	dockedItems : [ {
		xtype : 'pagingtoolbar',
		store : "userStore.UserStore", // same store GridPanel is using
		dock : 'bottom',
		displayInfo : true
	} ]
});
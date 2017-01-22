Ext.define('KLKK.view.wyAPI', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.wyAPI',
	loadMask: true,
	store : 'WyApiStore',
	selModel: Ext.create('Ext.selection.CheckboxModel',{mode:"SIMPLE"}),
	columns : [
			{
				text : '作品名称',
				dataIndex : 'name',
				align: 'center',
				flex : 0.2
			},
			{
				text : "当前状态",
				dataIndex : 'status',
				flex : 0.2,
				align: 'center',
				renderer : function(value, metadata, record, rowIndex,
						colIndex, store, view) {
					if (value == "1") {
						return "写作中";
					} else if (value == "2") {
						return '书稿已完成';
					} else {
						return "已有写作计划";
					}
				}
			},
			{
				text : "作品类型",
				dataIndex : 'productionType',
				align: 'center',
				flex : 0.2
			},
			{
				text : "全书字数",
				dataIndex : 'totalWord',
				align: 'center',
				flex : 0.2
			},
			{
				text : "计划完成时间",
				dataIndex : 'completeYear',
				flex : 0.2,
				align: 'center',
				hidden: true,
				renderer : function(value, metadata, record, rowIndex,
						colIndex, store, view) {

					var str = value + record.get("completeMonth")
							+ record.get("completeWeek");
					return str;
				}
			},
			{
				text : "当前完成进度",
				dataIndex : 'completeProcess',
				hidden: true,
				align: 'center',
				flex : 0.2
			},
			{
				text : "作品图片",
				dataIndex : 'image.name',
				flex : 0.2,
				renderer : function(value, metadata, record, rowIndex,
						colIndex, store, view) {
					metadata.tdAttr = 'data-qtip="' + value + '"'; 
					return value;
				}
			},
			{
				text : "我的一句话推荐",
				dataIndex : 'recommendMyself',
				flex : 0.2,
				hidden: true,
				renderer : function(value, metadata, record, rowIndex,
						colIndex, store, view) {
					metadata.tdAttr = 'data-qtip="' + value + '"'; 
					return value;
				}
			},
			{
				text : "目标读者",
				dataIndex : 'targerReader',
				flex : 0.2,
				hidden: true,
				renderer : function(value, metadata, record, rowIndex,
						colIndex, store, view) {
					metadata.tdAttr = 'data-qtip="' + value + '"'; 
					return value;
				}
			},
			{
				text : "内容简介",
				dataIndex : 'introductionContent',
				flex : 0.2,
				hidden: true,
				renderer : function(value, metadata, record, rowIndex,
						colIndex, store, view) {
					metadata.tdAttr = 'data-qtip="' + value + '"'; 
					return value;
				}
			},
			{
				text : "作者简介",
				dataIndex : 'introductionAuthor',
				flex : 0.2,
				hidden: true,
				renderer : function(value, metadata, record, rowIndex,
						colIndex, store, view) {
					metadata.tdAttr = 'data-qtip="' + value + '"'; 
					return value;
				}
			},
			{
				text : "人物角色设定",
				hidden: true,
				dataIndex : 'characterSet',
				flex : 0.2,
				renderer : function(value, metadata, record, rowIndex,
						colIndex, store, view) {
					metadata.tdAttr = 'data-qtip="' + value + '"'; 
					return value;
				}
			},
			{
				text : "情节设定",
				dataIndex : 'plotSet',
				flex : 0.2,
				hidden: true,
				renderer : function(value, metadata, record, rowIndex,
						colIndex, store, view) {
					metadata.tdAttr = 'data-qtip="' + value + '"'; 
					return value;
				}
			},
			{
				text : "图书目录",
				dataIndex : 'bookCatalogue',
				hidden: true,
				flex : 0.2,
				renderer : function(value, metadata, record, rowIndex,
						colIndex, store, view) {
					metadata.tdAttr = 'data-qtip="' + value + '"'; 
					return value;
				}
			},
			{
				text : "样章",
				dataIndex : 'sampleChapter',
				hidden: true,
				flex : 0.2,
				renderer : function(value, metadata, record, rowIndex,
						colIndex, store, view) {
					metadata.tdAttr = 'data-qtip="' + value + '"'; 
					return value;
				}
			},
			{
				text : "是否提交",
				dataIndex : 'commit',
				flex : 0.2,
				align: 'center',
				hidden: true,
				renderer : function(value, metadata, record, rowIndex,
						colIndex, store, view) {
					if (value) {
						return "是";
					} else {
						return "否";
					}
				}
			}, {
				text : "是否主页显示",
				dataIndex : 'mainPageDisplay',
				flex : 0.2,
				align: 'center',
				renderer : function(value, metadata, record, rowIndex,
						colIndex, store, view) {
					if (value) {
						return "是";
					} else {
						return "否";
					}
				}
			},{
				text : "焦点标题",
				dataIndex : 'focusTitle',
				flex : 0.2,
				renderer : function(value, metadata, record, rowIndex,
						colIndex, store, view) {
					metadata.tdAttr = 'data-qtip="' + value + '"'; 
					return value;
				}
			},{
				text : "焦点描述",
				dataIndex : 'focusDesc',
				flex : 0.2,
				renderer : function(value, metadata, record, rowIndex,
						colIndex, store, view) {
					metadata.tdAttr = 'data-qtip="' + value + '"'; 
					return value;
				}
			}, {
				text : "当当网url",
				dataIndex : 'url',
				hidden: true,
				flex : 0.2
			}, {
				text : "排序",
				dataIndex : 'indexFocusSort',
				align: 'center',
				flex : 0.2
			} ],
	initComponent : function() {
		Ext.apply(this, {
			tbar : [ {
				text : "上传新书",
				iconCls : 'btn-add',
				disabled: false,
				itemId: 'bookadd',
				action : 'add'
			}, {
				text : "修改书稿",
				iconCls : 'btn-update',
				disabled: false,
				itemId: 'bookupdate',
				action : 'del'
			}, {
				text : "编辑信息",
				iconCls : 'btn-edit',
				disabled: false,
				itemId: 'bookedit',
				action : 'del'
			}, {
				text : "删除下架",
				iconCls : 'btn-del',
				disabled: false,
				itemId: 'bookdelete',
				action : 'del'
			}]
		});
		this.callParent(arguments);
	},
	dockedItems: [{
        xtype: 'pagingtoolbar',
        store: "IndexFocusStore",   // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
    }]
});
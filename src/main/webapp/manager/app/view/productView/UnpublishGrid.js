Ext.define('KLKK.view.productView.UnpublishGrid', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.unpublishgrid',
//	title : '学生信息列表',
	loadMask: true,
//	layout : 'fit',
	store : 'productStore.UnpublishStore',
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
				hidden: true,
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
				hidden: true,
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
					metadata.tdAttr = 'data-qtip="' + str + '"'; 
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
				renderer : function(value, metadata, record, rowIndex,
						colIndex, store, view) {
					metadata.tdAttr = 'data-qtip="' + value + '"'; 
					return value;
				}
			},
			{
				text : "作者姓名",
				dataIndex : 'displayUser.username',
				flex : 0.2,
				renderer : function(value, metadata, record, rowIndex,
						colIndex, store, view) {
					metadata.tdAttr = 'data-qtip="' + value + '"'; 
					return value;
				}
			},
			{
				text : "作者邮箱",
				dataIndex : 'displayUser.email',
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
				flex : 0.1,
				hidden: true,
				align: 'center',
				renderer : function(value, metadata, record, rowIndex,
						colIndex, store, view) {
					if (value) {
						return "是";
					} else {
						return "否";
					}
				}
			}, {
				text : "当当网url",
				dataIndex : 'url',
				flex : 0.2,
				hidden: true,
				renderer : function(value, metadata, record, rowIndex,
						colIndex, store, view) {
					metadata.tdAttr = 'data-qtip="' + value + '"'; 
					return value;
				}
			},{
				text : "审核通过",
				dataIndex : 'pass',
				flex : 0.2,
				align: 'center',
				hidden: true,
				renderer : function(value, metadata, record, rowIndex,
						colIndex, store, view) {
					if (value == '1') {
						return "是";
					} else {
						return "否";
					}
				}
			},{
				text : "编辑推荐",
				dataIndex : 'editorRecommend',
				align: 'center',
				flex : 0.1
			},{
				text : "广告语",
				dataIndex : 'advertising',
				flex : 0.2,
				hidden: true,
				renderer : function(value, metadata, record, rowIndex,
						colIndex, store, view) {
					metadata.tdAttr = 'data-qtip="' + value + '"'; 
					return value;
				}
			},{
				text : "本书卖点",
				dataIndex : 'sellingPoint',
				flex : 0.2,
				hidden: true,
				renderer : function(value, metadata, record, rowIndex,
						colIndex, store, view) {
					metadata.tdAttr = 'data-qtip="' + value + '"'; 
					return value;
				}
			}, {
				text : "排序",
				dataIndex : 'sort',
				align: 'center',
				flex : 0.1
			} ],
	initComponent : function() {
		Ext.apply(this, {
			tbar : [ {
				text : "编辑",
				itemId: "unpublishEdit",
				disabled: true,
				action : 'edit'
			}, {
				text : "删除",
				itemId: "unpublishDelete",
				disabled: true,
				action : 'del'
			},{
				xtype:'label',
				text:'提示：首页未出版精选作品默认是取下面表格的前2条数据显示',
				style:{
					color: 'red'
				},
				margin:'0 0 0 20'
			}]
		});
		this.callParent(arguments);
	},
	dockedItems: [{
        xtype: 'pagingtoolbar',
        store: "productStore.UnpublishStore",   // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
    }]
});
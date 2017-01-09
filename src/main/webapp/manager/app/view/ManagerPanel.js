Ext.define('KLKK.view.ManagerPanel', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.managerpanel',
	title : '列表详情',
	layout : 'border',
	items : [ {
		region : 'south',
		height : 350,
		split : true,
		margins : '0 5 5 5',
		xtype : 'tabpanel',
		itemId : 'southPanel',
		activeTab: 0,
		defaults : {
			closable : false
		},
		items : [ {
			xtype : 'panel',
			title : '所有作品',
			items : [ {
				xtype : 'form',
				maxHeight : 80,
				itemId: 'productForm',
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
				items : [ {
					fieldLabel : '作品名称',
					name : 'name',
					xtype : 'textfield'
				}, {
					fieldLabel : '当前状态',
					queryMode : 'local',
					name : 'status',
					editable: false,
					store :  Ext.create('Ext.data.Store', {
					    fields: ['value', 'text'],
					    data : [{
							"value":"0", 
							"text":"已有写作计划"
						},{
							"value":"1", 
							"text":"写作中"
						},{
							"value":"2", 
							"text":"书稿已完成"
						},{
							"value":"", 
							"text":"所有"
						}]
					}),
					value: '',
					valueField : 'value',
					displayField : 'text'
				}, {
					fieldLabel : '作品类型',
					name : 'productionType',
					queryMode : 'local',
					editable: false,
					store :  Ext.create('Ext.data.Store', {
					    fields: ['value', 'text'],
					    data : [{
							"value":"互联网及创业", 
							"text":"互联网及创业"
						},{
							"value":"励志", 
							"text":"励志"
						},{
							"value":"人文与社科", 
							"text":"人文与社科"
						},{
							"value":"金融", 
							"text":"金融"
						},{
							"value":"经管", 
							"text":"经管"
						},{
							"value":"传记", 
							"text":"传记"
						},{
							"value":"其他", 
							"text":"其他"
						},{
							"value":"", 
							"text":"所有"
						}]
					}),
					value: '',
					valueField : 'value',
					displayField : 'text'
				}, {
					fieldLabel : '是否提交',
					name : 'commit',
					queryMode : 'local',
					editable: false,
					store :  Ext.create('Ext.data.Store', {
					    fields: ['value', 'text'],
					    data : [{
							"value":false, 
							"text":"否"
						},{
							"value":true, 
							"text":"是"
						},{
							"value":"", 
							"text":"所有"
						}]
					}),
					value:'',
					valueField : 'value',
					displayField : 'text'
				},{
					xtype: 'container',
					defaultType : 'combobox',
					layout : {
						type : 'table',
						columns : 5
					},
					items:[{
						fieldLabel : '完成时间年',
						queryMode : 'local',
						name: 'completeYear',
						itemId: 'completeYear',
						editable: false,
						width: 140,
						labelWidth: 70,
						store :  Ext.create('Ext.data.Store', {
						    fields: ['value', 'text'],
						    data : []
						}),
						valueField : 'value',
						displayField : 'text'
					},{
						name : 'completeMonth',
						queryMode : 'local',
						width: 50,
						editable: false,
						store :  Ext.create('Ext.data.Store', {
						    fields: ['value', 'text'],
						    data : [
						            {"value":"1月", "text":"1月"},
						            {"value":"2月", "text":"2月"},
						            {"value":"3月", "text":"3月"},
						            {"value":"4月", "text":"4月"},
						            {"value":"5月", "text":"5月"},
						            {"value":"6月", "text":"6月"},
						            {"value":"7月", "text":"7月"},
						            {"value":"8月", "text":"8月"},
						            {"value":"9月", "text":"9月"},
						            {"value":"10月", "text":"10月"},
						            {"value":"11月", "text":"11月"},
						            {"value":"12月", "text":"12月"},
						    ]
						}),
						valueField : 'value',
						displayField : 'text'
					},{
						name : 'completeWeek',
						queryMode : 'local',
						editable: false,
						width: 60,
						store :  Ext.create('Ext.data.Store', {
						    fields: ['value', 'text'],
						    data : [{
								"value":"第一周", 
								"text":"第一周"
							},{
								"value":"第二周", 
								"text":"第二周"
							},{
								"value":"第三周", 
								"text":"第三周"
							},{
								"value":"第四周", 
								"text":"第四周"
							}]
						}),
						valueField : 'value',
						displayField : 'text'
					}]
				}, {
					fieldLabel : '审核通过',
					name : 'pass',
					queryMode : 'local',
					editable: false,
					store :  Ext.create('Ext.data.Store', {
					    fields: ['value', 'text'],
					    data : [{
							"value":"0", 
							"text":"否"
						},{
							"value":"1", 
							"text":"是"
						},{
							"value":"", 
							"text":"所有"
						}]
					}),
					value: '',
					valueField : 'value',
					displayField : 'text'
				}, {
					xtype: 'container',
					defaults : {
						margin : '5 10 5 0',
						width : 100
					},
					items:[{
						xtype : 'button',
						itemId: 'searchProduct',
						text : '查询'
					},{
						xtype : 'button',
						itemId: 'resetProduct',
						text : '重置'
					}]
				} ]

			}, {
				xtype : 'allproductview',
				height : 250,
				itemId : 'allProduct'
			} ]
		}, {
			xtype : 'panel',
			title : '所有选题',
			itemId: 'allTopicPanel',
			items : [ {
				xtype : 'alltopicformsearch'
			}, {
				xtype : 'alltopicgrid',
				itemId: 'allTopicGrid',
				height : 280,
			} ]
		},{
			xtype : 'panel',
			title : '所有用户',
			itemId: 'userPanel',
			items : [ {
				xtype : 'userformsearch',
				itemId : 'userFormSearch'
			},
			{
				xtype : 'usergrid',
				itemId: 'userGrid',
				height : 250,
			}]
		},{
			xtype : 'panel',
			title : '公众号',
			itemId: 'officialAccountPanel',
			items : [ {
				xtype : 'officialaccountformsearch',
				itemId : 'officialAccountFormSearch'
			},
			{
				xtype : 'officialaccountallgrid',
				itemId: 'officialAccountAllGrid',
				height : 280,
			}]
		} ]
	}, {
		title : '功能列表',
		region : 'west',
		xtype : 'panel',
		margins : '5 0 0 5',
		width : 200,
		collapsible : true, // make collapsible
		id : 'west-region-container',
		layout : 'fit',
		items : [ {
			xtype : 'treepanel',
			rootVisible : true,
			itemId: 'treePanel',
			lines : true,
			root : {
				expanded : true,
				text : '考拉看看',
				children : [ {
					text : "首页页面设置",
					expanded : true,
					children: [{
						text : "焦点设置",
						cls:"leafNode",
						tabId: 'indexFocus',
						leaf : true
					},{
						text : "未出版作品设置",
						cls:"leafNode",
						tabId: 'unpublishGrid',
						leaf : true
					},{
						text : "已出版作品设置",
						cls:"leafNode",
						tabId: 'publishGrid',
						leaf : true
					}]
				}, {
					text : "出版人页面设置",
					expanded : true,
					children : [ {
						text : "焦点图设置",
						cls:"leafNode",
						tabId: 'topicfocusview',
						leaf : true
					}]
				},{
					text : "公众号设置",
					expanded : true,
					children : [ {
						text : "焦点图设置",
						cls:"leafNode",
						tabId: 'officialAccountFocusGrid',
						leaf : true
					}]
				},{
					text : "全局设置",
					expanded : true,
					children : [ {
						text : "系统设置",
						cls:"leafNode",
						tabId: 'systemSetFormPanel',
						leaf : true
					}]
				}]
			}
		} ]
	}, {
		region : 'center', // center region is required, no width/height specified
		xtype : 'tabpanel',
		layout : 'fit',
		activeTab: 0,
		itemId: 'centerPanel',
		margins : '5 5 0 0',
		defaults : {
			closable : false
		},
		items : [ {
			xtype : 'indexfocus',
			title : '首页焦点设置',
			group : 'product',
			itemId : 'indexFocus'
		}, {
			xtype : 'unpublishgrid',
			title : '首页未出版作品设置',
			group : 'product',
			itemId : 'unpublishGrid'
		},{
			xtype : 'publishgrid',
			title : '首页已出版作品设置',
			group : 'product',
			itemId : 'publishGrid'
		},{
			xtype : 'topicfocusview',
			title : '出版人页面焦点设置',
			itemId : 'topicfocusview'
		},{
			xtype : 'officialaccountfocusgrid',
			title : '公众号焦点图设置',
			itemId : 'officialAccountFocusGrid'
		},{
			xtype : 'systemsetformpanel',
			title : '系统设置',
			itemId : 'systemSetFormPanel'
		} ]
	}, {
		title : '图片信息',
		region : 'east', // center region is required, no width/height specified
		xtype : 'panel',
//		layout : 'fit',
		split : true,
		width : 260,
		layout : {
			type : 'table',
			columns : 1
		},
		collapsible : true,
		margins : '5 5 0 0',
		items:[{
			xtype: 'image',
			width: '130px',
			height: '180px',
			itemId: 'picturePath',
			margin: '10 20 10 80',
			src:''
		},{
			xtype: 'label',
			margin: '10 0 10 20',
			text:'图片路径:'
		},{
			xtype: 'label',
			margin: '5 0 0 30',
			itemId: 'pictureText',
			text:''
		}]
	} ]
});

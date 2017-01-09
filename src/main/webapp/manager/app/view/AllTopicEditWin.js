Ext.define('KLKK.view.AllTopicEditWin', {
	extend : 'Ext.window.Window',
	alias : 'widget.alltopiceditwin',
	title : '选题编辑',
	layout : 'fit',
	border : true,
	modal : true,
	closeAction : 'hide',
	width : '600px',
	height : '500px',
	closable : true,
	initComponent : function() {
		this.items = [ {
			xtype : 'form',
			itemId : 'allTopicEditForm',
			border : false,
			autoScroll : true,
			defaultType : 'combobox',
			bodyStyle : {
				background : '#dfe8f6',
				padding : '20px'
			},
			defaults : {
				margin : '5 5 5 50',
				labelWidth : 100
			},
			items : [ {
				fieldLabel : '选题类型',
				name : 'productionType',
				queryMode : 'local',
				editable : false,
				allowBlank: false,
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
					} ]
				}),
				valueField : 'value',
				displayField : 'text'
			}, {
				fieldLabel : '选题内容',
				name : 'content',
				maxLength : 200,
				width : 400,
				allowBlank: false,
				xtype : 'textarea'
			},{
				fieldLabel : '选题用户',
				name : 'displayUserId',
				itemId: 'displayUserId',
				queryMode : 'remote',
				editable : false,
				allowBlank: false,
				triggerAction: 'all',
				store: 'userStore.PublisherStore',
				loadingText: '加载数据中...',
				valueField : 'id',
				displayField : 'username'
			}, {
				fieldLabel : '是否焦点图显示',
				name : 'headerDisplay',
				queryMode : 'local',
				editable : false,
				store : Ext.create('Ext.data.Store', {
					fields : [ 'value', 'text' ],
					data : [ {
						"value" : false,
						"text" : "否"
					}, {
						"value" : true,
						"text" : "是"
					} ]
				}),
				valueField : 'value',
				displayField : 'text'
			}, {
				fieldLabel : '焦点内容描述',
				name : 'headerMsg',
				maxLength : 200,
				width : 400,
				xtype : 'textarea'
			}, {
				fieldLabel : '所有选题中排序',
				name : 'sort',
				maxLength : 10,
				xtype : 'textfield'
			},{
				fieldLabel : '焦点图排序',
				name : 'indexFocusSort',
				maxLength : 10,
				xtype : 'textfield'
			}, {
				name : 'id',
				xtype : 'hiddenfield'
			}, {
				name : 'userId',
				itemId: 'userId',
				xtype : 'hiddenfield'
			}

			]
		} ];
		this.buttons = [ {
			text : '保存',
			itemId : 'allTopicEditSave',
			action : 'save'
		}, {
			text : '取消',
			scope : this,
			handler : this.close
		} ];

		this.callParent(arguments);
	}
});
Ext.define('KLKK.view.ProductEditWin', {
    extend: 'Ext.window.Window',
    alias : 'widget.producteditwin',
    title : '作品编辑',
    layout: 'fit',
    border: true,
    modal: true,
    closeAction: 'hide',
    width: '600px',
	height: '500px',
	closable: true,
    initComponent: function() {
        this.items = [
            {
                xtype: 'form',
                itemId: 'productEditForm',
                border: false,
                autoScroll: true,
                bodyStyle: {
                    background: '#dfe8f6',
                    padding: '20px'
                },
                items: [{
                	xtype:'container',
                	layout: 'hbox',
                	items:[{
                		xtype: 'container',
                		defaultType : 'combobox',
                		defaults : {
        					margin : '5 5 5 10',
        					labelWidth : 100
        				},
                		items:[{
        					fieldLabel : '作品名称',
        					name : 'name',
        					maxLength: 20,
        					allowBlank: false,
        					xtype : 'textfield'
        				},{
        					fieldLabel : '作者姓名',
        					name : 'displayUserId',
        					itemId: 'displayUserId',
        					queryMode : 'remote',
        					editable : false,
        					allowBlank: true,
        					triggerAction: 'all',
        					store: 'userStore.UserStoreNoPage',
        					loadingText: '加载数据中...',
        					valueField : 'id',
        					displayField : 'username'
        				}, {
        					fieldLabel : '当前状态',
        					queryMode : 'local',
        					name : 'status',
        					allowBlank: false,
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
        						}]
        					}),
        					valueField : 'value',
        					displayField : 'text'
        				}, {
        					fieldLabel : '作品类型',
        					name : 'productionType',
        					queryMode : 'local',
        					allowBlank: false,
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
        						}]
        					}),
        					valueField : 'value',
        					displayField : 'text'
        				}, {
        					fieldLabel : '全书字数',
        					name : 'totalWord',
        					queryMode : 'local',
        					editable: false,
        					allowBlank: true,
        					store :  Ext.create('Ext.data.Store', {
        					    fields: ['value', 'text'],
        					    data : [{
        							"value":"10万以下", 
        							"text":"10万以下"
        						},{
        							"value":"10万以上", 
        							"text":"10万以上"
        						}]
        					}),
        					valueField : 'value',
        					displayField : 'text'
        				}, {
        					fieldLabel : '完成时间年',
        					queryMode : 'local',
        					name: 'completeYear',
        					itemId: 'completeYear',
        					editable: false,
        					store :  Ext.create('Ext.data.Store', {
        					    fields: ['value', 'text'],
        					    data : []
        					}),
        					valueField : 'value',
        					displayField : 'text'
        				}, {
        					fieldLabel : '完成时间月',
        					name : 'completeMonth',
        					queryMode : 'local',
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
        				}, {
        					fieldLabel : '完成时间周',
        					name : 'completeWeek',
        					queryMode : 'local',
        					editable: false,
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
        				},{
        					fieldLabel : '完成进度',
        					name : 'completeProcess',
        					maxLength: 5,
        					xtype : 'textfield'
        				}]
                	},{
            			xtype:'form',
            			border: false,
            			itemId: 'allProductEditPictureForm',
            			bodyStyle: {
                            background: '#dfe8f6',
                        },
            			items: [{
                			xtype: 'image',
                			width: '130px',
                			height: '180px',
                			margin: '0 0 0 80px',
                			itemId: 'allProductEditPicturePath'
//                			src:'/klkk/image/upload/1468665569795.jpg'
                		},{
            				xtype:'filefield',
            				width: 240,
            				itemId: 'allProductEditPictureUpload',
            				labelWidth: 60,
            				name: 'file',
            				margin: '5 0 0 10px',
            				buttonText: '选择图片...',
            				fieldLabel: '改变图片',
            			},{
        					name : 'managerId',
        					itemId: 'allProductEditManagerId',
        					xtype : 'hiddenfield'
        				},{
        					name : 'imageId',
        					itemId: 'allProductEditImageId',
        					xtype : 'hiddenfield'
        				}]
            		}]
                },{
                	xtype:'container',
                	defaultType : 'textarea',
                	defaults : {
    					margin : '5 5 5 10',
    					labelWidth : 100,
    					width: 500
    				},
                	items:[{
    					fieldLabel : '我的一句话推荐',
    					name : 'recommendMyself',
    					maxLength: 100
    				},{
    					fieldLabel : '目标读者',
    					name : 'targerReader',
    					maxLength: 200,
    					allowBlank: false
    				},{
    					fieldLabel : '内容简介',
    					allowBlank: false,
    					maxLength: 200,
    					name : 'introductionContent'
    				},{
    					fieldLabel : '作者简介',
    					maxLength: 200,
    					name : 'introductionAuthor'
    				},{
    					fieldLabel : '人物角色设定',
    					maxLength: 200,
    					name : 'characterSet'
    				},{
    					fieldLabel : '情节设定',
    					name : 'plotSet',
    					maxLength: 200
    				},{
    					fieldLabel : '图书目录',
    					maxLength: 200,
    					name : 'bookCatalogue'
    				},{
    					fieldLabel : '样章',
    					maxLength: 1000,
    					name : 'sampleChapter'
    				},{
    					fieldLabel : '编辑推荐',
    					maxLength: 200,
    					name : 'editorRecommend'
    				},{
    					fieldLabel : '出版信息描述',
    					maxLength: 200,
    					name : 'hasPublishDesc'
    				},{
    					fieldLabel : '广告语',
    					maxLength: 200,
    					name : 'advertising'
    				},{
    					fieldLabel : '本书卖点',
    					maxLength: 200,
    					name : 'sellingPoint'
    				},{
    					xtype: 'combobox',
    					fieldLabel : '是否主页显示',
    					name : 'mainPageDisplay',
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
    						}]
    					}),
    					valueField : 'value',
    					displayField : 'text'
    				},{
    					xtype: 'combobox',
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
    						}]
    					}),
    					valueField : 'value',
    					displayField : 'text'
    				},{
    					fieldLabel : '当当网URL',
    					name : 'url',
    					maxLength: 150,
    					xtype : 'textfield'
    				},{
    					fieldLabel : '排序',
    					name : 'sort',
    					maxLength: 10,
    					xtype : 'textfield'
    				}]
                },{
					name : 'id',
					xtype : 'hiddenfield'
				}
				,{
					name : 'userId',
					itemId: 'userId',
					xtype : 'hiddenfield'
				}
				
                ]
            }
        ];
        this.buttons = [
            {
                text: '保存',
                itemId: 'allProductSave',
                action: 'save'
            },
            {
                text: '取消',
                scope: this,
                handler: this.close
            }
        ];

        this.callParent(arguments);
    }
});
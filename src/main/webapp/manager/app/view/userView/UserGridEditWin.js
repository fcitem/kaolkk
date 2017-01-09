Ext.define('KLKK.view.userView.UserGridEditWin', {
    extend: 'Ext.window.Window',
    alias : 'widget.usergrideditwin',
    title : '用户编辑',
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
                itemId: 'userEditForm',
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
        					margin : '10 5 5 10',
        					labelWidth : 100
        				},
                		items:[{
        					fieldLabel : '用户姓名',
        					name : 'username',
        					maxLength: 20,
        					allowBlank: false,
        					xtype : 'textfield'
        				},{
        					fieldLabel : '笔名',
        					name : 'pseudonym',
        					maxLength: 20,
        					xtype : 'textfield'
        				},{
        					fieldLabel : '邮箱',
        					name : 'email',
        					maxLength: 20,
        					vtype: 'email',
        					allowBlank: true,
        					xtype : 'textfield'
        				}, {
        					fieldLabel : '是否验证',
        					queryMode : 'local',
        					name : 'active',
        					editable: false,
        					store :  Ext.create('Ext.data.Store', {
        					    fields: ['value', 'text'],
        					    data : [{
        							"value":"1", 
        							"text":"是"
        						},{
        							"value":"0", 
        							"text":"否"
        						}]
        					}),
        					valueField : 'value',
        					displayField : 'text'
        				}, {
        					fieldLabel : '身份类型',
        					name : 'status',
        					queryMode : 'local',
        					allowBlank: false,
        					editable: false,
        					store :  Ext.create('Ext.data.Store', {
        					    fields: ['value', 'text'],
        					    data : [{
        							"value":"0", 
        							"text":"出版人"
        						},{
        							"value":"1", 
        							"text":"创作者"
        						}]
        					}),
        					valueField : 'value',
        					displayField : 'text'
        				},{
        					fieldLabel : '电话号码',
        					name : 'phone',
        					maxLength: 11,
        					regex:/^1([38]\d|4[57]|5[0-35-9]|7[06-8]|8[89])\d{8}$/,
        					regexText: '请输入一个有效的手机号码',
        					xtype : 'textfield'
        				}]
                	},{
            			xtype:'form',
            			border: false,
            			itemId: 'userGridEditPictureForm',
            			bodyStyle: {
                            background: '#dfe8f6',
                        },
            			items: [{
                			xtype: 'image',
                			width: '130px',
                			height: '180px',
                			margin: '0 0 0 80px',
                			itemId: 'userGridEditPicturePath'
//                			src:'/klkk/image/upload/1468665569795.jpg'
                		},{
            				xtype:'filefield',
            				width: 240,
            				itemId: 'userGridEditPictureUpload',
            				labelWidth: 60,
            				name: 'file',
            				margin: '5 0 0 10px',
            				buttonText: '选择图片...',
            				fieldLabel: '改变图片',
            			},{
        					name : 'managerId',
        					itemId: 'userGridEditManagerId',
        					xtype : 'hiddenfield'
        				},{
        					name : 'imageId',
        					itemId: 'userGridEditImageId',
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
    					fieldLabel : '自我介绍',
    					name : 'introductionMyselef',
    					maxLength: 200
    				},{
    					fieldLabel : '擅长领域',
    					name : 'speciality',
    					maxLength: 200,
    					allowBlank: false
    				},{
    					fieldLabel : '代表作品',
    					allowBlank: false,
    					maxLength: 200,
    					name : 'representativeWorks'
    				},{
    					xtype: 'combobox',
    					fieldLabel : '是否是管理员',
    					name : 'manager',
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
    					fieldLabel : '出版类型',
    					name : 'publishType',
    					maxLength: 20,
    					xtype : 'textfield'
    				},{
    					fieldLabel : '作品类型',
    					name : 'productionType',
    					queryMode : 'local',
    					allowBlank: true,
    					editable: false,
    					xtype : 'combo',
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
    				},{
    					fieldLabel : '选题要求',
    					allowBlank: true,
    					maxLength: 100,
    					name : 'topicRequire'
    				}]
                },{
					name : 'id',
					xtype : 'hiddenfield'
				},{
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
                itemId: 'userEditSave',
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
Ext.define('KLKK.view.IndexFocusEditWin', {
    extend: 'Ext.window.Window',
    alias : 'widget.indexfocuseditwin',
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
                itemId: 'indexFocusEditForm',
                border: false,
                autoScroll: true,
                defaultType : 'combobox',
                bodyStyle: {
                    background: '#dfe8f6',
                    padding: '20px'
                },
                defaults : {
					margin : '5 5 5 50',
					labelWidth : 100
				},
                items: [{
                	xtype: 'container',
                	layout: 'hbox',
                	items:[{
            			xtype: 'image',
            			width: '130px',
            			height: '180px',
            			itemId: 'indexFocusPicturePath',
            			src:''
            		},{
            			xtype:'form',
            			border: false,
            			bodyStyle: {
                            background: '#dfe8f6',
                        },
            			margin:'90 0 0 40px',
            			items: [{
            				xtype:'filefield',
            				width: 260,
            				itemId: 'indexFocusPictureUpload',
            				labelWidth: 60,
            				name: 'file',
            				buttonText: '选择图片...',
            				fieldLabel: '改变图片',
            			},{
        					name : 'managerId',
        					itemId: 'indexFocusManagerId',
        					xtype : 'hiddenfield'
        				},{
        					name : 'imageId',
        					itemId: 'existImageId',
        					xtype : 'hiddenfield'
        				}]
            		}]
                },{
					fieldLabel : '焦点标题',
					name : 'focusTitle',
					maxLength: 20,
					xtype : 'textfield'
				},{
					fieldLabel : '焦点描述',
					name : 'focusDesc',
					maxLength: 150,
					width: 400,
					xtype : 'textarea'
				},{
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
					fieldLabel : '排序',
					name : 'indexFocusSort',
					maxLength: 10,
					xtype : 'textfield'
				},{
					name : 'id',
					xtype : 'hiddenfield'
				}
				
                ]
            }
        ];
        this.buttons = [
            {
                text: '保存',
                itemId: 'indexFocusEditSave',
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
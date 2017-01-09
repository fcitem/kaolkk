Ext.define('KLKK.view.officialAccountView.OfficialAccountAddOrEditWin', {
    extend: 'Ext.window.Window',
    alias : 'widget.officialaccountaddoreditwin',
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
                          itemId: 'officialAccountWinForm',
                          border: true,
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
                      			style: {
                      				border: "1px solid #99bbe8",
                      			},
                      			itemId: 'officialAccountPicturePath',
                      			src:''
                      		},{
                      			xtype:'form',
                      			border: false,
                      			itemId: 'officialAccountPictureForm',
                      			bodyStyle: {
                                      background: '#dfe8f6',
                                  },
                      			margin:'90 0 0 40px',
                      			items: [{
                      				xtype:'filefield',
                      				width: 260,
                      				itemId: 'officialAccountPictureUpload',
                      				labelWidth: 60,
                      				name: 'file',
                      				buttonText: '选择图片...',
                      				fieldLabel: '改变图片',
                      			},{
                  					name : 'managerId',
                  					itemId: 'officialAccountManagerId',
                  					xtype : 'hiddenfield'
                  				},{
                  					name : 'imageId',
                  					itemId: 'officialAccountImageId',
                  					xtype : 'hiddenfield'
                  				}]
                      		}]
                          },{
          					fieldLabel : '标题',
          					name : 'title',
          					width: 450,
          					maxLength: 100,
          					xtype : 'textfield'
          				},{
          					fieldLabel : '标题描述',
          					name : 'titleDesc',
          					maxLength: 200,
          					width: 450,
          					height: 48,
          					xtype : 'textarea'
          				},{
          					fieldLabel : 'URL',
          					name : 'url',
          					maxLength: 1000,
          					width: 450,
          					height: 48,
          					xtype : 'textarea'
          				},{
          					fieldLabel : '是否顶部显示',
          					name : 'focus',
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
          					value: false,
          					displayField : 'text'
          				},{
          					fieldLabel : '顶部显示排序',
          					name : 'focusSort',
          					maxLength: 10,
          					xtype : 'textfield'
          				},{
          					fieldLabel : '排序',
          					name : 'sort',
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
                itemId: 'officialAccountSave',
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
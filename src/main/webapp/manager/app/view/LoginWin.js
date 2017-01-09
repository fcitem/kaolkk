Ext.define('KLKK.view.LoginWin', {
    extend: 'Ext.window.Window',
    alias : 'widget.loginwin',
    title : '考拉看看后台管理-用户登录',
    layout: 'fit',
    autoShow: true,
    border:false,
    width: '300px',
	height: '180px',
	closable: false,
	resizable : false,
	draggable: false,
    initComponent: function() {
        this.items = [
            {
                xtype: 'form',
                border: false,
                itemId: 'loginForm',
                bodyStyle: {
                    background: '#dfe8f6',
                    padding: '20px'
                },
                margin: '20px 10px 20px 10px',
                items: [
                    {
                        xtype: 'textfield',
                        name : 'email',
                        labelWidth: '50px',
                        vtype: 'email',
//                        value:'419851763@qq.com',
                        allowBlank: false,
                        fieldLabel: '邮箱'
                    },
                    {
                        xtype: 'textfield',
                        name : 'password',
                        allowBlank: false,
//                        value: '1234567',
                        inputType: 'password',
                        labelWidth: '50px',
                        fieldLabel: '密码'
                    }
                ]
            }
        ];
        this.buttons = [
            {
                text: '登录',
                action: 'save'
            }
//            {
//                text: '取消',
//                scope: this,
//                handler: this.close
//            }
        ];

        this.callParent(arguments);
    }
});
Ext.application({
	requires : [ 'Ext.container.Viewport' ],
	name : 'KLKK',
	appFolder : 'app',
	controllers : [ 'MainController','UserController','ProductController','SystemSetController','TopicController',
	                'OfficialAccountController'],
	launch : function() {
		console.log("launch triggered!");
		Ext.create('Ext.container.Viewport', {
			layout : 'fit',
			items : [ {
				xtype : 'loginwin'
			}, {
				xtype : 'managerpanel',
				hidden: true,
				itemId: 'managerpanel'
			},{
				xtype : 'producteditwin',
				hidden: true
			},{
				xtype : 'indexfocuseditwin',
				hidden: true
			},{
				xtype : 'alltopiceditwin',
				hidden: true
			},{
				xtype : 'usergrideditwin',
				hidden: true
			},{
				xtype : 'officialaccountaddoreditwin',
				hidden: true
			}]
		});
	}
});
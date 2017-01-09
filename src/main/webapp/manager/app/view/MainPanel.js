Ext.define('KLKK.view.MainPanel', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.mainpanel',
//	layout : {
//		type : 'vbox',
//		align: 'stretch'
//	},
	border : 0,
	initComponent : function() {
		var me = this;
		var items = [ {
			xtype : 'loginwin'
		}, {
			xtype : 'container',
			items: [{
				xtype: 'managerpanel'
			}]
		} ];

		Ext.apply(this, {
			items : [{
				xtype: 'managerpanel'
			}]
		});

		this.callParent();
	}
});
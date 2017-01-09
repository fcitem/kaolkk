Ext.define('KLKK.store.officialAccountStore.OfficialAccountFocusStore', {
	extend : 'Ext.data.Store',
	model : 'KLKK.model.OfficicalAccountModel',
	autoLoad : false,
	pageSize: 20,
	proxy : {
		type : 'ajax',
		url : '/klkk/officialAccount/headerFocus',
		reader : {
			type : 'json',
			root : 'dataList',
			totalProperty: 'total',
			actionMethods : 'get',
			successProperty : 'status'
		}
	}
});


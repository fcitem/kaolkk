Ext.define('KLKK.store.officialAccountStore.OfficialAccountAllStore', {
	extend : 'Ext.data.Store',
	model : 'KLKK.model.OfficicalAccountModel',
	autoLoad : false,
	pageSize: 20,
	proxy : {
		type : 'ajax',
		url : '/klkk/officialAccount/allOfficialAccount',
		reader : {
			type : 'json',
			root : 'dataList',
			totalProperty: 'total',
			actionMethods : 'get',
			successProperty : 'status'
		}
	}
});


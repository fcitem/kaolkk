Ext.define('KLKK.store.systemSetStore.SystemSetStore', {
	extend : 'Ext.data.Store',
	model : 'KLKK.model.SystemSetModel',
	autoLoad : false,
	pageSize: 20,
	proxy : {
		type : 'ajax',
		url : '/klkk/manage/systemSet',
		reader : {
			type : 'json',
			root : 'dataList',
			totalProperty: 'total',
			actionMethods : 'get',
			successProperty : 'status'
		}
	}
});


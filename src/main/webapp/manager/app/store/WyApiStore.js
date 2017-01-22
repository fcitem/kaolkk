Ext.define('KLKK.store.WyApiStore', {
	extend : 'Ext.data.Store',
	model : 'KLKK.model.WyApiModel',
	autoLoad : false,
	pageSize: 20,
	proxy : {
		type : 'ajax',
		url : '/klkk/manage/topic/focus',
		reader : {
			type : 'json',
			root : 'dataList',
			totalProperty: 'total',
			actionMethods : 'get',
			successProperty : 'status'
		}
	}
});
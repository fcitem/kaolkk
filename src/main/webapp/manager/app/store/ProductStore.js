Ext.define('KLKK.store.ProductStore', {
	extend : 'Ext.data.Store',
	model : 'KLKK.model.ProductModel',
	autoLoad : false,
	pageSize: 20,
	proxy : {
		type : 'ajax',
		url : '/klkk/manage/allProduct',
		reader : {
			type : 'json',
			root : 'dataList',
			totalProperty: 'total',
			actionMethods : 'get',
			successProperty : 'status'
		}
	}
});


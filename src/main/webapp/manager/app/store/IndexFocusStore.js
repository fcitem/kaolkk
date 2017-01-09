Ext.define('KLKK.store.IndexFocusStore', {
	extend : 'Ext.data.Store',
	model : 'KLKK.model.ProductModel',
	autoLoad : false,
	pageSize: 50,
	proxy : {
		type : 'ajax',
		url : '/klkk/manage/product/focus',
		reader : {
			type : 'json',
			root : 'dataList',
			totalProperty: 'total',
			actionMethods : 'get',
			successProperty : 'status'
		}
	}
});


Ext.define('KLKK.store.productStore.PublishStore', {
	extend : 'Ext.data.Store',
	model : 'KLKK.model.ProductModel',
	autoLoad : false,
	pageSize: 20,
	proxy : {
		type : 'ajax',
		url : '/klkk/manage/publish/false',
		reader : {
			type : 'json',
			root : 'dataList',
			totalProperty: 'total',
			actionMethods : 'get',
			successProperty : 'status'
		}
	}
});


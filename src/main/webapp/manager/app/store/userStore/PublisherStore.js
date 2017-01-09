Ext.define('KLKK.store.userStore.PublisherStore', {
	extend : 'Ext.data.Store',
	model : 'KLKK.model.UserModel',
	autoLoad : false,
//	pageSize: 20,
	proxy : {
		type : 'ajax',
		url : '/klkk/manage/allPublisher',
		reader : {
			type : 'json',
			root : 'dataList',
			totalProperty: 'total',
			actionMethods : 'get',
			successProperty : 'status'
		}
	}
});


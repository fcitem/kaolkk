Ext.define('KLKK.store.userStore.UserStoreNoPage', {
	extend : 'Ext.data.Store',
	model : 'KLKK.model.UserModel',
	autoLoad : false,
//	pageSize: 20,
	proxy : {
		type : 'ajax',
		url : '/klkk/manage/user?enablePage=false',
		reader : {
			type : 'json',
			root : 'dataList',
			totalProperty: 'total',
			actionMethods : 'get',
			successProperty : 'status'
		}
	}
});


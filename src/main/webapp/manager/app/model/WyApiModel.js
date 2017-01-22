Ext.define('KLKK.model.WyApiModel', {
	extend : 'Ext.data.Model',
	fields : [ {
		name : 'id',
		type : 'string'
	},{
		name : 'content',
		type : 'string'
	}, {
		name : 'headerDisplay'
	}, {
		name : 'headerMsg',
		type : 'string'
	},{
		name : 'productionType',
		type : 'string'
	},{
		name : 'pass'
	},{
		name : 'sort'
	},{
		name : 'user.username'
	},{
		name : 'user.email'
	},{
		name : 'indexFocusSort'
	},{
		name : 'displayUser'
	},{
		name : 'displayUser.username'
	},{
		name : 'displayUser.email'
	}]
});
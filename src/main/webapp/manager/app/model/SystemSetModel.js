Ext.define('KLKK.model.SystemSetModel', {
	extend : 'Ext.data.Model',
	fields : [ {
		name : 'id',
		type : 'string'
	},{
		name : 'version',
		type : 'string'
	}, {
		name : 'versionDesc'
	},{
		name : 'user.id'
	},{
		name : 'user.email'
	}]
});

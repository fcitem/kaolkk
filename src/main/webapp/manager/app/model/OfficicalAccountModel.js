Ext.define('KLKK.model.OfficicalAccountModel', {
	extend : 'Ext.data.Model',
	fields : [ {
		name : 'id',
		type : 'string'
	},{
		name : 'title',
		type : 'string'
	},{
		name : 'titleDesc'
	}, {
		name : 'image'
	},{
		name : 'image.name'
	},{
		name : 'sort'
	},{
		name : 'focusSort'
	},{
		name : 'url'
	},{
		name : 'user'
	},{
		name : 'focus'
	}]
});

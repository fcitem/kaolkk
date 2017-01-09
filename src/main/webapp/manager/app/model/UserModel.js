Ext.define('KLKK.model.UserModel', {
	extend : 'Ext.data.Model',
	fields : [ {
		name : 'id',
		type : 'string'
	},{
		name : 'username',
		type : 'string'
	}, {
		name : 'pseudonym'
	}, {
		name : 'email',
		type : 'string'
	},{
		name : 'active',
		type : 'string'
	},{
		name : 'status'
	},{
		name : 'phone'
	},{
		name : 'introductionMyselef'
	},{
		name : 'speciality'
	},{
		name : 'representativeWorks'
	},{
		name : 'image.name'
	},{
		name : 'manager'
	},{
		name : 'publishType'
	},{
		name : 'productionType'
	},{
		name : 'topicRequire'
	}]
});

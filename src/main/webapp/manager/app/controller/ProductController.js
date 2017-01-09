Ext.define('KLKK.controller.ProductController', {
	extend : 'KLKK.controller.MainController',
	views : [ 'productView.UnpublishGrid','productView.PublishGrid' ],
	stores : [ 'productStore.UnpublishStore','productStore.PublishStore' ],
	models : [],
	refs : [// 相当于一个映射,这样就可以在控制层方便的通过geter取得相应的对象了
	{
		ref : 'unpublishgrid',
		selector : 'managerpanel #centerPanel #unpublishGrid'
	},{
		ref : 'publishgrid',
		selector : 'managerpanel #centerPanel #publishGrid'
	} ],
	init : function() {
		var me = this;
		this.control({
			'unpublishgrid' : {
//				afterrender : me.unpublishgridAfterrender,
				select : me.unpublishGridSelect,
				deselect : me.unpublishGridSelect,
				itemdblclick : me.unpublishGriddbClcik
			},
			'unpublishgrid #unpublishEdit' : {
				click: me.unPublishGridEdit
			},
			'unpublishgrid #unpublishDelete':{
				click: me.unpublishGridDelete
			},
			'publishgrid' : {
				select : me.publishGridSelect,
				deselect : me.publishGridSelect,
				itemdblclick : me.publishGriddbClcik
			},
			'publishgrid #publishGridEdit' : {
				click: me.publishGridEdit
			},
			'publishgrid #publishGridDelete':{
				click: me.publishGridDelete
			},
			'producteditwin': {
				close: me.productEditWinClose
			},
			'managerpanel #allProduct #add': {
				click: me.addProduct
			}
		});
	},
	unpublishgridAfterrender : function(self, eOpts) {
		var me = this;
		var store = self.getStore();
		store.load();
	},
	unpublishGridSelect : function(self, record, index, eOpts) {
		var me = this;
		var selection = self.getSelection();
		var unpublishEdit = me.getUnpublishgrid().down("#unpublishEdit");
		var unpublishDelete = me.getUnpublishgrid().down("#unpublishDelete");
		if (!unpublishEdit || !unpublishDelete) {
			return;
		}
		if (selection.length == 0) {
			unpublishEdit.disable();
			unpublishDelete.disable();
		} else if (selection.length == 1) {
			unpublishEdit.enable();
			unpublishDelete.enable();
		} else if (selection.length > 1) {
			unpublishEdit.disable();
			unpublishDelete.enable();
		}
		me.commonSetDisplayPicture(me.getUnpublishgrid(),record);
	},
	unpublishGriddbClcik: function(self, record, item, index, e, eOpts){
		self.select(record);
		this.commonOpenProductEditWin(self);
	},
	unPublishGridEdit: function(self, e, eOpts){
		var me = this;
		me.commonOpenProductEditWin(me.getUnpublishgrid());
	},
	unpublishGridDelete: function(){
		this.commonProductDelete(this.getUnpublishgrid());
	},
	publishGridSelect : function(self, record, index, eOpts) {
		var me = this;
		var selection = self.getSelection();
		var publishGridEdit = me.getPublishgrid().down("#publishGridEdit");
		var publishGridDelete = me.getPublishgrid().down("#publishGridDelete");
		if (!publishGridEdit || !publishGridDelete) {
			return;
		}
		if (selection.length == 0) {
			publishGridEdit.disable();
			publishGridDelete.disable();
		} else if (selection.length == 1) {
			publishGridEdit.enable();
			publishGridDelete.enable();
		} else if (selection.length > 1) {
			publishGridEdit.disable();
			publishGridDelete.enable();
		}
		me.commonSetDisplayPicture(me.getPublishgrid(),record);
	},
	publishGriddbClcik: function(self, record, item, index, e, eOpts){
		self.select(record);
		this.commonOpenProductEditWin(self);
	},
	publishGridEdit: function(self, e, eOpts){
		var me = this;
		me.commonOpenProductEditWin(me.getPublishgrid());
	},
	publishGridDelete: function(){
		this.commonProductDelete(this.getPublishgrid());
	},
	productEditWinClose: function(){
		var me = KLKK.app.getController("KLKK.controller.MainController");
		me.getProducteditwin().down("#allProductSave").timeIntervale = null;
		me.getProducteditwin().down("#allProductEditPicturePath").setSrc("");
		me.getProducteditwin().down("#allProductEditPicturePath").timeIntervale = null;
		var existImageId = me.getProducteditwin().down("#allProductEditImageId").getValue();
		if (existImageId){
			Ext.Ajax.request({
				url : '/klkk/upload/image/' + existImageId,
				method : 'DELETE',
				contentType : "application/json",
				success : function(response) {
				},
				failure : function() {
				}
			});
		}
	},
	addProduct: function(){
		this.commonAddProductWin();
	}
	

});
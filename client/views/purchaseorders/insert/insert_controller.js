this.PurchaseordersInsertController = RouteController.extend({
	template: "PurchaseordersInsert",
	

	yieldTemplates: {
		/*YIELD_TEMPLATES*/
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("loading"); }
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		

		var subs = [
			Meteor.subscribe("supplier_list", this.params.type),
			Meteor.subscribe("purchaseorder_empty"),
			Meteor.subscribe("purchaseorder_list", this.params.account)
		];
		var ready = true;
		_.each(subs, function(sub) {
			if(!sub.ready())
				ready = false;
		});
		return ready;
	},

	data: function() {
		

		var data = {
			params: this.params || {},
			supplier_list: Suppliers.find({type:this.params.type}, {transform:function(doc) { var sum = 0; Invoices.find({ supplierId: doc._id }).map(function(item) { if(item.totalAmount) sum += item.totalAmount; }); doc.totalAmount = sum; return doc; },sort:["name"]}),
			purchaseorder_empty: Purchaseorders.findOne({_id:null}, {}),
			purchaseorder_list: Purchaseorders.find({account:this.params.account}, {sort:[["purchaseorderNumber","desc"]]})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});
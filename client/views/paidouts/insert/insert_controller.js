this.PaidoutsInsertController = RouteController.extend({
	template: "PaidoutsInsert",
	

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
			Meteor.subscribe("paidout_empty"),
			Meteor.subscribe("paidout_list")
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
			paidout_empty: Paidouts.findOne({_id:null}, {}),
			paidout_list: Paidouts.find({}, {sort:["type"]})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});
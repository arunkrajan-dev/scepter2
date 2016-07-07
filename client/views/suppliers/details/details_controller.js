this.SuppliersDetailsController = RouteController.extend({
	template: "SuppliersDetails",
	

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
			Meteor.subscribe("supplier_details", this.params.supplierId),
			Meteor.subscribe("expenditure_list")
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
			supplier_details: Suppliers.findOne({_id:this.params.supplierId}, {transform:function(doc) { var sum = 0; Expenditure.find({ supplierId: doc._id }).map(function(item) { sum += item.totalAmount; }); doc.totalAmount = sum; return doc; }}),
			expenditure_list: Expenditures.find({}, {sort:["type"]})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});
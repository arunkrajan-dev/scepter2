this.PurchaseordersController = RouteController.extend({
	template: "Purchaseorders",
	

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
			purchaseorder_list: Purchaseorders.find({account:this.params.account}, {sort:[["purchaseorderNumber","desc"]]})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});
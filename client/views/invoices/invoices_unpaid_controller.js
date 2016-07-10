this.InvoicesUnpaidController = RouteController.extend({
	template: "Invoices",
	

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
			Meteor.subscribe("invoice_list_unpaid", this.params.account)
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
			invoice_list: Invoices.find({account:this.params.account}, {sort:[["invoiceNumber","desc"]]})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});
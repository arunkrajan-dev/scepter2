this.PaidoutsDetailsController = RouteController.extend({
	template: "PaidoutsDetails",
	

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
			Meteor.subscribe("paidout_details", this.params.paidoutId)
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
			paidout_details: Paidouts.findOne({_id:this.params.paidoutId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});
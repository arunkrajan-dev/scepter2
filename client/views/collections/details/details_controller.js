this.CollectionsDetailsController = RouteController.extend({
	template: "CollectionsDetails",
	

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
			Meteor.subscribe("collection_details", this.params.collectionId)
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
			collection_details: Collections.findOne({_id:this.params.collectionId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});
this.ProductsInsertController = RouteController.extend({
	template: "ProductsInsert",
	

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
			Meteor.subscribe("product_empty"),
			Meteor.subscribe("product_list", this.params.account)
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
			product_empty: Products.findOne({_id:null}, {}),
			product_list: Products.find({account:this.params.account}, {sort:["name"]})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});
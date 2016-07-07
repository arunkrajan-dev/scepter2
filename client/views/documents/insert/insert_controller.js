this.DocumentsInsertController = RouteController.extend({
	template: "DocumentsInsert",
	

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
			Meteor.subscribe("document_empty"),
			Meteor.subscribe("document_list")
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
			document_empty: Documents.findOne({_id:null}, {}),
			document_list: Documents.find({}, {sort:["name"]})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});
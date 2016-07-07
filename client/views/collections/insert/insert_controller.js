this.CollectionsInsertController = RouteController.extend({
	template: "CollectionsInsert",
	

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
			Meteor.subscribe("member_list", this.params.type),
			Meteor.subscribe("collection_empty"),
			Meteor.subscribe("collection_list")
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
			member_list: Members.find({type:this.params.type}, {transform:function(doc) { var sum = 0; Invoices.find({ memberId: doc._id }).map(function(item) { if(item.totalAmount) sum += item.totalAmount; }); doc.totalAmount = sum; return doc; },sort:["name"]}),
			collection_empty: Collections.findOne({_id:null}, {}),
			collection_list: Collections.find({}, {sort:["type"]})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});
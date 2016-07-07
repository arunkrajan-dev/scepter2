Meteor.publish("other_list", function(type) {
	if(Users.isInRoles(this.userId, ["gm","md","admin","cashier"])) {
		return Others.find({type:type}, {transform:function(doc) { var sum = 0; Invoices.find({ otherId: doc._id }).map(function(item) { if(item.totalAmount) sum += item.totalAmount; }); doc.totalAmount = sum; return doc; },sort:["name"]});
	}
	return this.ready();
});

Meteor.publish("other_empty", function() {
	if(Users.isInRoles(this.userId, ["gm","md","admin","cashier"])) {
		return Others.find({_id:"null"}, {});
	}
	return this.ready();
});

Meteor.publish("other_details", function(otherId) {
	if(Users.isInRoles(this.userId, ["gm","md","admin","cashier"])) {
		return Others.find({_id:otherId}, {transform:function(doc) { var sum = 0; Expenditure.find({ otherId: doc._id }).map(function(item) { sum += item.totalAmount; }); doc.totalAmount = sum; return doc; }});
	}
	return this.ready();
});


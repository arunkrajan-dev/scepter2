Meteor.publish("member_list", function(type) {
	if(Users.isInRoles(this.userId, ["gm","md","admin","cashier"])) {
		return Members.find({type:type}, {transform:function(doc) { var sum = 0; Invoices.find({ memberId: doc._id }).map(function(item) { if(item.totalAmount) sum += item.totalAmount; }); doc.totalAmount = sum; return doc; },sort:["name"]});
	}
	return this.ready();
});

Meteor.publish("member_empty", function() {
	if(Users.isInRoles(this.userId, ["gm","md","admin","cashier"])) {
		return Members.find({_id:"null"}, {});
	}
	return this.ready();
});

Meteor.publish("member_details", function(memberId) {
	if(Users.isInRoles(this.userId, ["gm","md","admin","cashier"])) {
		return Members.find({_id:memberId}, {transform:function(doc) { var sum = 0; Expenditure.find({ memberId: doc._id }).map(function(item) { sum += item.totalAmount; }); doc.totalAmount = sum; return doc; }});
	}
	return this.ready();
});


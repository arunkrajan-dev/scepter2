Meteor.publish("paidout_list", function() {
	if(Users.isInRoles(this.userId, ["gm","md","admin","cashier"])) {
		return Paidouts.publishJoinedCursors(Paidouts.find({}, {sort:["type"]}));
	}
	return this.ready();
});

Meteor.publish("paidout_list_supplier", function(supplierId) {
	if(Users.isInRoles(this.userId, ["gm","md","admin","cashier"])) {
		return Paidouts.publishJoinedCursors(Paidouts.find({supplierId:supplierId}, {sort:["type"]}));
	}
	return this.ready();
});

Meteor.publish("paidout_empty", function() {
	if(Users.isInRoles(this.userId, ["gm","md","admin","cashier"])) {
		return Paidouts.publishJoinedCursors(Paidouts.find({_id:"null"}, {}));
	}
	return this.ready();
});

Meteor.publish("paidout_details", function(paidoutId) {
	if(Users.isInRoles(this.userId, ["gm","md","admin","cashier"])) {
		return Paidouts.publishJoinedCursors(Paidouts.find({_id:paidoutId}, {}));
	}
	return this.ready();
});


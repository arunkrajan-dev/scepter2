Meteor.publish("product_list", function(account) {
	if(Users.isInRoles(this.userId, ["gm","md","admin","cashier"])) {
		return Products.find({account:account}, {sort:["name"]});
	}
	return this.ready();
});

Meteor.publish("product_empty", function() {
	if(Users.isInRoles(this.userId, ["gm","md","admin","cashier"])) {
		return Products.find({_id:"null"}, {});
	}
	return this.ready();
});

Meteor.publish("product_details", function(productId) {
	if(Users.isInRoles(this.userId, ["gm","md","admin","cashier"])) {
		return Products.find({_id:productId}, {});
	}
	return this.ready();
});


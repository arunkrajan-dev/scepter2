Meteor.publish("purchaseorder_items", function(purchaseorderId) {
	if(Users.isInRoles(this.userId, ["gm","md","admin"])) {
		return PurchaseorderItems.find({purchaseorderId:purchaseorderId}, {});
	}
	return this.ready();
});

Meteor.publish("purchaseorder_item_empty", function() {
	if(Users.isInRoles(this.userId, ["gm","md","admin"])) {
		return PurchaseorderItems.find({_id:"null"}, {});
	}
	return this.ready();
});

Meteor.publish("purchaseorder_item", function(itemId) {
	if(Users.isInRoles(this.userId, ["gm","md","admin"])) {
		return PurchaseorderItems.find({_id:itemId}, {});
	}
	return this.ready();
});


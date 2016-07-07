Meteor.publish("purchaseorder_list", function(account) {
	if(Users.isInRoles(this.userId, ["gm","md","admin"])) {
		return Purchaseorders.publishJoinedCursors(Purchaseorders.find({account:account}, {sort:[["purchaseorderNumber","desc"]]}));
	}
	return this.ready();
});

Meteor.publish("purchaseorder_list_supplier", function(supplierId) {
	if(Users.isInRoles(this.userId, ["gm","md","admin"])) {
		return Purchaseorders.publishJoinedCursors(Purchaseorders.find({supplierId:supplierId}, {sort:[["purchaseorderNumber","desc"]]}));
	}
	return this.ready();
});

Meteor.publish("purchaseorder_empty", function() {
	if(Users.isInRoles(this.userId, ["gm","md","admin"])) {
		return Purchaseorders.publishJoinedCursors(Purchaseorders.find({_id:"null"}, {}));
	}
	return this.ready();
});

Meteor.publish("purchaseorder_details", function(purchaseorderId) {
	if(Users.isInRoles(this.userId, ["gm","md","admin"])) {
		return Purchaseorders.publishJoinedCursors(Purchaseorders.find({_id:purchaseorderId}, {}));
	}
	return this.ready();
});


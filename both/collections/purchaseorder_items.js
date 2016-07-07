this.PurchaseorderItems = new Mongo.Collection("purchaseorder_items");

this.PurchaseorderItems.userCanInsert = function(userId, doc) {
	return Users.isInRoles(userId, ["gm","md","admin"]);
};

this.PurchaseorderItems.userCanUpdate = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["gm","md","admin"]);
};

this.PurchaseorderItems.userCanRemove = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["md"]);
};

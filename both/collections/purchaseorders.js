this.Purchaseorders = new Mongo.Collection("purchaseorders");

this.Purchaseorders.userCanInsert = function(userId, doc) {
	return Users.isInRoles(userId, ["gm","md","admin"]);
};

this.Purchaseorders.userCanUpdate = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["gm","md","admin"]);
};

this.Purchaseorders.userCanRemove = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["md"]);
};

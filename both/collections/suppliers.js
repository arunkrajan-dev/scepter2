this.Suppliers = new Mongo.Collection("suppliers");

this.Suppliers.userCanInsert = function(userId, doc) {
	return Users.isInRoles(userId, ["gm","md","admin"]);
};

this.Suppliers.userCanUpdate = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["gm","md","admin"]);
};

this.Suppliers.userCanRemove = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["md"]);
};

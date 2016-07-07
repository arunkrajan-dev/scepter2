this.Products = new Mongo.Collection("products");

this.Products.userCanInsert = function(userId, doc) {
	return Users.isInRoles(userId, ["gm","md","admin"]);
};

this.Products.userCanUpdate = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["gm","md","admin"]);
};

this.Products.userCanRemove = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["md"]);
};

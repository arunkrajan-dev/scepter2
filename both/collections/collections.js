this.Collections = new Mongo.Collection("collections");

this.Collections.userCanInsert = function(userId, doc) {
	return Users.isInRoles(userId, ["gm","md","admin","line"]);
};

this.Collections.userCanUpdate = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["gm","md","admin"]);
};

this.Collections.userCanRemove = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["md"]);
};

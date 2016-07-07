this.Others = new Mongo.Collection("others");

this.Others.userCanInsert = function(userId, doc) {
	return Users.isInRoles(userId, ["gm","md","admin"]);
};

this.Others.userCanUpdate = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["gm","md","admin"]);
};

this.Others.userCanRemove = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["md"]);
};

this.Members = new Mongo.Collection("members");

this.Members.userCanInsert = function(userId, doc) {
	return Users.isInRoles(userId, ["md","admin"]);
};

this.Members.userCanUpdate = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["md","admin"]);
};

this.Members.userCanRemove = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["md"]);
};

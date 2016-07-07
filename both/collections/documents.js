this.Documents = new Mongo.Collection("documents");

this.Documents.userCanInsert = function(userId, doc) {
	return true;
};

this.Documents.userCanUpdate = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["md"]);
};

this.Documents.userCanRemove = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["md"]);
};

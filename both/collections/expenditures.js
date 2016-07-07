this.Expenditures = new Mongo.Collection("expenditures");

this.Expenditures.userCanInsert = function(userId, doc) {
	return Users.isInRoles(userId, ["gm","md","admin"]);
};

this.Expenditures.userCanUpdate = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["gm","md","admin"]);
};

this.Expenditures.userCanRemove = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["md"]);
};

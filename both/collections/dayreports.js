this.Dayreports = new Mongo.Collection("dayreports");

this.Dayreports.userCanInsert = function(userId, doc) {
	return true;
};

this.Dayreports.userCanUpdate = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["gm","md"]);
};

this.Dayreports.userCanRemove = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["md"]);
};

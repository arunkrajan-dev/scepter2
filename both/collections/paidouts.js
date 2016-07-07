this.Paidouts = new Mongo.Collection("paidouts");

this.Paidouts.userCanInsert = function(userId, doc) {
	return Users.isInRoles(userId, ["gm","md","admin","cashier"]);
};

this.Paidouts.userCanUpdate = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["gm","md","admin"]);
};

this.Paidouts.userCanRemove = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["md"]);
};

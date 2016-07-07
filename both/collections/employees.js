this.Employees = new Mongo.Collection("employees");

this.Employees.userCanInsert = function(userId, doc) {
	return Users.isInRoles(userId, ["md","admin"]);
};

this.Employees.userCanUpdate = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["md","admin"]);
};

this.Employees.userCanRemove = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["md"]);
};

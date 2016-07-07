this.InvoiceItems = new Mongo.Collection("invoice_items");

this.InvoiceItems.userCanInsert = function(userId, doc) {
	return Users.isInRoles(userId, ["gm","md","admin","cashier"]);
};

this.InvoiceItems.userCanUpdate = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["gm","md","admin"]);
};

this.InvoiceItems.userCanRemove = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["md"]);
};

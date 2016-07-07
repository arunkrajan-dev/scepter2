Employees.allow({
	insert: function (userId, doc) {
		return Employees.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Employees.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Employees.userCanRemove(userId, doc);
	}
});

Employees.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

Employees.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Employees.before.upsert(function(userId, selector, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	/*BEFORE_UPSERT_CODE*/
});

Employees.before.remove(function(userId, doc) {
	
});

Employees.after.insert(function(userId, doc) {
	
});

Employees.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Employees.after.remove(function(userId, doc) {
	
});

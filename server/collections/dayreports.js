Dayreports.allow({
	insert: function (userId, doc) {
		return Dayreports.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Dayreports.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Dayreports.userCanRemove(userId, doc);
	}
});

Dayreports.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

Dayreports.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Dayreports.before.upsert(function(userId, selector, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	/*BEFORE_UPSERT_CODE*/
});

Dayreports.before.remove(function(userId, doc) {
	
});

Dayreports.after.insert(function(userId, doc) {
	
});

Dayreports.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Dayreports.after.remove(function(userId, doc) {
	
});

Documents.allow({
	insert: function (userId, doc) {
		return Documents.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Documents.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Documents.userCanRemove(userId, doc);
	}
});

Documents.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

Documents.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Documents.before.upsert(function(userId, selector, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	/*BEFORE_UPSERT_CODE*/
});

Documents.before.remove(function(userId, doc) {
	
});

Documents.after.insert(function(userId, doc) {
	
});

Documents.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Documents.after.remove(function(userId, doc) {
	
});

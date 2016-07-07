Collections.allow({
	insert: function (userId, doc) {
		return Collections.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Collections.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Collections.userCanRemove(userId, doc);
	}
});

Collections.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

Collections.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Collections.before.upsert(function(userId, selector, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	/*BEFORE_UPSERT_CODE*/
});

Collections.before.remove(function(userId, doc) {
	
});

Collections.after.insert(function(userId, doc) {
	
});

Collections.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Collections.after.remove(function(userId, doc) {
	
});

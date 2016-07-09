Expenditures.allow({
	insert: function (userId, doc) {
		return Expenditures.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Expenditures.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Expenditures.userCanRemove(userId, doc);
	}
});

Expenditures.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

Expenditures.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Expenditures.before.upsert(function(userId, selector, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	/*BEFORE_UPSERT_CODE*/
});

Expenditures.before.remove(function(userId, doc) {
	
});

Expenditures.after.insert(function(userId, doc) {
	Dayreports.update( {"status":"active"}, { $inc : {expense: doc.totalAmount} });
});

Expenditures.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Expenditures.after.remove(function(userId, doc) {
	
});

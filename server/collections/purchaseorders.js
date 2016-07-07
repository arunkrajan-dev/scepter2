Purchaseorders.allow({
	insert: function (userId, doc) {
		return Purchaseorders.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Purchaseorders.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Purchaseorders.userCanRemove(userId, doc);
	}
});

Purchaseorders.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
if(!doc.totalAmount) doc.totalAmount = 0;
});

Purchaseorders.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Purchaseorders.before.upsert(function(userId, selector, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	/*BEFORE_UPSERT_CODE*/
});

Purchaseorders.before.remove(function(userId, doc) {
	
});

Purchaseorders.after.insert(function(userId, doc) {
	
});

Purchaseorders.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Purchaseorders.after.remove(function(userId, doc) {
	
});

PurchaseorderItems.allow({
	insert: function (userId, doc) {
		return PurchaseorderItems.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return PurchaseorderItems.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return PurchaseorderItems.userCanRemove(userId, doc);
	}
});

PurchaseorderItems.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
doc.amount = doc.quantity * doc.price;
});

PurchaseorderItems.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
if(!modifier.$set) return; var quantity = modifier.$set.quantity || doc.quantity; var price = modifier.$set.price || doc.price; modifier.$set.amount = quantity * price;
});

PurchaseorderItems.before.upsert(function(userId, selector, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	/*BEFORE_UPSERT_CODE*/
});

PurchaseorderItems.before.remove(function(userId, doc) {
	
});

PurchaseorderItems.after.insert(function(userId, doc) {
	
var sum = 0; PurchaseorderItems.find({ purchaseorderId: doc.purchaseorderId }).map(function(item) { sum += item.amount; }); Purchaseorders.update({ _id: doc.purchaseorderId }, { $set: { totalAmount: sum }});
});

PurchaseorderItems.after.update(function(userId, doc, fieldNames, modifier, options) {
	
var sum = 0; PurchaseorderItems.find({ purchaseorderId: doc.purchaseorderId }).map(function(item) { sum += item.amount; }); Purchaseorders.update({ _id: doc.purchaseorderId }, { $set: { totalAmount: sum }});
});

PurchaseorderItems.after.remove(function(userId, doc) {
	
var sum = 0; PurchaseorderItems.find({ purchaseorderId: doc.purchaseorderId }).map(function(item) { sum += item.amount; }); Purchaseorders.update({ _id: doc.purchaseorderId }, { $set: { totalAmount: sum }});
});

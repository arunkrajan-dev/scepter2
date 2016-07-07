Meteor.publish("invoice_items", function(invoiceId) {
	if(Users.isInRoles(this.userId, ["gm","md","admin","cashier"])) {
		return InvoiceItems.find({invoiceId:invoiceId}, {});
	}
	return this.ready();
});

Meteor.publish("invoice_item_empty", function() {
	if(Users.isInRoles(this.userId, ["gm","md","admin","cashier"])) {
		return InvoiceItems.find({_id:"null"}, {});
	}
	return this.ready();
});

Meteor.publish("invoice_item", function(itemId) {
	if(Users.isInRoles(this.userId, ["gm","md","admin","cashier"])) {
		return InvoiceItems.find({_id:itemId}, {});
	}
	return this.ready();
});


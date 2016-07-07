Meteor.publish("supplier_list", function(type) {
	if(Users.isInRoles(this.userId, ["gm","md","admin","cashier"])) {
		return Suppliers.find({type:type}, {transform:function(doc) { var sum = 0; Invoices.find({ supplierId: doc._id }).map(function(item) { if(item.totalAmount) sum += item.totalAmount; }); doc.totalAmount = sum; return doc; },sort:["name"]});
	}
	return this.ready();
});

Meteor.publish("supplier_empty", function() {
	if(Users.isInRoles(this.userId, ["gm","md","admin","cashier"])) {
		return Suppliers.find({_id:"null"}, {});
	}
	return this.ready();
});

Meteor.publish("supplier_details", function(supplierId) {
	if(Users.isInRoles(this.userId, ["gm","md","admin","cashier"])) {
		return Suppliers.find({_id:supplierId}, {transform:function(doc) { var sum = 0; Expenditure.find({ supplierId: doc._id }).map(function(item) { sum += item.totalAmount; }); doc.totalAmount = sum; return doc; }});
	}
	return this.ready();
});


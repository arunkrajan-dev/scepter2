Meteor.publish("invoice_list", function(account) {
	return Invoices.publishJoinedCursors(Invoices.find({account:account}, {sort:[["invoiceNumber","desc"]]}));
});

Meteor.publish("invoice_list_member", function(memberId) {
	return Invoices.publishJoinedCursors(Invoices.find({memberId:memberId}, {sort:[["invoiceNumber","desc"]]}));
});

Meteor.publish("invoice_empty", function() {
	return Invoices.publishJoinedCursors(Invoices.find({_id:null}, {}));
});

Meteor.publish("invoice_details", function(invoiceId) {
	return Invoices.publishJoinedCursors(Invoices.find({_id:invoiceId}, {}));
});


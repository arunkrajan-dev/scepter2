Meteor.publish("expenditure_list", function() {
	if(Users.isInRoles(this.userId, ["gm","md","admin"])) {
		return Expenditures.find({}, {sort:["type"]});
	}
	return this.ready();
});

Meteor.publish("expenditure_empty", function() {
	if(Users.isInRoles(this.userId, ["gm","md","admin"])) {
		return Expenditures.find({_id:null}, {});
	}
	return this.ready();
});

Meteor.publish("expenditure_details", function(expenditureId) {
	if(Users.isInRoles(this.userId, ["gm","md","admin"])) {
		return Expenditures.find({_id:expenditureId}, {});
	}
	return this.ready();
});


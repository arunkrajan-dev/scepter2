Meteor.publish("employee_list", function() {
	if(Users.isInRoles(this.userId, ["gm","md","admin","cashier"])) {
		return Employees.find({}, {sort:["type"]});
	}
	return this.ready();
});

Meteor.publish("employee_empty", function() {
	if(Users.isInRoles(this.userId, ["gm","md","admin","cashier"])) {
		return Employees.find({_id:null}, {});
	}
	return this.ready();
});

Meteor.publish("employee_details", function(employeeId) {
	if(Users.isInRoles(this.userId, ["gm","md","admin","cashier"])) {
		return Employees.find({_id:employeeId}, {});
	}
	return this.ready();
});


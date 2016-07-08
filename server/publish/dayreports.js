Meteor.publish("dayreport_list", function() {
	if(Users.isInRoles(this.userId, ["md","gm"])) {
		return Dayreports.find({}, {sort:["name"]});
	}
	return this.ready();
});

Meteor.publish("dayreport_empty", function() {
	if(Users.isInRoles(this.userId, ["md","gm"])) {
		return Dayreports.find({_id:null}, {});
	}
	return this.ready();
});

Meteor.publish("dayreport_details", function(dayreportId) {
	if(Users.isInRoles(this.userId, ["md","gm"])) {
		return Dayreports.find({_id:dayreportId}, {});
	}
	return this.ready();
});


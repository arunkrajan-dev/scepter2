Meteor.publish("collection_list", function() {
	if(Users.isInRoles(this.userId, ["gm","md","admin","line"])) {
		return Collections.publishJoinedCursors(Collections.find({}, {sort:["type"]}));
	}
	return this.ready();
});

Meteor.publish("collection_list_member", function(memberId) {
	if(Users.isInRoles(this.userId, ["gm","md","admin","line"])) {
		return Collections.publishJoinedCursors(Collections.find({memberId:memberId}, {sort:["type"]}));
	}
	return this.ready();
});

Meteor.publish("collection_empty", function() {
	if(Users.isInRoles(this.userId, ["gm","md","admin","line"])) {
		return Collections.publishJoinedCursors(Collections.find({_id:"null"}, {}));
	}
	return this.ready();
});

Meteor.publish("collection_details", function(collectionId) {
	if(Users.isInRoles(this.userId, ["gm","md","admin","line"])) {
		return Collections.publishJoinedCursors(Collections.find({_id:collectionId}, {}));
	}
	return this.ready();
});


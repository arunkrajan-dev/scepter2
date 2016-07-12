var pageSession = new ReactiveDict();

Template.HomePrivate.rendered = function() {
	$(".dropdown-button").dropdown();
	pageSession.set("paidTotal", "0");
	pageSession.set("creditTotal", "0");
};

Template.HomePrivate.events({
    "click #approve-button": function (e, t) {
        e.preventDefault();
        Meteor.call("approveDay");
    },
    "submit #review-day-form": function (e, t) {
        e.preventDefault();
        Meteor.call("reopenDay", "re-opened for " + e.target.comment.value);
    },
    "submit #close-day-form": function (e, t) {
        e.preventDefault();
        var totalAmount = e.target.totalAmount.value;
        Meteor.call("closeDay", totalAmount);
    },
    "submit #start-day-form": function (e, t) {
        e.preventDefault();
        var totalAmount = e.target.totalAmount.value;
        Meteor.call("startDay", totalAmount);
    }	
});

Template.HomePrivate.helpers({
	"invoiceTotal": function (paid, credit) {
	    // var paidTotal = parseFloat(pageSession.get("paidTotal")) + parseFloat(paid);
	    // var  creditTotal = parseFloat(pageSession.get("creditTotal")) + parseFloat(credit);
	    // pageSession.set("paidTotal", paidTotal.toString());
	    // pageSession.set("creditTotal", creditTotal.toString());
	    return parseFloat(paid) + parseFloat(credit);
	},
	"paidTotal": function () {
	    // return pageSession.get("paidTotal");
	},
	"creditTotal": function () {
	    // return pageSession.get("creditTotal");
	},
	"status": function(a, b) {
		if(a == b) {
			return true;
		} else {
			return false;
		}
	}
});

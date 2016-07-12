var pageSession = new ReactiveDict();

Template.HomePrivate.rendered = function() {
	$(".dropdown-button").dropdown();
	pageSession.set("paidTotal", "0");
	pageSession.set("creditTotal", "0");
};

Template.HomePrivate.events({
    "click #dayreport-closeDay-button": function (e, t) {
        e.preventDefault();
        Meteor.call("closeDay");
    },
    "click #dayreport-reviewDay-button": function (e, t) {
        e.preventDefault();
        Meteor.call("reviewDay");
    },
    "click #dayreport-startDay-button": function (e, t) {
        e.preventDefault();
        Meteor.call("startDay");
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

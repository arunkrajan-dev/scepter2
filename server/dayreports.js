Meteor.methods({
    "closeDay": function() {
        var current = Dayreports.findOne({"status": "active"}, {_id:1, date: 1}); 
        now = new Date();
        if(current) {
        	var tomorrow = current.date;
            tomorrow.setDate(tomorrow.getDate() + 1);
            Meteor.call("initDayReport", tomorrow);
            Dayreports.update({"status": "active"}, {$set: {"status": "review", "closedOn": now}});
        } else {
			var tomorrow = new Date();
			tomorrow.setDate(tomorrow.getDate() + 1);        	
            Meteor.call("initDayReport", tomorrow);
        }
    },
    
    "reviewDay": function(aComment) {
		Dayreports.update({"status": "review"}, {$set: {"status": "closed", "closerComment": aComment}});
    },
    
    "startDay": function() {
    	var doc = Dayreports.findOne({"status": "ready"}, {_id:1, date: 1});
        if(!doc) {
			var today = new Date();
            Meteor.call("initDayReport", today);
        }
        Dayreports.update({"status": "ready"}, {$set: {"status": "active"}});
    },
    
	"initDayReport": function(aDate) {
		//var tomorrow = new Date();
		//tomorrow.setDate(tomorrow.getDate() + 1);
		console.log("intiDayReport Date: ", aDate);
		Dayreports.insert({
		  "date": aDate,
		  "status": "ready",
		  "expense": 0,
		  "paidout": 0,
		  "collection": 0,
		  "netpaid": 0,
		  "netcredit": 0,
		  "summary": [
		    {
				"account":"bar", 
				"invoices": 0,
				"paid": 0,
				"credit": 0
			},
		    {
				"account":"dining", 
				"invoices": 0,
				"paid": 0,
				"credit": 0
			},
		    {
				"account":"hotel", 
				"invoices": 0,
				"paid": 0,
				"credit": 0
			},
		    {
				"account":"sports", 
				"invoices": 0,
				"paid": 0,
				"credit": 0
			}
		  ]  
		});
	},
	
	"incPaid": function(account, total) {
		Dayreports.update( {"summary.account":account}, { $inc : { "summary.$.invoices" : 1, "summary.$.paid": total, "netpaid": total } });
	},

	"incCredit": function(account, total) {
		Dayreports.update( {"summary.account":account}, { $inc : { "summary.$.invoices" : 1, "summary.$.credit": total, "netcredit": total } });
	}    
});
Meteor.methods({
    "closeDay": function(aTotalAmount) {
        var current = Dayreports.findOne({"status": "active"}, {_id:1, date: 1}); 
        now = new Date();
        if(current) {
        	var tomorrow = current.date;
            tomorrow.setDate(tomorrow.getDate() + 1);
            Meteor.call("initDayReport", tomorrow);
            Dayreports.update({"status": "active"}, {$set: {"status": "review", "closedOn": now, "actualClosingBalance": aTotalAmount}, $unset: {"reopenComment": 1}});
        } else {
			var tomorrow = new Date();
			tomorrow.setDate(tomorrow.getDate() + 1);        	
            Meteor.call("initDayReport", tomorrow);
        }
    },
    
    "approveDay": function(aComment) {
		Dayreports.update({"status": "review"}, {$set: {"status": "closed", "closerComment": aComment}});
    },
    
    "reopenDay": function(aComment) {
    	Dayreports.update({"status": "review"}, {$set: {"status": "active", "reopenComment": aComment}});
    },
    
    "startDay": function(aTotalAmount) {
    	var doc = Dayreports.findOne({"status": "ready"}, {_id:1, date: 1});
        if(!doc) {
			var today = new Date();
            Meteor.call("initDayReport", today);
        }
        Dayreports.update({"status": "ready"}, {$set: {"status": "active", "openingBalance": aTotalAmount}});
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
		Dayreports.update( {"summary.account":account, "status": "active"}, { $inc : { "summary.$.invoices" : 1, "summary.$.paid": total, "netpaid": total } });
	},

	"incCredit": function(account, total) {
		Dayreports.update( {"summary.account":account, "status": "active"}, { $inc : { "summary.$.invoices" : 1, "summary.$.credit": total, "netcredit": total } });
	}    
});
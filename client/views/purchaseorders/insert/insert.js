var pageSession = new ReactiveDict();

Template.PurchaseordersInsert.rendered = function() {
	
};

Template.PurchaseordersInsert.events({
	
});

Template.PurchaseordersInsert.helpers({
	
});

Template.PurchaseordersInsertInsertForm.rendered = function() {
	

	$('select').material_select();
	Materialize.updateTextFields();

	pageSession.set("purchaseordersInsertInsertFormInfoMessage", "");
	pageSession.set("purchaseordersInsertInsertFormErrorMessage", "");

	$(".input-group.date").each(function() {
		var format = $(this).find("input[type='text']").attr("data-format");

		if(format) {
			format = format.toLowerCase();
		}
		else {
			format = "mm/dd/yyyy";
		}

		$(this).datepicker({
			autoclose: true,
			todayHighlight: true,
			todayBtn: true,
			forceParse: false,
			keyboardNavigation: false,
			format: format
		});
	});

//	$("select[data-role='tagsinput']").tagsinput();
	$(".bootstrap-tagsinput").addClass("form-control");
	$("input[autofocus]").focus();
};

Template.PurchaseordersInsertInsertForm.events({
	"click #form-submit-button": function(e, t) {
		e.preventDefault();
		$(".form_PurchaseordersInsertInsertForm").submit();
	},
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("purchaseordersInsertInsertFormInfoMessage", "");
		pageSession.set("purchaseordersInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var purchaseordersInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(purchaseordersInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("purchaseordersInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("purchaseorders", {account: self.params.account});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("purchaseordersInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				values.account = self.params.account;

				newId = Purchaseorders.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("purchaseorders", {account: this.params.account});
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		/*CLOSE_REDIRECT*/
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		/*BACK_REDIRECT*/
	}

	
});

Template.PurchaseordersInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("purchaseordersInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("purchaseordersInsertInsertFormErrorMessage");
	}, 
	'nextpurchaseorderNumber': function() { var max = 0; var purchaseorderNumbers = Purchaseorders.find({}, { fields: { purchaseorderNumber: 1 }}).fetch(); _.each(purchaseorderNumbers, function(doc) { var intNum = parseInt(doc.purchaseorderNumber); if(!isNaN(intNum) && intNum > max) max = intNum; }); return max + 1; }
});

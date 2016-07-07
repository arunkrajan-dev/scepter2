var pageSession = new ReactiveDict();

Template.PurchaseordersDetailsInsert.rendered = function() {
	
};

Template.PurchaseordersDetailsInsert.events({
	
});

Template.PurchaseordersDetailsInsert.helpers({
	
});

Template.PurchaseordersDetailsInsertInsertForm.rendered = function() {
	

	$('select').material_select();
	Materialize.updateTextFields();

	pageSession.set("purchaseordersDetailsInsertInsertFormInfoMessage", "");
	pageSession.set("purchaseordersDetailsInsertInsertFormErrorMessage", "");

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

Template.PurchaseordersDetailsInsertInsertForm.events({
	"click #form-submit-button": function(e, t) {
		e.preventDefault();
		$(".form_PurchaseordersDetailsInsertInsertForm").submit();
	},
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("purchaseordersDetailsInsertInsertFormInfoMessage", "");
		pageSession.set("purchaseordersDetailsInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var purchaseordersDetailsInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(purchaseordersDetailsInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("purchaseordersDetailsInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("purchaseorders.details", {purchaseorderId: self.params.purchaseorderId, account: self.params.account});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("purchaseordersDetailsInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				values.purchaseorderId = self.params.purchaseorderId;

				newId = PurchaseorderItems.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("purchaseorders.details", {purchaseorderId: this.params.purchaseorderId, account: this.params.account});
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

Template.PurchaseordersDetailsInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("purchaseordersDetailsInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("purchaseordersDetailsInsertInsertFormErrorMessage");
	}
	
});

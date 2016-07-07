var pageSession = new ReactiveDict();

Template.PurchaseordersDetailsEdit.rendered = function() {
	
};

Template.PurchaseordersDetailsEdit.events({
	
});

Template.PurchaseordersDetailsEdit.helpers({
	
});

Template.PurchaseordersDetailsEditEditForm.rendered = function() {
	

	$('select').material_select();
	Materialize.updateTextFields();

	pageSession.set("purchaseordersDetailsEditEditFormInfoMessage", "");
	pageSession.set("purchaseordersDetailsEditEditFormErrorMessage", "");

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

Template.PurchaseordersDetailsEditEditForm.events({
	"click #form-submit-button": function(e, t) {
		e.preventDefault();
		$(".form_PurchaseordersDetailsEditEditForm").submit();
	},
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("purchaseordersDetailsEditEditFormInfoMessage", "");
		pageSession.set("purchaseordersDetailsEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var purchaseordersDetailsEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(purchaseordersDetailsEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("purchaseordersDetailsEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("purchaseorders.details", {purchaseorderId: self.params.purchaseorderId, account: self.params.account});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("purchaseordersDetailsEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				PurchaseorderItems.update({ _id: t.data.purchaseorder_item._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.PurchaseordersDetailsEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("purchaseordersDetailsEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("purchaseordersDetailsEditEditFormErrorMessage");
	}
	
});

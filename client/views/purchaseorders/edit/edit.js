var pageSession = new ReactiveDict();

Template.PurchaseordersEdit.rendered = function() {
	
};

Template.PurchaseordersEdit.events({
	
});

Template.PurchaseordersEdit.helpers({
	
});

Template.PurchaseordersEditEditForm.rendered = function() {
	

	$('select').material_select();
	Materialize.updateTextFields();

	pageSession.set("purchaseordersEditEditFormInfoMessage", "");
	pageSession.set("purchaseordersEditEditFormErrorMessage", "");

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

Template.PurchaseordersEditEditForm.events({
	"click #form-submit-button": function(e, t) {
		e.preventDefault();
		$(".form_PurchaseordersEditEditForm").submit();
	},
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("purchaseordersEditEditFormInfoMessage", "");
		pageSession.set("purchaseordersEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var purchaseordersEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(purchaseordersEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("purchaseordersEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("purchaseorders.details", {purchaseorderId: self.params.purchaseorderId, account: self.params.account});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("purchaseordersEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Purchaseorders.update({ _id: t.data.purchaseorder_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.PurchaseordersEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("purchaseordersEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("purchaseordersEditEditFormErrorMessage");
	}
	
});

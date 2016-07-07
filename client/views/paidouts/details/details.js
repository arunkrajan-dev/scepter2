var pageSession = new ReactiveDict();

Template.PaidoutsDetails.rendered = function() {
	
};

Template.PaidoutsDetails.events({
	
});

Template.PaidoutsDetails.helpers({
	
});

Template.PaidoutsDetailsDetailsForm.rendered = function() {
	

	$('select').material_select();
	Materialize.updateTextFields();

	pageSession.set("paidoutsDetailsDetailsFormInfoMessage", "");
	pageSession.set("paidoutsDetailsDetailsFormErrorMessage", "");

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

Template.PaidoutsDetailsDetailsForm.events({
	"click #form-submit-button": function(e, t) {
		e.preventDefault();
		$(".form_PaidoutsDetailsDetailsForm").submit();
	},
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("paidoutsDetailsDetailsFormInfoMessage", "");
		pageSession.set("paidoutsDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var paidoutsDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(paidoutsDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("paidoutsDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("paidoutsDetailsDetailsFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		/*CANCEL_REDIRECT*/
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		Router.go("paidouts", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("paidouts", {});
	}

	
});

Template.PaidoutsDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("paidoutsDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("paidoutsDetailsDetailsFormErrorMessage");
	}
	
});

var pageSession = new ReactiveDict();

Template.EmployeesDetails.rendered = function() {
	
};

Template.EmployeesDetails.events({
	
});

Template.EmployeesDetails.helpers({
	
});

Template.EmployeesDetailsDetailsForm.rendered = function() {
	

	$('select').material_select();
	Materialize.updateTextFields();

	pageSession.set("employeesDetailsDetailsFormInfoMessage", "");
	pageSession.set("employeesDetailsDetailsFormErrorMessage", "");

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

Template.EmployeesDetailsDetailsForm.events({
	"click #form-submit-button": function(e, t) {
		e.preventDefault();
		$(".form_EmployeesDetailsDetailsForm").submit();
	},
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("employeesDetailsDetailsFormInfoMessage", "");
		pageSession.set("employeesDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var employeesDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(employeesDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("employeesDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("employeesDetailsDetailsFormErrorMessage", message);
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

		Router.go("employees", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("employees", {});
	}

	
});

Template.EmployeesDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("employeesDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("employeesDetailsDetailsFormErrorMessage");
	}
	
});

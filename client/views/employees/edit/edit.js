var pageSession = new ReactiveDict();

Template.EmployeesEdit.rendered = function() {
	
};

Template.EmployeesEdit.events({
	
});

Template.EmployeesEdit.helpers({
	
});

Template.EmployeesEditEditForm.rendered = function() {
	

	$('select').material_select();
	Materialize.updateTextFields();

	pageSession.set("employeesEditEditFormInfoMessage", "");
	pageSession.set("employeesEditEditFormErrorMessage", "");

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

Template.EmployeesEditEditForm.events({
	"click #form-submit-button": function(e, t) {
		e.preventDefault();
		$(".form_EmployeesEditEditForm").submit();
	},
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("employeesEditEditFormInfoMessage", "");
		pageSession.set("employeesEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var employeesEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(employeesEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("employeesEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("employees", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("employeesEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Employees.update({ _id: t.data.employee_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("employees", {});
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

Template.EmployeesEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("employeesEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("employeesEditEditFormErrorMessage");
	}
	
});

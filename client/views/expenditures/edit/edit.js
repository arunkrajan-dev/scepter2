var pageSession = new ReactiveDict();

Template.ExpendituresEdit.rendered = function() {
	
};

Template.ExpendituresEdit.events({
	
});

Template.ExpendituresEdit.helpers({
	
});

Template.ExpendituresEditEditForm.rendered = function() {
	

	$('select').material_select();
	Materialize.updateTextFields();

	pageSession.set("expendituresEditEditFormInfoMessage", "");
	pageSession.set("expendituresEditEditFormErrorMessage", "");

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

Template.ExpendituresEditEditForm.events({
	"click #form-submit-button": function(e, t) {
		e.preventDefault();
		$(".form_ExpendituresEditEditForm").submit();
	},
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("expendituresEditEditFormInfoMessage", "");
		pageSession.set("expendituresEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var expendituresEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(expendituresEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("expendituresEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("expenditures", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("expendituresEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Expenditures.update({ _id: t.data.expenditure_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("expenditures", {});
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

Template.ExpendituresEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("expendituresEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("expendituresEditEditFormErrorMessage");
	}
	
});

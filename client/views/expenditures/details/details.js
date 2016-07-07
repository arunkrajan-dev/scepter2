var pageSession = new ReactiveDict();

Template.ExpendituresDetails.rendered = function() {
	
};

Template.ExpendituresDetails.events({
	
});

Template.ExpendituresDetails.helpers({
	
});

Template.ExpendituresDetailsDetailsForm.rendered = function() {
	

	$('select').material_select();
	Materialize.updateTextFields();

	pageSession.set("expendituresDetailsDetailsFormInfoMessage", "");
	pageSession.set("expendituresDetailsDetailsFormErrorMessage", "");

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

Template.ExpendituresDetailsDetailsForm.events({
	"click #form-submit-button": function(e, t) {
		e.preventDefault();
		$(".form_ExpendituresDetailsDetailsForm").submit();
	},
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("expendituresDetailsDetailsFormInfoMessage", "");
		pageSession.set("expendituresDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var expendituresDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(expendituresDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("expendituresDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("expendituresDetailsDetailsFormErrorMessage", message);
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

		Router.go("expenditures", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("expenditures", {});
	}

	
});

Template.ExpendituresDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("expendituresDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("expendituresDetailsDetailsFormErrorMessage");
	}
	
});

var pageSession = new ReactiveDict();

Template.OthersDetails.rendered = function() {
	
};

Template.OthersDetails.events({
	
});

Template.OthersDetails.helpers({
	
});

Template.OthersDetailsDetailsForm.rendered = function() {
	

	$('select').material_select();
	Materialize.updateTextFields();

	pageSession.set("othersDetailsDetailsFormInfoMessage", "");
	pageSession.set("othersDetailsDetailsFormErrorMessage", "");

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

Template.OthersDetailsDetailsForm.events({
	"click #form-submit-button": function(e, t) {
		e.preventDefault();
		$(".form_OthersDetailsDetailsForm").submit();
	},
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("othersDetailsDetailsFormInfoMessage", "");
		pageSession.set("othersDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var othersDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(othersDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("othersDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("othersDetailsDetailsFormErrorMessage", message);
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

		Router.go("others", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("others", {});
	}

	
});

Template.OthersDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("othersDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("othersDetailsDetailsFormErrorMessage");
	}
	
});

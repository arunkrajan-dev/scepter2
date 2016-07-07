var pageSession = new ReactiveDict();

Template.PaidoutsEdit.rendered = function() {
	
};

Template.PaidoutsEdit.events({
	
});

Template.PaidoutsEdit.helpers({
	
});

Template.PaidoutsEditEditForm.rendered = function() {
	

	$('select').material_select();
	Materialize.updateTextFields();

	pageSession.set("paidoutsEditEditFormInfoMessage", "");
	pageSession.set("paidoutsEditEditFormErrorMessage", "");

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

Template.PaidoutsEditEditForm.events({
	"click #form-submit-button": function(e, t) {
		e.preventDefault();
		$(".form_PaidoutsEditEditForm").submit();
	},
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("paidoutsEditEditFormInfoMessage", "");
		pageSession.set("paidoutsEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var paidoutsEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(paidoutsEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("paidoutsEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("paidouts", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("paidoutsEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Paidouts.update({ _id: t.data.paidout_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("paidouts", {});
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

Template.PaidoutsEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("paidoutsEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("paidoutsEditEditFormErrorMessage");
	}
	
});

var pageSession = new ReactiveDict();

Template.DocumentsEdit.rendered = function() {
	
};

Template.DocumentsEdit.events({
	
});

Template.DocumentsEdit.helpers({
	
});

Template.DocumentsEditEditForm.rendered = function() {
	

	$('select').material_select();
	Materialize.updateTextFields();

	pageSession.set("documentsEditEditFormInfoMessage", "");
	pageSession.set("documentsEditEditFormErrorMessage", "");

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

Template.DocumentsEditEditForm.events({
	"click #form-submit-button": function(e, t) {
		e.preventDefault();
		$(".form_DocumentsEditEditForm").submit();
	},
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("documentsEditEditFormInfoMessage", "");
		pageSession.set("documentsEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var documentsEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(documentsEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("documentsEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("documents", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("documentsEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Documents.update({ _id: t.data.document_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("documents", {});
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

Template.DocumentsEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("documentsEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("documentsEditEditFormErrorMessage");
	}
	
});

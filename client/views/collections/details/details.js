var pageSession = new ReactiveDict();

Template.CollectionsDetails.rendered = function() {
	
};

Template.CollectionsDetails.events({
	
});

Template.CollectionsDetails.helpers({
	
});

Template.CollectionsDetailsDetailsForm.rendered = function() {
	

	$('select').material_select();
	Materialize.updateTextFields();

	pageSession.set("collectionsDetailsDetailsFormInfoMessage", "");
	pageSession.set("collectionsDetailsDetailsFormErrorMessage", "");

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

Template.CollectionsDetailsDetailsForm.events({
	"click #form-submit-button": function(e, t) {
		e.preventDefault();
		$(".form_CollectionsDetailsDetailsForm").submit();
	},
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("collectionsDetailsDetailsFormInfoMessage", "");
		pageSession.set("collectionsDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var collectionsDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(collectionsDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("collectionsDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("collectionsDetailsDetailsFormErrorMessage", message);
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

		Router.go("collections", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("collections", {});
	}

	
});

Template.CollectionsDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("collectionsDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("collectionsDetailsDetailsFormErrorMessage");
	}
	
});

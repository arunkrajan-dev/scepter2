var pageSession = new ReactiveDict();

Template.CollectionsEdit.rendered = function() {
	
};

Template.CollectionsEdit.events({
	
});

Template.CollectionsEdit.helpers({
	
});

Template.CollectionsEditEditForm.rendered = function() {
	

	$('select').material_select();
	Materialize.updateTextFields();

	pageSession.set("collectionsEditEditFormInfoMessage", "");
	pageSession.set("collectionsEditEditFormErrorMessage", "");

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

Template.CollectionsEditEditForm.events({
	"click #form-submit-button": function(e, t) {
		e.preventDefault();
		$(".form_CollectionsEditEditForm").submit();
	},
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("collectionsEditEditFormInfoMessage", "");
		pageSession.set("collectionsEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var collectionsEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(collectionsEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("collectionsEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("collections", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("collectionsEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Collections.update({ _id: t.data.collection_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("collections", {});
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

Template.CollectionsEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("collectionsEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("collectionsEditEditFormErrorMessage");
	}
	
});

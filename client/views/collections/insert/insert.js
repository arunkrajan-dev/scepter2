var pageSession = new ReactiveDict();

Template.CollectionsInsert.rendered = function() {
	
};

Template.CollectionsInsert.events({
	
});

Template.CollectionsInsert.helpers({
	
});

Template.CollectionsInsertInsertForm.rendered = function() {
	

	$('select').material_select();
	Materialize.updateTextFields();

	pageSession.set("collectionsInsertInsertFormInfoMessage", "");
	pageSession.set("collectionsInsertInsertFormErrorMessage", "");

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

Template.CollectionsInsertInsertForm.events({
	"click #form-submit-button": function(e, t) {
		e.preventDefault();
		$(".form_CollectionsInsertInsertForm").submit();
	},
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("collectionsInsertInsertFormInfoMessage", "");
		pageSession.set("collectionsInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var collectionsInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(collectionsInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("collectionsInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("collections", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("collectionsInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = Collections.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.CollectionsInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("collectionsInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("collectionsInsertInsertFormErrorMessage");
	}
	
});

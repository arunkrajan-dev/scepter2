var pageSession = new ReactiveDict();

Template.ExpendituresInsert.rendered = function() {
	
};

Template.ExpendituresInsert.events({
	
});

Template.ExpendituresInsert.helpers({
	
});

Template.ExpendituresInsertInsertForm.rendered = function() {
	

	$('select').material_select();
	Materialize.updateTextFields();

	pageSession.set("expendituresInsertInsertFormInfoMessage", "");
	pageSession.set("expendituresInsertInsertFormErrorMessage", "");

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

Template.ExpendituresInsertInsertForm.events({
	"click #form-submit-button": function(e, t) {
		e.preventDefault();
		$(".form_ExpendituresInsertInsertForm").submit();
	},
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("expendituresInsertInsertFormInfoMessage", "");
		pageSession.set("expendituresInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var expendituresInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(expendituresInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("expendituresInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("expenditures", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("expendituresInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = Expenditures.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.ExpendituresInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("expendituresInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("expendituresInsertInsertFormErrorMessage");
	}
	
});

var pageSession = new ReactiveDict();

Template.SuppliersInsert.rendered = function() {
	
};

Template.SuppliersInsert.events({
	
});

Template.SuppliersInsert.helpers({
	
});

Template.SuppliersInsertInsertForm.rendered = function() {
	

	$('select').material_select();
	Materialize.updateTextFields();

	pageSession.set("suppliersInsertInsertFormInfoMessage", "");
	pageSession.set("suppliersInsertInsertFormErrorMessage", "");

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

Template.SuppliersInsertInsertForm.events({
	"click #form-submit-button": function(e, t) {
		e.preventDefault();
		$(".form_SuppliersInsertInsertForm").submit();
	},
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("suppliersInsertInsertFormInfoMessage", "");
		pageSession.set("suppliersInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var suppliersInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(suppliersInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("suppliersInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("suppliers", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("suppliersInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = Suppliers.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("suppliers", {});
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

Template.SuppliersInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("suppliersInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("suppliersInsertInsertFormErrorMessage");
	}
	
});

var pageSession = new ReactiveDict();

Template.MembersInsert.rendered = function() {
	
};

Template.MembersInsert.events({
	
});

Template.MembersInsert.helpers({
	
});

Template.MembersInsertInsertForm.rendered = function() {
	

	$('select').material_select();
	Materialize.updateTextFields();

	pageSession.set("membersInsertInsertFormInfoMessage", "");
	pageSession.set("membersInsertInsertFormErrorMessage", "");

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

Template.MembersInsertInsertForm.events({
	"click #form-submit-button": function(e, t) {
		e.preventDefault();
		$(".form_MembersInsertInsertForm").submit();
	},
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("membersInsertInsertFormInfoMessage", "");
		pageSession.set("membersInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var membersInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(membersInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("membersInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("members", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("membersInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = Members.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("members", {});
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

Template.MembersInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("membersInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("membersInsertInsertFormErrorMessage");
	}
	
});

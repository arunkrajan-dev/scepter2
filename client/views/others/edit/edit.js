var pageSession = new ReactiveDict();

Template.OthersEdit.rendered = function() {
	
};

Template.OthersEdit.events({
	
});

Template.OthersEdit.helpers({
	
});

Template.OthersEditEditForm.rendered = function() {
	

	$('select').material_select();
	Materialize.updateTextFields();

	pageSession.set("othersEditEditFormInfoMessage", "");
	pageSession.set("othersEditEditFormErrorMessage", "");

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

Template.OthersEditEditForm.events({
	"click #form-submit-button": function(e, t) {
		e.preventDefault();
		$(".form_OthersEditEditForm").submit();
	},
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("othersEditEditFormInfoMessage", "");
		pageSession.set("othersEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var othersEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(othersEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("othersEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("others", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("othersEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Others.update({ _id: t.data.other_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("others", {});
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

Template.OthersEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("othersEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("othersEditEditFormErrorMessage");
	}
	
});

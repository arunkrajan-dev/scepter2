var pageSession = new ReactiveDict();

Template.ProductsEdit.rendered = function() {
	
};

Template.ProductsEdit.events({
	
});

Template.ProductsEdit.helpers({
	
});

Template.ProductsEditEditForm.rendered = function() {
	

	$('select').material_select();
	Materialize.updateTextFields();

	pageSession.set("productsEditEditFormInfoMessage", "");
	pageSession.set("productsEditEditFormErrorMessage", "");

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

Template.ProductsEditEditForm.events({
	"click #form-submit-button": function(e, t) {
		e.preventDefault();
		$(".form_ProductsEditEditForm").submit();
	},
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("productsEditEditFormInfoMessage", "");
		pageSession.set("productsEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var productsEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(productsEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("productsEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("products", {account: self.params.account});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("productsEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Products.update({ _id: t.data.product_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("products", {account: this.params.account});
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

Template.ProductsEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("productsEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("productsEditEditFormErrorMessage");
	}
	
});

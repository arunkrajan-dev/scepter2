var pageSession = new ReactiveDict();

Template.Employees.rendered = function() {
	
};

Template.Employees.events({
	
});

Template.Employees.helpers({
	
});

var EmployeesViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("EmployeesViewSearchString");
	var sortBy = pageSession.get("EmployeesViewSortBy");
	var sortAscending = pageSession.get("EmployeesViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name", "gender", "phone", "education", "role", "datejoined", "proof", "email", "address", "note"];
		filtered = _.filter(raw, function(item) {
			var match = false;
			_.each(searchFields, function(field) {
				var value = (getPropertyValue(field, item) || "") + "";

				match = match || (value && value.match(regEx));
				if(match) {
					return false;
				}
			})
			return match;
		});
	}

	// sort
	if(sortBy) {
		filtered = _.sortBy(filtered, sortBy);

		// descending?
		if(!sortAscending) {
			filtered = filtered.reverse();
		}
	}

	return filtered;
};

var EmployeesViewExport = function(cursor, fileType) {
	var data = EmployeesViewItems(cursor);
	var exportFields = ["name", "phone", "datejoined", "proof", "email", "address", "note"];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.EmployeesView.rendered = function() {
	pageSession.set("EmployeesViewStyle", "table");
	
};

Template.EmployeesView.events({
	"submit #dataview-controls": function(e, t) {
		return false;
	},

	"click #dataview-search-button": function(e, t) {
		e.preventDefault();
		var form = $(e.currentTarget).parent();
		if(form) {
			var searchInput = form.find("#dataview-search-input");
			if(searchInput) {
				searchInput.focus();
				var searchString = searchInput.val();
				pageSession.set("EmployeesViewSearchString", searchString);
			}

		}
		return false;
	},

	"keydown #dataview-search-input": function(e, t) {
		if(e.which === 13)
		{
			e.preventDefault();
			var form = $(e.currentTarget).parent();
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					var searchString = searchInput.val();
					pageSession.set("EmployeesViewSearchString", searchString);
				}

			}
			return false;
		}

		if(e.which === 27)
		{
			e.preventDefault();
			var form = $(e.currentTarget).parent();
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					searchInput.val("");
					pageSession.set("EmployeesViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("employees.insert", {});
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		EmployeesViewExport(this.employee_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		EmployeesViewExport(this.employee_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		EmployeesViewExport(this.employee_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		EmployeesViewExport(this.employee_list, "json");
	}

	
});

Template.EmployeesView.helpers({

	"insertButtonClass": function() {
		return Employees.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.employee_list || this.employee_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.employee_list && this.employee_list.count() > 0;
	},
	"isNotFound": function() {
		return this.employee_list && pageSession.get("EmployeesViewSearchString") && EmployeesViewItems(this.employee_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("EmployeesViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("EmployeesViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("EmployeesViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("EmployeesViewStyle") == "gallery";
	}

	
});


Template.EmployeesViewTable.rendered = function() {
	
};

Template.EmployeesViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("EmployeesViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("EmployeesViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("EmployeesViewSortAscending") || false;
			pageSession.set("EmployeesViewSortAscending", !sortAscending);
		} else {
			pageSession.set("EmployeesViewSortAscending", true);
		}
	},
	
});

Template.EmployeesViewTable.helpers({
	"tableItems": function() {
		return EmployeesViewItems(this.employee_list);
	}
});


Template.EmployeesViewTableItems.rendered = function() {
	
};

Template.EmployeesViewTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		
		Router.go("employees.details", {employeeId: this._id});
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Employees.update({ _id: this._id }, { $set: values });

		return false;
	},

	"click #delete-button": function(e, t) {
		e.preventDefault();

		var me = this,
			el = $('.modal');

		el.openModal({
			dismissible: true, // Modal can be dismissed by clicking outside of the modal
			opacity: .5, // Opacity of modal background
			in_duration: 300, // Transition in duration
			out_duration: 200, // Transition out duration
			ready: function() {
				el.find('.modal-confirm').on('click', function() {
					Employees.remove({ _id: me._id });
				});
			}, // Callback for Modal open
			complete: function() {  } // Callback for Modal close
		});

		return false;
	},

	"click #edit-button": function(e, t) {
		e.preventDefault();
		Router.go("employees.edit", {employeeId: this._id});
		return false;
	}
});

Template.EmployeesViewTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Employees.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Employees.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

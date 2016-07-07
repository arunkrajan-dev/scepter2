var pageSession = new ReactiveDict();

Template.Expenditures.rendered = function() {
	
};

Template.Expenditures.events({
	
});

Template.Expenditures.helpers({
	
});

var ExpendituresViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("ExpendituresViewSearchString");
	var sortBy = pageSession.get("ExpendituresViewSortBy");
	var sortAscending = pageSession.get("ExpendituresViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["type", "subType", "date", "totalAmount"];
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

var ExpendituresViewExport = function(cursor, fileType) {
	var data = ExpendituresViewItems(cursor);
	var exportFields = ["subType", "date", "totalAmount"];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.ExpendituresView.rendered = function() {
	pageSession.set("ExpendituresViewStyle", "table");
	
};

Template.ExpendituresView.events({
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
				pageSession.set("ExpendituresViewSearchString", searchString);
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
					pageSession.set("ExpendituresViewSearchString", searchString);
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
					pageSession.set("ExpendituresViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("expenditures.insert", {});
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		ExpendituresViewExport(this.expenditure_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		ExpendituresViewExport(this.expenditure_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		ExpendituresViewExport(this.expenditure_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		ExpendituresViewExport(this.expenditure_list, "json");
	}

	
});

Template.ExpendituresView.helpers({

	"insertButtonClass": function() {
		return Expenditures.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.expenditure_list || this.expenditure_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.expenditure_list && this.expenditure_list.count() > 0;
	},
	"isNotFound": function() {
		return this.expenditure_list && pageSession.get("ExpendituresViewSearchString") && ExpendituresViewItems(this.expenditure_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("ExpendituresViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("ExpendituresViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("ExpendituresViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("ExpendituresViewStyle") == "gallery";
	}

	
});


Template.ExpendituresViewTable.rendered = function() {
	
};

Template.ExpendituresViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("ExpendituresViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("ExpendituresViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("ExpendituresViewSortAscending") || false;
			pageSession.set("ExpendituresViewSortAscending", !sortAscending);
		} else {
			pageSession.set("ExpendituresViewSortAscending", true);
		}
	},
	
});

Template.ExpendituresViewTable.helpers({
	"tableItems": function() {
		return ExpendituresViewItems(this.expenditure_list);
	}
});


Template.ExpendituresViewTableItems.rendered = function() {
	
};

Template.ExpendituresViewTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		
		Router.go("expenditures.details", {expenditureId: this._id});
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Expenditures.update({ _id: this._id }, { $set: values });

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
					Expenditures.remove({ _id: me._id });
				});
			}, // Callback for Modal open
			complete: function() {  } // Callback for Modal close
		});

		return false;
	},

	"click #edit-button": function(e, t) {
		e.preventDefault();
		Router.go("expenditures.edit", {expenditureId: this._id});
		return false;
	}
});

Template.ExpendituresViewTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Expenditures.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Expenditures.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

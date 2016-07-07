var pageSession = new ReactiveDict();

Template.Suppliers.rendered = function() {
	
};

Template.Suppliers.events({
	
});

Template.Suppliers.helpers({
	
});

var SuppliersViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("SuppliersViewSearchString");
	var sortBy = pageSession.get("SuppliersViewSortBy");
	var sortAscending = pageSession.get("SuppliersViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name", "phone", "email", "website", "address", "note"];
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

var SuppliersViewExport = function(cursor, fileType) {
	var data = SuppliersViewItems(cursor);
	var exportFields = ["name", "phone", "email", "website", "address", "note"];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.SuppliersView.rendered = function() {
	pageSession.set("SuppliersViewStyle", "table");
	
};

Template.SuppliersView.events({
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
				pageSession.set("SuppliersViewSearchString", searchString);
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
					pageSession.set("SuppliersViewSearchString", searchString);
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
					pageSession.set("SuppliersViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("suppliers.insert", {});
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		SuppliersViewExport(this.supplier_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		SuppliersViewExport(this.supplier_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		SuppliersViewExport(this.supplier_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		SuppliersViewExport(this.supplier_list, "json");
	}

	
});

Template.SuppliersView.helpers({

	"insertButtonClass": function() {
		return Suppliers.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.supplier_list || this.supplier_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.supplier_list && this.supplier_list.count() > 0;
	},
	"isNotFound": function() {
		return this.supplier_list && pageSession.get("SuppliersViewSearchString") && SuppliersViewItems(this.supplier_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("SuppliersViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("SuppliersViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("SuppliersViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("SuppliersViewStyle") == "gallery";
	}

	
});


Template.SuppliersViewTable.rendered = function() {
	
};

Template.SuppliersViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("SuppliersViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("SuppliersViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("SuppliersViewSortAscending") || false;
			pageSession.set("SuppliersViewSortAscending", !sortAscending);
		} else {
			pageSession.set("SuppliersViewSortAscending", true);
		}
	},
	
});

Template.SuppliersViewTable.helpers({
	"tableItems": function() {
		return SuppliersViewItems(this.supplier_list);
	}
});


Template.SuppliersViewTableItems.rendered = function() {
	
};

Template.SuppliersViewTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		
		Router.go("suppliers.details", {supplierId: this._id});
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Suppliers.update({ _id: this._id }, { $set: values });

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
					Suppliers.remove({ _id: me._id });
				});
			}, // Callback for Modal open
			complete: function() {  } // Callback for Modal close
		});

		return false;
	},

	"click #edit-button": function(e, t) {
		e.preventDefault();
		Router.go("suppliers.edit", {supplierId: this._id});
		return false;
	}
});

Template.SuppliersViewTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Suppliers.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Suppliers.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

var pageSession = new ReactiveDict();

Template.Documents.rendered = function() {
	
};

Template.Documents.events({
	
});

Template.Documents.helpers({
	
});

var DocumentsViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("DocumentsViewSearchString");
	var sortBy = pageSession.get("DocumentsViewSortBy");
	var sortAscending = pageSession.get("DocumentsViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name", "note"];
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

var DocumentsViewExport = function(cursor, fileType) {
	var data = DocumentsViewItems(cursor);
	var exportFields = ["name", "note"];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.DocumentsView.rendered = function() {
	pageSession.set("DocumentsViewStyle", "table");
	
};

Template.DocumentsView.events({
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
				pageSession.set("DocumentsViewSearchString", searchString);
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
					pageSession.set("DocumentsViewSearchString", searchString);
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
					pageSession.set("DocumentsViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("documents.insert", {});
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		DocumentsViewExport(this.document_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		DocumentsViewExport(this.document_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		DocumentsViewExport(this.document_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		DocumentsViewExport(this.document_list, "json");
	}

	
});

Template.DocumentsView.helpers({

	"insertButtonClass": function() {
		return Documents.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.document_list || this.document_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.document_list && this.document_list.count() > 0;
	},
	"isNotFound": function() {
		return this.document_list && pageSession.get("DocumentsViewSearchString") && DocumentsViewItems(this.document_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("DocumentsViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("DocumentsViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("DocumentsViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("DocumentsViewStyle") == "gallery";
	}

	
});


Template.DocumentsViewTable.rendered = function() {
	
};

Template.DocumentsViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("DocumentsViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("DocumentsViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("DocumentsViewSortAscending") || false;
			pageSession.set("DocumentsViewSortAscending", !sortAscending);
		} else {
			pageSession.set("DocumentsViewSortAscending", true);
		}
	},
	
});

Template.DocumentsViewTable.helpers({
	"tableItems": function() {
		return DocumentsViewItems(this.document_list);
	}
});


Template.DocumentsViewTableItems.rendered = function() {
	
};

Template.DocumentsViewTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		
		Router.go("documents.details", {documentId: this._id});
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Documents.update({ _id: this._id }, { $set: values });

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
					Documents.remove({ _id: me._id });
				});
			}, // Callback for Modal open
			complete: function() {  } // Callback for Modal close
		});

		return false;
	},

	"click #edit-button": function(e, t) {
		e.preventDefault();
		Router.go("documents.edit", {documentId: this._id});
		return false;
	}
});

Template.DocumentsViewTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Documents.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Documents.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

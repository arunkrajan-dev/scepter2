var pageSession = new ReactiveDict();

Template.Others.rendered = function() {
	
};

Template.Others.events({
	
});

Template.Others.helpers({
	
});

var OthersViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("OthersViewSearchString");
	var sortBy = pageSession.get("OthersViewSortBy");
	var sortAscending = pageSession.get("OthersViewSortAscending");
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

var OthersViewExport = function(cursor, fileType) {
	var data = OthersViewItems(cursor);
	var exportFields = ["name", "phone", "email", "website", "address", "note"];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.OthersView.rendered = function() {
	pageSession.set("OthersViewStyle", "table");
	
};

Template.OthersView.events({
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
				pageSession.set("OthersViewSearchString", searchString);
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
					pageSession.set("OthersViewSearchString", searchString);
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
					pageSession.set("OthersViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("others.insert", {});
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		OthersViewExport(this.other_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		OthersViewExport(this.other_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		OthersViewExport(this.other_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		OthersViewExport(this.other_list, "json");
	}

	
});

Template.OthersView.helpers({

	"insertButtonClass": function() {
		return Others.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.other_list || this.other_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.other_list && this.other_list.count() > 0;
	},
	"isNotFound": function() {
		return this.other_list && pageSession.get("OthersViewSearchString") && OthersViewItems(this.other_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("OthersViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("OthersViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("OthersViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("OthersViewStyle") == "gallery";
	}

	
});


Template.OthersViewTable.rendered = function() {
	
};

Template.OthersViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("OthersViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("OthersViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("OthersViewSortAscending") || false;
			pageSession.set("OthersViewSortAscending", !sortAscending);
		} else {
			pageSession.set("OthersViewSortAscending", true);
		}
	},
	
});

Template.OthersViewTable.helpers({
	"tableItems": function() {
		return OthersViewItems(this.other_list);
	}
});


Template.OthersViewTableItems.rendered = function() {
	
};

Template.OthersViewTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		
		Router.go("others.details", {otherId: this._id});
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Others.update({ _id: this._id }, { $set: values });

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
					Others.remove({ _id: me._id });
				});
			}, // Callback for Modal open
			complete: function() {  } // Callback for Modal close
		});

		return false;
	},

	"click #edit-button": function(e, t) {
		e.preventDefault();
		Router.go("others.edit", {otherId: this._id});
		return false;
	}
});

Template.OthersViewTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Others.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Others.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

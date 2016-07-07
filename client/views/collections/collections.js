var pageSession = new ReactiveDict();

Template.Collections.rendered = function() {
	
};

Template.Collections.events({
	
});

Template.Collections.helpers({
	
});

var CollectionsViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("CollectionsViewSearchString");
	var sortBy = pageSession.get("CollectionsViewSortBy");
	var sortAscending = pageSession.get("CollectionsViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["date", "memberId", "member.name", "totalAmount"];
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

var CollectionsViewExport = function(cursor, fileType) {
	var data = CollectionsViewItems(cursor);
	var exportFields = ["date", "member.name", "totalAmount"];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.CollectionsView.rendered = function() {
	pageSession.set("CollectionsViewStyle", "table");
	
};

Template.CollectionsView.events({
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
				pageSession.set("CollectionsViewSearchString", searchString);
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
					pageSession.set("CollectionsViewSearchString", searchString);
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
					pageSession.set("CollectionsViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("collections.insert", {});
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		CollectionsViewExport(this.collection_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		CollectionsViewExport(this.collection_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		CollectionsViewExport(this.collection_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		CollectionsViewExport(this.collection_list, "json");
	}

	
});

Template.CollectionsView.helpers({

	"insertButtonClass": function() {
		return Collections.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.collection_list || this.collection_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.collection_list && this.collection_list.count() > 0;
	},
	"isNotFound": function() {
		return this.collection_list && pageSession.get("CollectionsViewSearchString") && CollectionsViewItems(this.collection_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("CollectionsViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("CollectionsViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("CollectionsViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("CollectionsViewStyle") == "gallery";
	}

	
});


Template.CollectionsViewTable.rendered = function() {
	
};

Template.CollectionsViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("CollectionsViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("CollectionsViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("CollectionsViewSortAscending") || false;
			pageSession.set("CollectionsViewSortAscending", !sortAscending);
		} else {
			pageSession.set("CollectionsViewSortAscending", true);
		}
	},
	
});

Template.CollectionsViewTable.helpers({
	"tableItems": function() {
		return CollectionsViewItems(this.collection_list);
	}
});


Template.CollectionsViewTableItems.rendered = function() {
	
};

Template.CollectionsViewTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		
		Router.go("collections.details", {collectionId: this._id});
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Collections.update({ _id: this._id }, { $set: values });

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
					Collections.remove({ _id: me._id });
				});
			}, // Callback for Modal open
			complete: function() {  } // Callback for Modal close
		});

		return false;
	},

	"click #edit-button": function(e, t) {
		e.preventDefault();
		Router.go("collections.edit", {collectionId: this._id});
		return false;
	}
});

Template.CollectionsViewTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Collections.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Collections.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

var pageSession = new ReactiveDict();

Template.Paidouts.rendered = function() {
	
};

Template.Paidouts.events({
	
});

Template.Paidouts.helpers({
	
});

var PaidoutsViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("PaidoutsViewSearchString");
	var sortBy = pageSession.get("PaidoutsViewSortBy");
	var sortAscending = pageSession.get("PaidoutsViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["date", "supplierId", "supplier.name", "totalAmount"];
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

var PaidoutsViewExport = function(cursor, fileType) {
	var data = PaidoutsViewItems(cursor);
	var exportFields = ["date", "supplier.name", "totalAmount"];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.PaidoutsView.rendered = function() {
	pageSession.set("PaidoutsViewStyle", "table");
	
};

Template.PaidoutsView.events({
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
				pageSession.set("PaidoutsViewSearchString", searchString);
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
					pageSession.set("PaidoutsViewSearchString", searchString);
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
					pageSession.set("PaidoutsViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("paidouts.insert", {});
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		PaidoutsViewExport(this.paidout_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		PaidoutsViewExport(this.paidout_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		PaidoutsViewExport(this.paidout_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		PaidoutsViewExport(this.paidout_list, "json");
	}

	
});

Template.PaidoutsView.helpers({

	"insertButtonClass": function() {
		return Paidouts.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.paidout_list || this.paidout_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.paidout_list && this.paidout_list.count() > 0;
	},
	"isNotFound": function() {
		return this.paidout_list && pageSession.get("PaidoutsViewSearchString") && PaidoutsViewItems(this.paidout_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("PaidoutsViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("PaidoutsViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("PaidoutsViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("PaidoutsViewStyle") == "gallery";
	}

	
});


Template.PaidoutsViewTable.rendered = function() {
	
};

Template.PaidoutsViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("PaidoutsViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("PaidoutsViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("PaidoutsViewSortAscending") || false;
			pageSession.set("PaidoutsViewSortAscending", !sortAscending);
		} else {
			pageSession.set("PaidoutsViewSortAscending", true);
		}
	},
	
});

Template.PaidoutsViewTable.helpers({
	"tableItems": function() {
		return PaidoutsViewItems(this.paidout_list);
	}
});


Template.PaidoutsViewTableItems.rendered = function() {
	
};

Template.PaidoutsViewTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		
		Router.go("paidouts.details", {paidoutId: this._id});
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Paidouts.update({ _id: this._id }, { $set: values });

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
					Paidouts.remove({ _id: me._id });
				});
			}, // Callback for Modal open
			complete: function() {  } // Callback for Modal close
		});

		return false;
	},

	"click #edit-button": function(e, t) {
		e.preventDefault();
		Router.go("paidouts.edit", {paidoutId: this._id});
		return false;
	}
});

Template.PaidoutsViewTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Paidouts.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Paidouts.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

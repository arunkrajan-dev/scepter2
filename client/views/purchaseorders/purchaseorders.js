var pageSession = new ReactiveDict();

Template.Purchaseorders.rendered = function() {
	
};

Template.Purchaseorders.events({
	
});

Template.Purchaseorders.helpers({
	
});

var PurchaseordersViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("PurchaseordersViewSearchString");
	var sortBy = pageSession.get("PurchaseordersViewSortBy");
	var sortAscending = pageSession.get("PurchaseordersViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["purchaseorderNumber", "date", "supplierId", "supplier.name", "totalAmount"];
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

var PurchaseordersViewExport = function(cursor, fileType) {
	var data = PurchaseordersViewItems(cursor);
	var exportFields = ["purchaseorderNumber", "date", "supplier.name", "totalAmount"];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.PurchaseordersView.rendered = function() {
	pageSession.set("PurchaseordersViewStyle", "table");
	
};

Template.PurchaseordersView.events({
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
				pageSession.set("PurchaseordersViewSearchString", searchString);
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
					pageSession.set("PurchaseordersViewSearchString", searchString);
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
					pageSession.set("PurchaseordersViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("purchaseorders.insert", {account: this.params.account});
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		PurchaseordersViewExport(this.purchaseorder_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		PurchaseordersViewExport(this.purchaseorder_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		PurchaseordersViewExport(this.purchaseorder_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		PurchaseordersViewExport(this.purchaseorder_list, "json");
	}

	
});

Template.PurchaseordersView.helpers({

	"insertButtonClass": function() {
		return Purchaseorders.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.purchaseorder_list || this.purchaseorder_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.purchaseorder_list && this.purchaseorder_list.count() > 0;
	},
	"isNotFound": function() {
		return this.purchaseorder_list && pageSession.get("PurchaseordersViewSearchString") && PurchaseordersViewItems(this.purchaseorder_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("PurchaseordersViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("PurchaseordersViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("PurchaseordersViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("PurchaseordersViewStyle") == "gallery";
	}

	
});


Template.PurchaseordersViewTable.rendered = function() {
	
};

Template.PurchaseordersViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("PurchaseordersViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("PurchaseordersViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("PurchaseordersViewSortAscending") || false;
			pageSession.set("PurchaseordersViewSortAscending", !sortAscending);
		} else {
			pageSession.set("PurchaseordersViewSortAscending", true);
		}
	},
	
});

Template.PurchaseordersViewTable.helpers({
	"tableItems": function() {
		return PurchaseordersViewItems(this.purchaseorder_list);
	}
});


Template.PurchaseordersViewTableItems.rendered = function() {
	
};

Template.PurchaseordersViewTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		
		Router.go("purchaseorders.details", {purchaseorderId: this._id, account: this.account});
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Purchaseorders.update({ _id: this._id }, { $set: values });

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
					Purchaseorders.remove({ _id: me._id });
				});
			}, // Callback for Modal open
			complete: function() {  } // Callback for Modal close
		});

		return false;
	},

	"click #edit-button": function(e, t) {
		e.preventDefault();
		Router.go("purchaseorders.edit", {purchaseorderId: this._id, account: this.account});
		return false;
	}
});

Template.PurchaseordersViewTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Purchaseorders.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Purchaseorders.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

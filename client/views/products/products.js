var pageSession = new ReactiveDict();

Template.Products.rendered = function() {
	
};

Template.Products.events({
	
});

Template.Products.helpers({
	
});

var ProductsViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("ProductsViewSearchString");
	var sortBy = pageSession.get("ProductsViewSortBy");
	var sortAscending = pageSession.get("ProductsViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name", "note", "price"];
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

var ProductsViewExport = function(cursor, fileType) {
	var data = ProductsViewItems(cursor);
	var exportFields = ["name", "note", "price"];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.ProductsView.rendered = function() {
	pageSession.set("ProductsViewStyle", "table");
	
};

Template.ProductsView.events({
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
				pageSession.set("ProductsViewSearchString", searchString);
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
					pageSession.set("ProductsViewSearchString", searchString);
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
					pageSession.set("ProductsViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("products.insert", {account: this.params.account});
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		ProductsViewExport(this.product_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		ProductsViewExport(this.product_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		ProductsViewExport(this.product_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		ProductsViewExport(this.product_list, "json");
	}

	
});

Template.ProductsView.helpers({

	"insertButtonClass": function() {
		return Products.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.product_list || this.product_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.product_list && this.product_list.count() > 0;
	},
	"isNotFound": function() {
		return this.product_list && pageSession.get("ProductsViewSearchString") && ProductsViewItems(this.product_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("ProductsViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("ProductsViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("ProductsViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("ProductsViewStyle") == "gallery";
	}

	
});


Template.ProductsViewTable.rendered = function() {
	
};

Template.ProductsViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("ProductsViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("ProductsViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("ProductsViewSortAscending") || false;
			pageSession.set("ProductsViewSortAscending", !sortAscending);
		} else {
			pageSession.set("ProductsViewSortAscending", true);
		}
	},
	
});

Template.ProductsViewTable.helpers({
	"tableItems": function() {
		return ProductsViewItems(this.product_list);
	}
});


Template.ProductsViewTableItems.rendered = function() {
	
};

Template.ProductsViewTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		
		Router.go("products.details", {productId: this._id, account: this.account});
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Products.update({ _id: this._id }, { $set: values });

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
					Products.remove({ _id: me._id });
				});
			}, // Callback for Modal open
			complete: function() {  } // Callback for Modal close
		});

		return false;
	},

	"click #edit-button": function(e, t) {
		e.preventDefault();
		Router.go("products.edit", {productId: this._id, account: this.account});
		return false;
	}
});

Template.ProductsViewTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Products.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Products.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

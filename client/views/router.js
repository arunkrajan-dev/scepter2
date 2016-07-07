Router.configure({
	templateNameConverter: "upperCamelCase",
	routeControllerNameConverter: "upperCamelCase",
	layoutTemplate: "layout",
	notFoundTemplate: "notFound",
	loadingTemplate: "loading"
});

var publicRoutes = [
	"home_public",
	"login",
	"register",
	"forgot_password",
	"reset_password"
];

var privateRoutes = [
	"home_private",
	"members",
	"members.insert",
	"members.details",
	"members.edit",
	"suppliers",
	"suppliers.insert",
	"suppliers.details",
	"suppliers.edit",
	"employees",
	"employees.insert",
	"employees.details",
	"employees.edit",
	"others",
	"others.insert",
	"others.details",
	"others.edit",
	"products",
	"products.insert",
	"products.details",
	"products.edit",
	"documents",
	"documents.insert",
	"documents.details",
	"documents.edit",
	"collections",
	"collections.insert",
	"collections.details",
	"collections.edit",
	"paidouts",
	"paidouts.insert",
	"paidouts.details",
	"paidouts.edit",
	"expenditures",
	"expenditures.insert",
	"expenditures.details",
	"expenditures.edit",
	"invoices",
	"invoices.insert",
	"invoices.details",
	"invoices.details.items",
	"invoices.details.insert",
	"invoices.details.edit",
	"invoices.edit",
	"purchaseorders",
	"purchaseorders.insert",
	"purchaseorders.details",
	"purchaseorders.details.items",
	"purchaseorders.details.insert",
	"purchaseorders.details.edit",
	"purchaseorders.edit",
	"admin",
	"admin.users",
	"admin.users.details",
	"admin.users.insert",
	"admin.users.edit",
	"user_settings",
	"user_settings.profile",
	"user_settings.change_pass",
	"logout"
];

var freeRoutes = [
	
];

var roleMap = [
	{ route: "members",	roles: ["admin","md","gm"] },
	{ route: "members.insert",	roles: ["admin","md","gm"] },
	{ route: "members.details",	roles: ["admin","md","gm"] },
	{ route: "members.edit",	roles: ["admin","md","gm"] },
	{ route: "suppliers",	roles: ["admin","md","gm"] },
	{ route: "suppliers.insert",	roles: ["admin","md","gm"] },
	{ route: "suppliers.details",	roles: ["admin","md","gm"] },
	{ route: "suppliers.edit",	roles: ["admin","md","gm"] },
	{ route: "employees",	roles: ["admin","md","gm"] },
	{ route: "employees.insert",	roles: ["admin","md","gm"] },
	{ route: "employees.details",	roles: ["admin","md","gm"] },
	{ route: "employees.edit",	roles: ["admin","md","gm"] },
	{ route: "others",	roles: ["admin","md","gm"] },
	{ route: "others.insert",	roles: ["admin","md","gm"] },
	{ route: "others.details",	roles: ["admin","md","gm"] },
	{ route: "others.edit",	roles: ["admin","md","gm"] },
	{ route: "products",	roles: ["admin","md","gm"] },
	{ route: "products.insert",	roles: ["admin","md","gm"] },
	{ route: "products.details",	roles: ["admin","md","gm"] },
	{ route: "products.edit",	roles: ["admin","md","gm"] },
	{ route: "documents",	roles: ["admin","md","gm"] },
	{ route: "documents.insert",	roles: ["admin","md","gm"] },
	{ route: "documents.details",	roles: ["admin","md","gm"] },
	{ route: "documents.edit",	roles: ["admin","md","gm"] },
	{ route: "collections",	roles: ["admin","md","gm","line"] },
	{ route: "collections.insert",	roles: ["admin","md","gm","line"] },
	{ route: "collections.details",	roles: ["admin","md","gm","line"] },
	{ route: "collections.edit",	roles: ["admin","md","gm","line"] },
	{ route: "paidouts",	roles: ["admin","md","gm"] },
	{ route: "paidouts.insert",	roles: ["admin","md","gm"] },
	{ route: "paidouts.details",	roles: ["admin","md","gm"] },
	{ route: "paidouts.edit",	roles: ["admin","md","gm"] },
	{ route: "expenditures",	roles: ["admin","md","gm"] },
	{ route: "expenditures.insert",	roles: ["admin","md","gm"] },
	{ route: "expenditures.details",	roles: ["admin","md","gm"] },
	{ route: "expenditures.edit",	roles: ["admin","md","gm"] },
	{ route: "invoices",	roles: ["admin","md","gm","cashier"] },
	{ route: "invoices.insert",	roles: ["admin","md","gm","cashier"] },
	{ route: "invoices.details",	roles: ["admin","md","gm","cashier"] },
	{ route: "invoices.details.items",	roles: ["admin","md","gm","cashier"] },
	{ route: "invoices.details.insert",	roles: ["admin","md","gm","cashier"] },
	{ route: "invoices.details.edit",	roles: ["admin","md","gm","cashier"] },
	{ route: "invoices.edit",	roles: ["admin","md","gm","cashier"] },
	{ route: "purchaseorders",	roles: ["admin","md","gm","cashier"] },
	{ route: "purchaseorders.insert",	roles: ["admin","md","gm","cashier"] },
	{ route: "purchaseorders.details",	roles: ["admin","md","gm","cashier"] },
	{ route: "purchaseorders.details.items",	roles: ["admin","md","gm","cashier"] },
	{ route: "purchaseorders.details.insert",	roles: ["admin","md","gm","cashier"] },
	{ route: "purchaseorders.details.edit",	roles: ["admin","md","gm","cashier"] },
	{ route: "purchaseorders.edit",	roles: ["admin","md","gm","cashier"] },
	{ route: "admin",	roles: ["admin","md"] },
	{ route: "admin.users",	roles: ["admin","md"] },
	{ route: "admin.users.details",	roles: ["admin","md"] },
	{ route: "admin.users.insert",	roles: ["admin","md"] },
	{ route: "admin.users.edit",	roles: ["admin","md"] }
];

this.firstGrantedRoute = function(preferredRoute) {
	if(preferredRoute && routeGranted(preferredRoute)) return preferredRoute;

	var grantedRoute = "";

	_.every(privateRoutes, function(route) {
		if(routeGranted(route)) {
			grantedRoute = route;
			return false;
		}
		return true;
	});
	if(grantedRoute) return grantedRoute;

	_.every(publicRoutes, function(route) {
		if(routeGranted(route)) {
			grantedRoute = route;
			return false;
		}
		return true;
	});
	if(grantedRoute) return grantedRoute;

	_.every(freeRoutes, function(route) {
		if(routeGranted(route)) {
			grantedRoute = route;
			return false;
		}
		return true;
	});
	if(grantedRoute) return grantedRoute;

	if(!grantedRoute) {
		// what to do?
		console.log("All routes are restricted for current user.");
	}

	return "";
}

// this function returns true if user is in role allowed to access given route
this.routeGranted = function(routeName) {
	if(!routeName) {
		// route without name - enable access (?)
		return true;
	}

	if(!roleMap || roleMap.length === 0) {
		// this app don't have role map - enable access
		return true;
	}

	var roleMapItem = _.find(roleMap, function(roleItem) { return roleItem.route == routeName; });
	if(!roleMapItem) {
		// page is not restricted
		return true;
	}

	if(!Meteor.user() || !Meteor.user().roles) {
		// user is not logged in
		return false;
	}

	// this page is restricted to some role(s), check if user is in one of allowedRoles
	var allowedRoles = roleMapItem.roles;
	var granted = _.intersection(allowedRoles, Meteor.user().roles);
	if(!granted || granted.length === 0) {
		return false;
	}

	return true;
};

Router.ensureLogged = function() {
	if(Meteor.userId() && (!Meteor.user() || !Meteor.user().roles)) {
		this.render('loading');
		return;
	}

	if(!Meteor.userId()) {
		// user is not logged in - redirect to public home
		var redirectRoute = firstGrantedRoute("home_public");
		this.redirect(redirectRoute);
	} else {
		// user is logged in - check role
		if(!routeGranted(this.route.getName())) {
			// user is not in allowedRoles - redirect to first granted route
			var redirectRoute = firstGrantedRoute("home_private");
			this.redirect(redirectRoute);
		} else {
			this.next();
		}
	}
};

Router.ensureNotLogged = function() {
	if(Meteor.userId() && (!Meteor.user() || !Meteor.user().roles)) {
		this.render('loading');
		return;
	}

	if(Meteor.userId()) {
		var redirectRoute = firstGrantedRoute("home_private");
		this.redirect(redirectRoute);
	}
	else {
		this.next();
	}
};

// called for pages in free zone - some of pages can be restricted
Router.ensureGranted = function() {
	if(Meteor.userId() && (!Meteor.user() || !Meteor.user().roles)) {
		this.render('loading');
		return;
	}

	if(!routeGranted(this.route.getName())) {
		// user is not in allowedRoles - redirect to first granted route
		var redirectRoute = firstGrantedRoute("");
		this.redirect(redirectRoute);
	} else {
		this.next();
	}
};

Router.waitOn(function() { 
	Meteor.subscribe("current_user_data");
});

Router.onBeforeAction(function() {
	// loading indicator here
	if(!this.ready()) {
		this.render('loading');
		$("body").addClass("wait");
	} else {
		$("body").removeClass("wait");
		this.next();
	}
});

Router.onBeforeAction(Router.ensureNotLogged, {only: publicRoutes});
Router.onBeforeAction(Router.ensureLogged, {only: privateRoutes});
Router.onBeforeAction(Router.ensureGranted, {only: freeRoutes}); // yes, route from free zone can be restricted to specific set of user roles

Router.map(function () {
	
	this.route("home_public", {path: "/", controller: "HomePublicController"});
	this.route("login", {path: "/login", controller: "LoginController"});
	this.route("register", {path: "/register", controller: "RegisterController"});
	this.route("forgot_password", {path: "/forgot_password", controller: "ForgotPasswordController"});
	this.route("reset_password", {path: "/reset_password/:resetPasswordToken", controller: "ResetPasswordController"});
	this.route("home_private", {path: "/home_private", controller: "HomePrivateController"});
	this.route("members", {path: "/members", controller: "MembersController"});
	this.route("members.insert", {path: "/members/insert", controller: "MembersInsertController"});
	this.route("members.details", {path: "/members/details/:memberId", controller: "MembersDetailsController"});
	this.route("members.edit", {path: "/members/edit/:memberId", controller: "MembersEditController"});
	this.route("suppliers", {path: "/suppliers", controller: "SuppliersController"});
	this.route("suppliers.insert", {path: "/suppliers/insert", controller: "SuppliersInsertController"});
	this.route("suppliers.details", {path: "/suppliers/details/:supplierId", controller: "SuppliersDetailsController"});
	this.route("suppliers.edit", {path: "/suppliers/edit/:supplierId", controller: "SuppliersEditController"});
	this.route("employees", {path: "/employees", controller: "EmployeesController"});
	this.route("employees.insert", {path: "/employees/insert", controller: "EmployeesInsertController"});
	this.route("employees.details", {path: "/employees/details/:employeeId", controller: "EmployeesDetailsController"});
	this.route("employees.edit", {path: "/employees/edit/:employeeId", controller: "EmployeesEditController"});
	this.route("others", {path: "/others", controller: "OthersController"});
	this.route("others.insert", {path: "/others/insert", controller: "OthersInsertController"});
	this.route("others.details", {path: "/others/details/:otherId", controller: "OthersDetailsController"});
	this.route("others.edit", {path: "/others/edit/:otherId", controller: "OthersEditController"});
	this.route("products", {path: "/products/:account", controller: "ProductsController"});
	this.route("products.insert", {path: "/products/:account/insert", controller: "ProductsInsertController"});
	this.route("products.details", {path: "/products/:account/details/:productId", controller: "ProductsDetailsController"});
	this.route("products.edit", {path: "/products/:account/edit/:productId", controller: "ProductsEditController"});
	this.route("documents", {path: "/documents", controller: "DocumentsController"});
	this.route("documents.insert", {path: "/documents/insert", controller: "DocumentsInsertController"});
	this.route("documents.details", {path: "/documents/details/:documentId", controller: "DocumentsDetailsController"});
	this.route("documents.edit", {path: "/documents/edit/:documentId", controller: "DocumentsEditController"});
	this.route("collections", {path: "/collections", controller: "CollectionsController"});
	this.route("collections.insert", {path: "/collections/insert", controller: "CollectionsInsertController"});
	this.route("collections.details", {path: "/collections/details/:collectionId", controller: "CollectionsDetailsController"});
	this.route("collections.edit", {path: "/collections/edit/:collectionId", controller: "CollectionsEditController"});
	this.route("paidouts", {path: "/paidouts", controller: "PaidoutsController"});
	this.route("paidouts.insert", {path: "/paidouts/insert", controller: "PaidoutsInsertController"});
	this.route("paidouts.details", {path: "/paidouts/details/:paidoutId", controller: "PaidoutsDetailsController"});
	this.route("paidouts.edit", {path: "/paidouts/edit/:paidoutId", controller: "PaidoutsEditController"});
	this.route("expenditures", {path: "/expenditures", controller: "ExpendituresController"});
	this.route("expenditures.insert", {path: "/expenditures/insert", controller: "ExpendituresInsertController"});
	this.route("expenditures.details", {path: "/expenditures/details/:expenditureId", controller: "ExpendituresDetailsController"});
	this.route("expenditures.edit", {path: "/expenditures/edit/:expenditureId", controller: "ExpendituresEditController"});
	this.route("invoices", {path: "/invoices/:account", controller: "InvoicesController"});
	this.route("invoices.insert", {path: "/invoices/:account/insert", controller: "InvoicesInsertController"});
	this.route("invoices.details", {path: "/invoices/:account/details/:invoiceId", controller: "InvoicesDetailsController"});
	this.route("invoices.details.items", {path: "/invoices/:account/details/:invoiceId/items", controller: "InvoicesDetailsItemsController"});
	this.route("invoices.details.insert", {path: "/invoices/:account/details/:invoiceId/insert", controller: "InvoicesDetailsInsertController"});
	this.route("invoices.details.edit", {path: "/invoices/:account/details/:invoiceId/edit/:itemId", controller: "InvoicesDetailsEditController"});
	this.route("invoices.edit", {path: "/invoices/:account/edit/:invoiceId", controller: "InvoicesEditController"});
	this.route("purchaseorders", {path: "/purchaseorders/:account", controller: "PurchaseordersController"});
	this.route("purchaseorders.insert", {path: "/purchaseorders/:account/insert", controller: "PurchaseordersInsertController"});
	this.route("purchaseorders.details", {path: "/purchaseorders/:account/details/:purchaseorderId", controller: "PurchaseordersDetailsController"});
	this.route("purchaseorders.details.items", {path: "/purchaseorders/:account/details/:purchaseorderId/items", controller: "PurchaseordersDetailsItemsController"});
	this.route("purchaseorders.details.insert", {path: "/purchaseorders/:account/details/:purchaseorderId/insert", controller: "PurchaseordersDetailsInsertController"});
	this.route("purchaseorders.details.edit", {path: "/purchaseorders/:account/details/:purchaseorderId/edit/:itemId", controller: "PurchaseordersDetailsEditController"});
	this.route("purchaseorders.edit", {path: "/purchaseorders/:account/edit/:purchaseorderId", controller: "PurchaseordersEditController"});
	this.route("admin", {path: "/admin", controller: "AdminController"});
	this.route("admin.users", {path: "/admin/users", controller: "AdminUsersController"});
	this.route("admin.users.details", {path: "/admin/users/details/:userId", controller: "AdminUsersDetailsController"});
	this.route("admin.users.insert", {path: "/admin/users/insert", controller: "AdminUsersInsertController"});
	this.route("admin.users.edit", {path: "/admin/users/edit/:userId", controller: "AdminUsersEditController"});
	this.route("user_settings", {path: "/user_settings", controller: "UserSettingsController"});
	this.route("user_settings.profile", {path: "/user_settings/profile", controller: "UserSettingsProfileController"});
	this.route("user_settings.change_pass", {path: "/user_settings/change_pass", controller: "UserSettingsChangePassController"});
	this.route("logout", {path: "/logout", controller: "LogoutController"});
});

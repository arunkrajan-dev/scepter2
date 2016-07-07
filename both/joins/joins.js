// Collections
Collections.join(Members, "memberId", "member", ["name"]);

// Paidouts
Paidouts.join(Suppliers, "supplierId", "supplier", ["name"]);

// Invoices
Invoices.join(Members, "memberId", "member", ["name"]);

// Purchaseorders
Purchaseorders.join(Suppliers, "supplierId", "supplier", ["name"]);


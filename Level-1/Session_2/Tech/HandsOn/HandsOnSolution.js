var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// 5) Typed factory
function createUser(id, name, email, role, address) {
    return { id: id, name: name, email: email, role: role, address: address, active: true };
}
// 6) Typed update
function updateUser(user, updates) {
    return __assign(__assign({}, user), updates);
}
// 7) Typed filter
function getUsersByRole(users, role) {
    return users.filter(function (u) { return u.role === role; });
}
// 8) Generic wrapper
function response(success, data) {
    return { success: success, data: data };
}
// 9) Class Manager
var UserManager = /** @class */ (function () {
    function UserManager() {
        this.users = [];
    }
    UserManager.prototype.addUser = function (user) {
        this.users.push(user);
        return response(true, user);
    };
    UserManager.prototype.getActive = function () {
        return response(true, this.users.filter(function (u) { return u.active; }));
    };
    return UserManager;
}());
// Example
var u1 = createUser(1, "Ahmed", "a@a.com", "admin", {
    city: "Cairo",
    street: "Tahrir",
});
var u2 = createUser(2, "Sara", "s@s.com", "member", {
    city: "Giza",
    street: "Faisal",
});
var manager = new UserManager();
manager.addUser(u1);
manager.addUser(u2);
console.log(getUsersByRole([u1, u2], "admin"));
console.log(manager.getActive());

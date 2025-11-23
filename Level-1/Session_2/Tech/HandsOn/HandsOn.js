/*****************************************************
 🔥 HANDS-ON (WRITE YOUR TYPESCRIPT IN THE TODO AREAS)
*****************************************************/

/* ---------------------------------------------------
   TODO (1): Create a Role union type
     (admin member  guest)
----------------------------------------------------*/


/* ---------------------------------------------------
   TODO (2): Create interfaces:
      - Address (city, street)
      - User (id, name, email, role, address, active)
----------------------------------------------------*/


/* ---------------------------------------------------
   TODO (3): Create type UserUpdates using:
      Partial<Omit<User, "id">>
----------------------------------------------------*/


/* ---------------------------------------------------
   TODO (4): Create ApiResponse<T> generic interface
                (success: boolean, data: T)
----------------------------------------------------*/


// ------------------------
// User Creation
// ------------------------
// TODO (5): Add full TypeScript types
function createUser(id, name, email, role, address) {
	return {
		id,
		name,
		email,
		role,
		address,
		active: true,
	};
}


// ------------------------
// Update user
// ------------------------
// TODO (6): Add types using User + UserUpdates
function updateUser(user, updates) {
	return { ...user, ...updates };
}


// ------------------------
// Filter by role
// ------------------------
// TODO (7): Add types
function getUsersByRole(users, role) {
	return users.filter((u) => u.role === role);
}


// ------------------------
// Response wrapper (generic)
// ------------------------
// TODO (8): Convert this to use ApiResponse<T>
function response(success, data) {
	return { success, data };
}


// ------------------------
// Simple Class Manager
// ------------------------
// TODO (9): Add TypeScript types to class + methods
class UserManager {
	constructor() {
		this.users = [];
	}

	addUser(user) {
		this.users.push(user);
		return response(true, user);
	}

	getActive() {
		return response(true, this.users.filter((u) => u.active));
	}
}


// ------------------------
// Example usage
// ------------------------
const u1 = createUser(1, "Ahmed", "a@a.com", "admin", {
	city: "Cairo",
	street: "Tahrir",
});

const u2 = createUser(2, "Sara", "s@s.com", "member", {
	city: "Giza",
	street: "Faisal",
});

const manager = new UserManager();
manager.addUser(u1);
manager.addUser(u2);

console.log(getUsersByRole([u1, u2], "admin"));
console.log(manager.getActive());

// 1) Role union
type Role = "admin" | "member" | "guest";

// 2) Interfaces
interface Address {
	city: string;
	street: string;
}

interface User {
	id: number;
	name: string;
	email: string;
	role: Role;
	address: Address;
	active: boolean;
}

// 3) UserUpdates
type UserUpdates = Partial<Omit<User, "id">>;

// 4) Generic API response
interface ApiResponse<T> {
	success: boolean;
	data: T;
}

// 5) Typed factory
function createUser(
	id: number,
	name: string,
	email: string,
	role: Role,
	address: Address
): User {
	return { id, name, email, role, address, active: true };
}

// 6) Typed update
function updateUser(user: User, updates: UserUpdates): User {
	return { ...user, ...updates };
}

// 7) Typed filter
function getUsersByRole(users: User[], role: Role): User[] {
	return users.filter((u) => u.role === role);
}

// 8) Generic wrapper
function response<T>(success: boolean, data: T): ApiResponse<T> {
	return { success, data };
}

// 9) Class Manager
class UserManager {
	private users: User[] = [];

	addUser(user: User): ApiResponse<User> {
		this.users.push(user);
		return response(true, user);
	}

	getActive(): ApiResponse<User[]> {
		return response(true, this.users.filter((u) => u.active));
	}
}

// Example
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

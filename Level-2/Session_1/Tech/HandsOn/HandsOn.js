function createUser(id, name, email, role) {
	return {
		id: id,
		name: name,
		email: email,
		role: role,
		createdAt: new Date(),
		isActive: true,
	};
}

function updateUser(user, updates) {
	return { ...user, ...updates };
}

function getUsersByRole(users, role) {
	return users.filter((user) => user.role === role);
}

const user1 = createUser(1, "Ahmed", "ahmed@example.com", "admin");
const user2 = createUser(2, "Sara", "sara@example.com", "member");
const users = [user1, user2];
const admins = getUsersByRole(users, "admin");

// YOUR TASK:
// 1. Add proper TypeScript types for User
// 2. Add type annotations to all function parameters and return types
// 3. Create a Role type using union types where it includes (admin, member, guest)
// 4. Make the code type-safe

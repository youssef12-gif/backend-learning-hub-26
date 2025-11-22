type Role = "admin" | "member" | "guest";

interface User {
	id: number;
	name: string;
	email: string;
	role: Role;
	createdAt: Date;
	isActive: boolean;
}

function createUserTS(
	id: number,
	name: string,
	email: string,
	role: Role
): User {
	return {
		id,
		name,
		email,
		role,
		createdAt: new Date(),
		isActive: true,
	};
}

function updateUserTS(user: User, updates: Partial<User>): User {
	return { ...user, ...updates };
}

function getUsersByRoleTS(users: User[], role: Role): User[] {
	return users.filter((user) => user.role === role);
}

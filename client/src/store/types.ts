export interface User {
	created_at: string;
	email: string;
	id: number;
	is_active: boolean;
	name: string;
	updated_at: string;
}

export interface AuthSlice {
	refresh: string | null;
	access: string | null;
	user: User | null;
	isAuthenticated: boolean | null;
	authenticateUser: (refreshToken: string, accessToken: string) => void;
	unauthenticateUser: () => void;
	logoutUser: (callback: () => void) => void;
	getUser: (callback?: () => void) => void;
}

export interface DashboardTabsSlice {
	currIndex: number;
	updateTabIndex: (index: number) => void;
}
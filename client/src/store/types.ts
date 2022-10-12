export interface User {
	created_at: string;
	email: string;
	id: number;
	is_active: boolean;
	name: string;
	updated_at: string;
	is_leetcode_connected: boolean;
	is_verified: boolean;
}

export interface LeetcodeData {
	id: number;
	leetcode_username: string;
	total_questions: number;
	easy_questions: number;
	medium_questions: number;
	hard_questions: number;
	created_at: string;
	updated_at: string;
	user_id: number;
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
	updateUser: (userData: User) => void;
}

export interface DashboardTabsSlice {
	currIndex: number;
	updateTabIndex: (index: number) => void;
}

export interface LeetcodeSlice {
	user: User | null;
	leetcodeData: LeetcodeData | null;
}

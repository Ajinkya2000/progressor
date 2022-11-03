import { StateCreator } from "zustand";
import progressor from "../api/progressor";

import { AuthSlice, User } from "./types";

const createAuthSlice: StateCreator<AuthSlice> = (set, getState) => ({
	refresh: null,
	access: null,
	user: null,
	isAuthenticated: null,
	authenticateUser: (refresh: string, access: string) => {
		set((state) => ({ ...state, refresh, access, isAuthenticated: true }));
	},
	unauthenticateUser: () => {
		set((state) => ({
			...state,
			access: null,
			refresh: null,
			isAuthenticated: false,
			user: null,
		}));
	},
	logoutUser: (callback) => {
		set((state) => ({
			...state,
			access: null,
			refresh: null,
			isAuthenticated: null,
			user: null,
		}));

		localStorage.removeItem("@tokens");
		localStorage.removeItem("@verificationMailSent")
		callback();
	},
	getUser: async (callback) => {
		let { access } = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${access}`,
			},
		};

		try {
			const { data: userData } = await progressor.get("user/", config);
			set((state) => ({ ...state, user: userData }));
		} catch (err: any) {
			if (callback) {
				callback();
			}
		}
	},
	updateUser: (userData: User) => {
		set((state) => ({ ...state, user: userData }));
	},
});

export default createAuthSlice;

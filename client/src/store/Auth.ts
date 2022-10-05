import { StateCreator } from "zustand";

// import progressor from "../api/progressor";
import { AuthSlice } from "./types";

const createAuthSlice: StateCreator<AuthSlice> = (set, getState) => ({
  refresh: null,
  access: null,
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
  user: null,
});

export default createAuthSlice;

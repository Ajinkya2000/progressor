import create from "zustand";

import createAuthSlice from "./auth";
import createDashboardTabsSlice from "./dashboardTabs";
import { AuthSlice, DashboardTabsSlice } from "./types";

const useStore = create<AuthSlice & DashboardTabsSlice>()((...args) => ({
	...createAuthSlice(...args),
	...createDashboardTabsSlice(...args),
}));

export default useStore;

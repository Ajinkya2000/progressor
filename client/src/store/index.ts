import create from "zustand";

import createAuthSlice from "./Auth";
import createDashboardTabsSlice from "./DashboardTabs";
import { AuthSlice, DashboardTabsSlice } from "./types";

const useStore = create<AuthSlice & DashboardTabsSlice>()((...args) => ({
	...createAuthSlice(...args),
	...createDashboardTabsSlice(...args),
}));

export default useStore;

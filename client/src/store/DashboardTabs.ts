import { StateCreator } from "zustand";

import { DashboardTabsSlice } from "./types";

const createDashboardTabsSlice: StateCreator<DashboardTabsSlice> = (set, getState) => ({
  currIndex: 0,
  updateTabIndex: (index: number) => {
		set((state) => ({ ...state, currIndex: index }));
	},
});

export default createDashboardTabsSlice;

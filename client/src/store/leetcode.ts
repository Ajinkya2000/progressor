import { StateCreator } from "zustand";

import { LeetcodeSlice } from "./types";

const createLeetcodeSlice: StateCreator<LeetcodeSlice> = (set, getState) => ({
  user: null,
  leetcodeData: null,
});

export default createLeetcodeSlice;

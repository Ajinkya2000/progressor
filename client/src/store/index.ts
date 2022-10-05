import create from "zustand";

import createAuthSlice from "./Auth";
import { AuthSlice } from "./types";

const useStore = create<AuthSlice>()((...args) => ({
	...createAuthSlice(...args),
}));

export default useStore;

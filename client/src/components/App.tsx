import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import useStore from "../store";

import Auth from "./Auth";
import Dashboard from "./Dashboard";
import { Toast } from "./utils";

const App = () => {
	const authenticateUser = useStore((state) => state.authenticateUser);
	const unauthenticateUser = useStore((state) => state.unauthenticateUser);

	useEffect(() => {
		const tokens = localStorage.getItem("@tokens");

		if (tokens !== null) {
			const parsedTokens = JSON.parse(tokens);
			authenticateUser(parsedTokens.refresh, parsedTokens.access);
		} else {
			unauthenticateUser();
		}
	}, [authenticateUser, unauthenticateUser]);

	return (
		<div className="w-full max-w-7xl h-screen max-h-reduced flex">
			<h1 className="absolute w-0 h-0 opacity-0 z-0">Progressor</h1>
			<div className="flex-1">
				<Routes>
					<Route path="/" element={<Auth />} />
					<Route path="/dashboard" element={<Dashboard />} />
				</Routes>
			</div>
			<Toast />
		</div>
	);
};

export default App;

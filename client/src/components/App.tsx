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
		<div className="max-w-7xl h-screen max-h-reduced">
			<Routes>
				<Route path="/" element={<Auth />} />
				<Route path="/dashboard" element={<Dashboard />} />
			</Routes>
			<Toast />
		</div>
	);
};

export default App;

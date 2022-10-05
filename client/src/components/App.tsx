import { Routes, Route } from "react-router-dom";

import Auth from "./Auth";
import Dashboard from "./Dashboard";
import { Toast } from "./utils/components";

const App = () => {
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

import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ProSidebarProvider } from "react-pro-sidebar";

import useStore from "../../store";
import DashboardContent from "./DashboardContent";
import Sidebar from "./Sidebar";

const Dashboard = () => {
	const isAuthenticated = useStore((state) => state.isAuthenticated);
	const getUser = useStore((state) => state.getUser);

	useEffect(() => {
		if (!isAuthenticated) return;

		getUser(() => {
			toast.error("Unable to load user data!! Please try again later.");
		});
	}, [isAuthenticated, getUser]);

	if (isAuthenticated === null) {
		return <div>Loading...</div>;
	}

	if (isAuthenticated === false) {
		toast.error("Please login to continue!!");
		return <Navigate to="/" replace={true} />;
	}

	return (
		<>
			{/* @ts-ignore library is incompatible with react18*/}
			<ProSidebarProvider>
				<div className="flex h-full font-montserrat">
					<Sidebar />
					<DashboardContent />
				</div>
			</ProSidebarProvider>
		</>
	);
};

export default Dashboard;

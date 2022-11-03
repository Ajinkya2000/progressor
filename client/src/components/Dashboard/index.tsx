import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ProSidebarProvider } from "react-pro-sidebar";

import useStore from "../../store";
import DashboardContent from "./DashboardContent";
import Sidebar from "./Sidebar";
import DashboardVerifyEmail from "./DashboardVerifyEmail";
import progressor from "../../api/progressor";

const Dashboard = () => {
	const isAuthenticated = useStore((state) => state.isAuthenticated);
	const user = useStore((state) => state.user);
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
			{user?.is_verified && (
				<>
					{/* @ts-ignore - library is incompatible with react18*/}
					<ProSidebarProvider>
						<div className="flex h-full font-montserrat">
							<Sidebar />
							<DashboardContent />
						</div>
					</ProSidebarProvider>
				</>
			)}
			{user?.is_verified === false && <DashboardVerifyEmail />}
			{!user && <div>Loading</div>}
		</>
	);
};

export default Dashboard;

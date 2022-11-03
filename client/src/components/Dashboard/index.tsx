import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ProSidebarProvider } from "react-pro-sidebar";
import Lottie from "lottie-react";

import useStore from "../../store";
import DashboardContent from "./DashboardContent";
import Sidebar from "./Sidebar";
import DashboardVerifyEmail from "./DashboardVerifyEmail";

import loading4 from "../../assets/loading-4-lottie.json";

const Dashboard = () => {
	const isAuthenticated = useStore((state) => state.isAuthenticated);
	const user = useStore((state) => state.user);
	const getUser = useStore((state) => state.getUser);
	const logoutUser = useStore((state) => state.logoutUser);

	const navigate = useNavigate();

	useEffect(() => {
		if (!isAuthenticated) return;
		getUser(() => {
			toast.error("Please login to continue!");
			logoutUser(() => navigate("/"));
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
			{!user && (
				<div className="flex justify-center items-center h-full">
					<Lottie className="w-36" animationData={loading4} loop={true} />
				</div>
			)}
		</>
	);
};

export default Dashboard;

import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import useStore from "../../store";

const Dashboard = () => {
	const isAuthenticated = useStore((state) => state.isAuthenticated);

	if (isAuthenticated === null) {
		return <div>Loading...</div>;
	}

	if (isAuthenticated === false) {
		toast.error("Please login to continue!!");
		return <Navigate to="/" replace={true} />
	}

	return <div>Dashboard</div>;
};

export default Dashboard;

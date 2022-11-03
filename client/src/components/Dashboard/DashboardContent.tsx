import DashboardHome from "./DashboardHome";
import DashboardWeeklyStats from "./DashboardWeeklyStats";
import DashboardOtherStats from "./DashboardOtherStats";

import useStore from "../../store";


const DashboardContent = () => {
	const currIndex = useStore((state) => state.currIndex);

	return (
		<div className="flex-4 bg-slate-100">
			{currIndex === 0 && <DashboardHome />}
			{currIndex === 1 && <DashboardWeeklyStats />}
			{currIndex === 2 && <DashboardOtherStats />}
		</div>
	);
};

export default DashboardContent;

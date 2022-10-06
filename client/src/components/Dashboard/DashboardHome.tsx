import dashboardZeroState from "../../images/dashboard-zero-state.svg";

const DashboardHome = () => {
	return (
		<div className="w-full h-full flex flex-col justify-center items-center">
			<div className="w-96">
				<img className="w-full" src={dashboardZeroState} alt="zero-state" />
			</div>
			<div>
				<h3 className="my-4 text-center font-medium text-2xl">
					Ready, set, <br />
					Let's get started!
				</h3>
				<p className="text-center text-sm text-slate-400">
					Start by adding your leetcode username, <br />
					so that we can scrape data from your profile. <br />
					Make sure your profile is public
				</p>
			</div>
			<div className="flex space-x-2 justify-center">
				<button
					type="button"
					className="mt-4 px-6 py-2.5 bg-secondary text-white font-medium text-xs rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
				>
					Add Leetcode Username
				</button>
			</div>
		</div>
	);
};

export default DashboardHome;

import React, { useState } from "react";
import Modal from "react-modal";
import Lottie from "lottie-react";

import dashboardZeroState from "../../images/dashboard-zero-state.svg";
import { ReactComponent as WarningIcon } from "../../images/warningIcon.svg";
import loadingAnimation2 from "../../assets/loading-2-lottie.json";

Modal.setAppElement("#root");

const DashboardHome = () => {
	const [modalOpen, setModalOpen] = useState(false);
	const [leetcodeUsername, setLeetcodeUsername] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		setLoading(true);
	};

	return (
		<>
			{loading === false ? (
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
							Make sure your profile is public.
						</p>
					</div>
					<div className="flex space-x-2 justify-center">
						<button
							type="button"
							className="mt-4 px-6 py-2.5 bg-secondary text-white font-medium text-xs rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
							onClick={() => setModalOpen(true)}
						>
							Add Username
						</button>
					</div>
					<Modal
						isOpen={modalOpen}
						className="flex justify-center items-center z-10 w-72 dashboard-modal"
						contentLabel="Choose Coding Platform Modal"
						style={{
							overlay: { zIndex: 15, background: "rgba(0, 0, 0, 0.25)" },
						}}
						shouldCloseOnOverlayClick
						onRequestClose={() => setModalOpen(false)}
					>
						<form
							className="bg-white shadow-2xl p-6 rounded-lg flex flex-col justify-center items-center"
							onSubmit={handleSubmit}
						>
							<h3 className="text-amber-500 text-xs flex items-center mb-3">
								<WarningIcon width="20" height="20" className="mr-1" />
								Make sure your account is public.
							</h3>
							<div className="flex justify-center">
								<div className="mb-3 xl:w-96">
									<input
										type="text"
										className="w-full block px-3 py-1.5 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
										placeholder="Enter Leetcode Username"
										required
										value={leetcodeUsername}
										onChange={(e) => setLeetcodeUsername(e.target.value)}
									/>
								</div>
							</div>
							<button
								type="submit"
								className="mt-4 px-6 py-2.5 bg-secondary text-white font-medium text-sm rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
								disabled={loading}
							>
								Submit
							</button>
						</form>
					</Modal>
				</div>
			) : (
				<div className="w-full h-full flex flex-col justify-center items-center">
					<Lottie animationData={loadingAnimation2} className="absolute w-64" />
					<h3 className="my-4 text-center font-medium text-xl opacity-0 pointer-events-none visibility-none">Dummy text for spacing</h3>
					<h3 className="my-4 text-center text-lg">Getting your stats. This may take a while.</h3>
				</div>
			)}
		</>
	);
};

export default DashboardHome;

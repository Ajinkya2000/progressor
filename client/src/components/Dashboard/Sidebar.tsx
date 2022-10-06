import {
	Sidebar as ProSidebar,
	Menu,
	MenuItem,
	SubMenu,
} from "react-pro-sidebar";
import { useNavigate } from "react-router-dom";
import useStore from "../../store";

import brand from "../../images/brand.svg";
import avatar from "../../images/avatar.png";
import { ReactComponent as DashboardIcon } from "../../images/dashboardIcon.svg";
import { ReactComponent as WeeklyStats } from "../../images/weeklyStats.svg";
import { ReactComponent as OtherStats } from "../../images/otherStats.svg";
import { ReactComponent as SettingsIcon } from "../../images/settingsIcon.svg";
import { ReactComponent as LogoutIcon } from "../../images/logoutIcon.svg";
import { ReactComponent as RedHeartIcon } from "../../images/redHeartIcon.svg";
import { ReactComponent as GithubIcon } from "../../images/githubIcon.svg";

const Sidebar = () => {
	const user = useStore((state) => state.user);
	const logoutUser = useStore((state) => state.logoutUser);
	const currIndex = useStore((state) => state.currIndex);
	const updateTabIndex = useStore((state) => state.updateTabIndex);

	const navigate = useNavigate();

	const handleSignOut = () => {
		logoutUser(() => {
			navigate("/", { replace: true });
		});
	};

	return (
		<div className="flex-1 bg-white">
			<ProSidebar className="h-full px-2" backgroundColor="white" width="100%">
				<Menu className="h-full">
					<div>
						<div className="flex justify-center">
							<img src={brand} alt="brand" className="w-44" />
						</div>
						<div className="my-6 w-full flex flex-col items-center">
							<div
								className="w-28 h-28 flex justify-center items-center rounded-full"
								style={{ boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.25)" }}
							>
								<img src={avatar} alt="avatar" className="w-24 h-24" />
							</div>
							<p className="font-medium mt-4">{user?.name}</p>
							<p className="text-sm text-slate-400 italic">{user?.email}</p>
						</div>
					</div>
					<div className="flex-1 text-sm mt-6">
						<MenuItem
							className={`sidebar-menu-item ${currIndex === 0 ? "active" : ""}`}
							icon={
								<DashboardIcon
									className={`sidebar-icon ${currIndex === 0 ? "active" : ""}`}
									width="15px"
								/>
							}
							onClick={() => updateTabIndex(0)}
						>
							Dashboard
						</MenuItem>
						<MenuItem
							className={`sidebar-menu-item ${currIndex === 1 ? "active" : ""}`}
							icon={
								<WeeklyStats
									className={`sidebar-icon ${currIndex === 1 ? "active" : ""}`}
									width="20px"
								/>
							}
							onClick={() => updateTabIndex(1)}
						>
							Weekly Stats
						</MenuItem>
						<MenuItem
							className={`sidebar-menu-item ${currIndex === 2 ? "active" : ""}`}
							icon={
								<OtherStats
									className={`sidebar-icon ${currIndex === 2 ? "active" : ""}`}
									width="20px"
								/>
							}
							onClick={() => updateTabIndex(2)}
						>
							Other Stats
						</MenuItem>
						<SubMenu
							label="Settings"
							className="sidebar-submenu"
							icon={<SettingsIcon className="sidebar-icon" width="20px" />}
						>
							<MenuItem icon={<LogoutIcon />} onClick={handleSignOut}>
								Sign Out
							</MenuItem>
						</SubMenu>
					</div>
					<div className="mb-2">
						<p className="flex justify-center items-center gap-1 text-xs">
							Made with <RedHeartIcon width="20px" /> by Ajinkya
						</p>
						<a
							href="https://github.com/Ajinkya2000"
							target="_blank"
							rel="noopener noreferrer"
							className="flex justify-center items-center gap-1 font-medium text-xs"
						>
							<GithubIcon width="15px" /> Ajinkya2000
						</a>
					</div>
				</Menu>
			</ProSidebar>
		</div>
	);
};

export default Sidebar;

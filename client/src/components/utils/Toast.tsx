import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const Toast: React.FC = () => {
	return (
		<ToastContainer
			position="top-right"
			autoClose={3000}
			limit={3}
			newestOnTop={false}
			pauseOnFocusLoss
			draggable
			pauseOnHover={false}
		/>
	);
};

export default Toast;

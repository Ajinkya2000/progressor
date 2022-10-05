import { useState } from "react";
import { Navigate } from "react-router-dom";
import useStore from "../../store";

import Signin from "./Signin";
import Signup from "./Signup";

import logo from "../../images/logo.png";
import brand from "../../images/brand.svg";

const Auth = () => {
	const isAuthenticated = useStore((state) => state.isAuthenticated);

	const [showSigninScreen, setShowSigninScreen] = useState<boolean>(true);

	const handleFormSwitch = () => {
		setShowSigninScreen(!showSigninScreen);
	};

	if (isAuthenticated) {
		return <Navigate to="/dashboard" replace={true} />;
	}

	return (
		<div className="flex h-full max-h-fit relative">
			<div className="absolute left-6 top-3">
				<img className="w-48" src={brand} alt="brand" />
			</div>
			<div className="flex-1 bg-white flex flex-col justify-center items-center">
				{showSigninScreen ? <Signin /> : <Signup />}
				<p className="text-sm">
					{showSigninScreen
						? "Don't have an account? "
						: "Already have an account? "}
					<button className="text-primary" onClick={handleFormSwitch}>
						{showSigninScreen ? "Sign up" : "Sign in"}
					</button>
				</p>
			</div>
			<div className="flex-1 bg-grey flex justify-center items-center">
				<img className="w-96" src={logo} alt="Logo" />
			</div>
			<p className="absolute text-sm text-slate-400 left-6 bottom-3">
				&copy; Progressor {new Date().getFullYear()}
			</p>
		</div>
	);
};

export default Auth;

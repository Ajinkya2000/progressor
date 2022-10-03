import Signin from "./Signin";

import logo from "../../images/logo.png";

const Auth = () => {
	return (
		<div className="flex h-full max-h-fit">
			<div className="flex-1 bg-white">
				<Signin />
			</div>
			<div className="flex-1 bg-grey flex justify-center items-center">
				<img className="w-80" src={logo} alt="Logo" />
			</div>
		</div>
	);
};

export default Auth;

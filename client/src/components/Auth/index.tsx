import { useState } from "react";
import { Navigate } from "react-router-dom";
import useStore from "../../store";
import progressor from "../../api/progressor";

import { useGoogleLogin } from "@react-oauth/google";
import Signin from "./Signin";
import Signup from "./Signup";

import logo from "../../images/logo.png";
import brand from "../../images/brand.svg";
import { ReactComponent as GoogleButton } from "../../images/btn-google-small.svg";

const DJANGO_OAUTH_CLIENT_ID = process.env.REACT_APP_DJANGO_OAUTH_CLIENT_ID;
const DJANGO_OAUTH_CLIENT_SECRET =
	process.env.REACT_APP_DJANGO_OAUTH_CLIENT_SECRET;

const Auth = () => {
	const isAuthenticated = useStore((state) => state.isAuthenticated);

	const [showSigninScreen, setShowSigninScreen] = useState<boolean>(true);

	const login = useGoogleLogin({
		onSuccess: (response) => {
			progressor
				.post(`auth/convert-token/`, {
					token: response.access_token,
					backend: "google-oauth2",
					grant_type: "convert_token",
					client_id: DJANGO_OAUTH_CLIENT_ID,
					client_secret: DJANGO_OAUTH_CLIENT_SECRET,
				})
				.then((res) => {
					const { access_token, refresh_token } = res.data;
					const tokens = JSON.stringify({
						access: access_token,
						refresh: refresh_token,
					});
					localStorage.setItem("@tokens", tokens);
				})
				.catch((err) => {
					console.log("Error Google login", err);
				});
		},
	});

	const handleFormSwitch = () => {
		setShowSigninScreen(!showSigninScreen);
	};

	if (isAuthenticated) {
		return <Navigate to="/dashboard" replace={true} />;
	}

	const renderGoogleAuthButton = () => {
		return (
			<button
				onClick={() => login()}
				className="flex justify-center items-center w-72 text-sm mt-3 mb-6"
			>
				<GoogleButton width="40" height="40" />
				<p>Continue with Google</p>
			</button>
		);
	};

	return (
		<div className="flex h-full max-h-fit relative">
			<div className="absolute left-6 top-3">
				<img className="w-48" src={brand} alt="brand" />
			</div>
			<div className="flex-1 bg-white flex flex-col justify-center items-center">
				{showSigninScreen ? (
					<Signin>
						<h2 className="text-3xl">Welcome back!</h2>
						<p className="text-slate-400 mb-6">Hello, who's this?</p>
					</Signin>
				) : (
					<Signup>
						<h2 className="text-3xl">Create an account</h2>
						<p className="text-slate-400 mb-6">Let's get started</p>
					</Signup>
				)}
				{renderGoogleAuthButton()}
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

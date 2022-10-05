import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { Input, Spinner } from "../utils/components";

import progressor from "../../api/progressor";
import { parseError } from "../utils/functions/parseError";

const Signin = () => {
	const [authDetails, setAuthDetails] = useState({
		email: "",
		password: "",
	});
	const [showSpinner, setShowSpinner] = useState(false);

	const navigate = useNavigate();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setAuthDetails({ ...authDetails, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		setShowSpinner(true);

		try {
			const { data } = await progressor.post("user/signin/", authDetails);
			const accessToken = data.access;
			localStorage.setItem("user", accessToken);

			toast.success("Sign in successful!!", { theme: "colored" });
			navigate("/dashboard", { replace: true });
		} catch (err: any) {
			const errorMessage = parseError(err.response.data);
			toast.error(errorMessage);
		} finally {
			setShowSpinner(false);
		}
	};

	return (
		<form className="flex flex-col" onSubmit={handleSubmit}>
			<h2 className="text-3xl my-3">Welcome back!</h2>
			<p className="text-slate-400 mb-6">Hello, who's this?</p>
			<Input
				type="email"
				label="Email"
				name="email"
				placeholder="Enter your email"
				value={authDetails.email}
				onChange={handleChange}
				required={true}
			/>
			<Input
				type="password"
				label="Password"
				name="password"
				placeholder="Enter your password"
				value={authDetails.password}
				onChange={handleChange}
				required={true}
			/>
			<button
				type="button"
				className="mt-3 self-end text-xs text-primary font-bold"
			>
				Forgot password?
			</button>
			<button
				type="submit"
				className="flex justify-center items-center my-6 w-full inline-block px-6 py-2.5 bg-primary text-white text-sm rounded shadow-md"
			>
				Sign In
				{!!showSpinner && <Spinner size="sm" />}
			</button>
		</form>
	);
};

export default Signin;

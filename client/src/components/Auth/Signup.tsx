import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { Input, Spinner } from "../utils/components";

import progressor from "../../api/progressor";
import { parseError } from "../utils/functions/parseError";

const Signup = () => {
	const [authDetails, setAuthDetails] = useState({
		name: "",
		email: "",
		password: "",
	});
	const [showSpinner, setShowSpinner] = useState(true);

	const navigate = useNavigate();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setAuthDetails({ ...authDetails, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		setShowSpinner(true);

		try {
			const { data } = await progressor.post("user/signup/", authDetails);
			const accessToken = data.tokens.access;
			localStorage.setItem("user", accessToken);

			toast.success("Sign up successful!!", { theme: "colored" });
			navigate('/dashboard', {replace: true});
		} catch (err: any) {
			const errorMessage = parseError(err.response.data.errors);
			toast.error(errorMessage);
		} finally {
			setShowSpinner(false);
		}
	};

	return (
		<form className="flex flex-col" onSubmit={handleSubmit}>
			<h2 className="text-3xl my-3">Create an account</h2>
			<p className="text-slate-400 mb-6">Let's get started</p>
			<Input
				type="text"
				label="Name"
				name="name"
				placeholder="Enter your full name"
				value={authDetails.name}
				onChange={handleChange}
				required={true}
			/>
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
				type="submit"
				className="flex justify-center items-center my-6 w-full inline-block px-6 py-2.5 bg-primary text-white text-sm rounded shadow-md"
			>
				Sign Up
				{!!showSpinner && <Spinner size="sm" />}
			</button>
		</form>
	);
};

export default Signup;

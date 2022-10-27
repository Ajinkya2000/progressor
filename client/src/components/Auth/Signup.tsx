import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { Input, Spinner } from "../utils";

import progressor from "../../api/progressor";
import { parseError } from "../../commonUtils";
import useStore from "../../store";

interface SignupProps {
	children: React.ReactNode;
}

const Signup: React.FC<SignupProps> = ({ children }) => {
	const authenticateUser = useStore((state) => state.authenticateUser);
	const [authDetails, setAuthDetails] = useState({
		name: "",
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
			const { data } = await progressor.post("user/signup/", authDetails);
			console.log(data);
			localStorage.setItem("@tokens", JSON.stringify(data.tokens));

			toast.success("Sign up successful!!", { theme: "colored" });
			authenticateUser(data.tokens.refresh, data.tokens.access);
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
			{children}
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
				className="flex justify-center items-center my-2 w-full inline-block px-6 py-2.5 bg-primary text-white text-sm rounded shadow-md"
			>
				Sign Up
				{!!showSpinner && <Spinner size={6} />}
			</button>
		</form>
	);
};

export default Signup;

import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Input, Spinner } from "../utils";

import progressor from "../../api/progressor";
import { parseError } from "../../commonUtils";
import useStore from "../../store";

interface SigninProps {
	children: React.ReactNode;
}

const Signin: React.FC<SigninProps> = ({ children }) => {
	const authenticateUser = useStore((state) => state.authenticateUser);
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
			localStorage.setItem("@tokens", JSON.stringify(data));

			toast.success("Sign in successful!!", { theme: "colored" });
			authenticateUser(data.refresh, data.access);
			setShowSpinner(false);
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
			<button type="button" className="self-end text-xs text-primary font-bold">
				Forgot password?
			</button>
			<button
				type="submit"
				className="flex justify-center my-2 items-center inline-block px-6 py-2.5 bg-primary text-white text-sm rounded shadow-md"
			>
				Sign In
				{!!showSpinner && <Spinner size="6" />}
			</button>
		</form>
	);
};

export default Signin;

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useStore from "../../store";
import progressor from "../../api/progressor";

import mailSentImg from "../../images/mailSent.svg";
import { parseError } from "../../commonUtils";

const CLIENT_URL = process.env.REACT_APP_CLIENT_URL;

const DashboardVerifyEmail: React.FC = () => {
	const user = useStore((state) => state.user);
	const accessToken = useStore((state) => state.access);

	const [mailSent, setMailSent] = useState<boolean | null>(null);

	const sendVerificationMail = async () => {
		const config = {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		};

		try {
			await progressor.post(
				"user/verify/email/",
				{ client_url: CLIENT_URL },
				config
			);

			setMailSent(true);
			localStorage.setItem("@verificationMailSent", "true");
		} catch (err: any) {
			setMailSent(false);
			const errorMessage = parseError(err.response.data);
			toast.error(errorMessage);
		}
	};

	useEffect(() => {
		const verificationMailSent = localStorage.getItem("@verificationMailSent");
		if (verificationMailSent !== null) {
			setMailSent(true);
			return;
		}

		sendVerificationMail();
	}, []);

	return (
		<div className="w-100 h-full flex justify-center items-center text-slate-600">
			{mailSent === null && <div>Sending Email</div>}
			{/* TODO: Add redirect to login page */}
			{mailSent === false && <div className="text-center">Something went wrong! Cannot send email right now.<br />Redirecting to login.</div>}
			{mailSent === true && (
				<div className="bg-white w-1/2 flex flex-col justify-center items-center text-center p-6">
					<div className="w-32">
						<img src={mailSentImg} alt="Mail Sent" />
					</div>
					<h2 className="text-2xl my-6">Please verify your email</h2>
					<div className="mb-6">
						You're almost there! We sent an email to <br />
						<span className="font-semibold">{user?.email}</span>
					</div>
					<div>
						Just click the link in that email to complete your signup. <br />
						If you don't see it, you may need to{" "}
						<span className="font-semibold">check the spam</span> folder.
					</div>
					<div className="mt-6">
						<p className="mb-2">Still can't find the email?</p>
						<button
							type="button"
							className="px-6 py-2.5 bg-secondary text-white font-medium text-xs rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
							onClick={() => sendVerificationMail()}
						>
							Resend Email
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default DashboardVerifyEmail;

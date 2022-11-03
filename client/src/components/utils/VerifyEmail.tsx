import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Lottie from "lottie-react";

import verifiedCheck from "../../assets/verified-check-lottie.json";
import loading4 from "../../assets/loading-4-lottie.json";

import useStore from "../../store";
import progressor from "../../api/progressor";
import { parseError } from "../../commonUtils";

const VerifyEmail: React.FC = () => {
	const { token: email_token } = useParams();
	const navigate = useNavigate();

	const [verified, setVerified] = useState<boolean>(false);

	const updateUser = useStore((state) => state.updateUser);

	const verifyEmailToken = useCallback(async () => {
		try {
			const response = await progressor.patch("user/verify/", { email_token });
			updateUser(response.data);
			setVerified(true);
		} catch (err: any) {
			const errorMessage = parseError(err.response.data);
			toast.error(errorMessage);
		}
	}, [email_token, updateUser]);

	useEffect(() => {
		verifyEmailToken();
	}, [verifyEmailToken]);

	return (
		<div className="flex flex-col justify-center items-center h-full bg-white">
			{!verified && (
				<div className="w-68">
					<Lottie animationData={loading4} loop={true} />
				</div>
			)}
			{!!verified && (
				<>
					<div className="w-40">
						<Lottie
							animationData={verifiedCheck}
							loop={false}
							onComplete={() => navigate("/dashboard", { replace: true })}
						/>
					</div>
					<p>Email Verified. Redirecting</p>
				</>
			)}
		</div>
	);
};

export default VerifyEmail;

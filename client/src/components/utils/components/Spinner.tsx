interface SpinnerProps {
	size: "sm" | "lg";
}

const Spinner: React.FC<SpinnerProps> = ({ size }) => {
	const getSize = () => {
		const currSize = size === "sm" ? "6" : "8";
		return `w-${currSize} h-${currSize}`;
	};

	return (
		<div className="flex justify-center items-center mx-2">
			<div
				className={`spinner-border animate-spin inline-block border-4 rounded-full ${getSize()}`}
				role="status"
			>
			</div>
		</div>
	);
};

export default Spinner;

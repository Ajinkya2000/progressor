interface SpinnerProps {
	size: number;
}

const Spinner: React.FC<SpinnerProps> = ({ size = 6 }) => {
	return (
		<div className="flex justify-center items-center mx-2">
			<div
				className={`spinner-border animate-spin inline-block border-4 rounded-full w-${size} h-${size}`}
				role="status"
			></div>
		</div>
	);
};

export default Spinner;

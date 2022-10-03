import { useId } from "react";

interface InputProps {
	type: string;
	label: string;
	placeholder: string;
}

const Input: React.FC<InputProps> = ({
	type = "text",
	label = "Enter Value",
	placeholder = "",
}) => {
	const id = useId();

	return (
		<div className="flex">
			<div className="mb-3 xl:w-96">
				<label
					htmlFor={id}
					className="form-label inline-block mb-2 text-gray-700 text-sm"
				>
					{label}
				</label>
				<input
					type={type}
					className="
            w-full
            px-3
            py-1.5
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
						text-sm
          "
					id={id}
					placeholder={placeholder}
				/>
			</div>
		</div>
	);
};

export default Input;

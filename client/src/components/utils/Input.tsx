import React, { ChangeEvent, useId } from "react";

interface InputProps {
	type: string;
	label: string;
	name: string;
	placeholder: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	required?: boolean;
}

const Input: React.FC<InputProps> = ({
	type = "text",
	label = "Enter Value",
	name = "",
	placeholder = "",
	value,
	onChange,
	required
}) => {
	const id = useId();

	return (
		<div className="flex">
			<div className="flex-1 mb-3">
				<label
					htmlFor={id}
					className="form-label inline-block mb-2 text-gray-700 text-sm"
				>
					{label}
				</label>
				<input
					type={type}
					name={name}
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
					value={value}
					onChange={onChange}
					required={required}
				/>
			</div>
		</div>
	);
};

export default Input;

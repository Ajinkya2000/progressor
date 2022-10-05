interface ErrorType {
	[key: string]: string;
}

export const parseError = (errorData: ErrorType) => {
	let errors: any;

	if ("errors" in errorData) {
		errors = errorData["errors"];
	} else if ("detail" in errorData) {
		errors = {
			message: [errorData["detail"]],
		};
	} else {
		errors = {
			message: ["Something went wrong!!"],
		};
	}

	const errorKey = Object.keys(errors)[0]; // Get the first error key
	return errors[errorKey][0]; // Get the first error message
};

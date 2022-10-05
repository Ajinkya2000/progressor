interface ErrorType {
  [key: string]: string;
}

export const parseError = (errors: ErrorType) => {
  const errorKey = Object.keys(errors)[0];   // Get the first error key
  return errors[errorKey][0]; // Get the first error message
}
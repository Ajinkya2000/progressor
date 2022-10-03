/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				grey: "#f3f5f9",
				primary: "#5a18fb",
			},
			maxWidth: {
				"7xl": "100rem",
			},
			maxHeight: {
				reduced: "60rem",
			},
		},
	},
	plugins: [],
};

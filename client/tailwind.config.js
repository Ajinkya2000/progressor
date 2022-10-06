/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				grey: "#f3f5f9",
				primary: "#5a18fb",
				secondary: "#6c63ff",
			},
			maxWidth: {
				"7xl": "100rem",
			},
			maxHeight: {
				reduced: "60rem",
			},
			flex: {
				2: "2 2 0%",
				3: "3 3 0%",
				4: "4 4 0%",
			},
			fontFamily: {
				montserrat: ["Montserrat"],
			},
		},
	},
	plugins: [],
};

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./views/**/*.{js,ts,jsx,tsx,mdx}",
    "./layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      /* Añade a la clase container un centrado y un padding de 2 rem */
      container: {
        center: true,
        padding: "2rem",
      },
      /* Paleta de colores */
      colors: {
        primary: "#6366F1",
        secondary: "#81c784",
        tertiary: "#90caf9",

        "dark-primary": "#1E1B4B",
        "dark-secondary": "#348137",
        "dark-tertiary": "#2196f3",

        info: "#4caf50",
        accent: "#f472b6"
      },
      padding: {
        sm: "2rem",
        md: "3rem",
        lg: "5rem"
      },
      borderWidth: {
        sm: "2px",
        md: "4px",
        lg: "10px"
      },
      boxShadow: {
        '1': "2px 2px 4px 2px rgba(0,0,0,0.3)",
      },
      fontFamily: {
        lato: ["Lato", "sans-serif"],
        "rubik": ["Rubik", "sans-serif"],
      },
      fontSize: {
        body: ["14px", { lineHeight: "1.5", letterSpacing: "0.05em" }],
        headline: ["30px", { lineHeight: "1.5", letterSpacing: "-0.02em" }],
        "headline-lg": [
          "36px",
          { lineHeight: "1.5", letterSpacing: "-0.02em" },
        ],
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms")
  ],
};
export default config;

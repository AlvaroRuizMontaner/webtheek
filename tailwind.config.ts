import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
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
        /*         primary: "#5E2BFF",
        secondary: "#6933FF",
        tertiary: "#4D4F5C",
        accent: "#1E55FF",
        info: "#3273DC", */

        primary: "#362ebb",
        secondary: "#4caf50",
        tertiary: "#2196f3",
        accent: "#6081fa ",
        info: "#81c784",
        highlight: "#90caf9",
      },
    },
  },
  plugins: [],
};
export default config;

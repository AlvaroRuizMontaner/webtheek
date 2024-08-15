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
        accent: "#f472b6",


        "primary-100": "#a7c0fb", // hsla(222, 91%, 82%, 1)
        "primary-200": "#8a9fff", // hsla(229, 100%, 77%, 1)
        "primary-300": "#687cfd", // hsla(232, 97%, 70%, 1)
    
        "primary-400": "#565ee6", // hsla(237, 74%, 62%, 1)
        "primary-500": "#3939c6", // hsla(240, 55%, 50%, 1)
        "primary-600": "#2929ae", // hsla(240, 62%, 42%, 1)
    
        "primary-700": "#202097", // hsla(240, 65%, 36%, 1)
        "primary-800": "#141480", // hsla(240, 73%, 29%, 1)
        "primary-900": "#050566", // hsla(240, 90%, 21%, 1)


        "gray-100": "#c0cae3", // hsla(222, 38%, 82%, 1)
        "gray-200": "#b3b9d6", // hsla(229, 30%, 77%, 1)
        "gray-300": "#a3a7c2", // hsla(232, 20%, 70%, 1)
    
        "gray-400": "#9495a8", // hsla(237, 10%, 62%, 1)
        "gray-500": "#808080", // hsla(240, 0%, 50%, 1)
        "gray-600": "#535365", // hsla(240, 10%, 36%, 1)
    
        "gray-700": "#34344b", // hsla(240, 18%, 25%, 1)
        "gray-800": "#1b1b2c", // hsla(240, 24%, 14%, 1)
        "gray-900": "#10101e", // hsla(240, 32%, 9%, 1)


        "accent-100": "#b7fafa", // hsla(180, 88%, 85%, 1)
        "accent-200": "#97eded", // hsla(180, 70%, 76%, 1)
        "accent-300": "#74dcdc", // hsla(180, 60%, 66%, 1)
    
        "accent-400": "#5bc8bd", // hsla(174, 50%, 57%, 1)
        "accent-500": "#4db3a2", // hsla(170, 40%, 50%, 1)
        "accent-600": "#37a492", // hsla(170, 50%, 43%, 1)
    
        "accent-700": "#228c7a", // hsla(170, 61%, 34%, 1)
        "accent-800": "#0b6b5b", // hsla(170, 82%, 23%, 1)
        "accent-900": "#024f42", // hsla(170, 94%, 16%, 1)


        "accent-warning-100": "#fafab7", // hsla(60, 88%, 85%, 1)
        "accent-warning-200": "#eded97", // hsla(60, 70%, 76%, 1)
        "accent-warning-300": "#dcdc74", // hsla(60, 60%, 66%, 1)
    
        "accent-warning-400": "#bfc85b", // hsla(65, 50%, 57%, 1)
        "accent-warning-500": "#a1b34d", // hsla(70, 40%, 50%, 1)
        "accent-warning-600": "#92a437", // hsla(70, 50%, 43%, 1)
    
        "accent-warning-700": "#7a8c22", // hsla(70, 61%, 34%, 1)
        "accent-warning-800": "#5b6b0b", // hsla(70, 82%, 23%, 1)
        "accent-warning-900": "#424f02", // hsla(70, 94%, 16%, 1)


        "accent-danger-100": "#fab7b7", // hsla(360, 88%, 85%, 1)
        "accent-danger-200": "#ed9797", // hsla(360, 70%, 76%, 1)
        "accent-danger-300": "#dc7474", // hsla(360, 60%, 66%, 1)
    
        "accent-danger-400": "#c85b5b", // hsla(360, 50%, 57%, 1)
        "accent-danger-500": "#b34d4d", // hsla(360, 40%, 50%, 1)
        "accent-danger-600": "#a43740", // hsla(355, 50%, 43%, 1)
    
        "accent-danger-700": "#8c2233", // hsla(350, 61%, 34%, 1)
        "accent-danger-800": "#6b0b1b", // hsla(350, 82%, 23%, 1)
        "accent-danger-900": "#4f020f", // hsla(350, 94%, 16%, 1)
      },
      spacing: {
        '1x': '4px',   // 16 x 0.25
        '2x': '8px',   // 16 x 0.5
        '3x': '12px',  // 16 x 0.75
        '4x': '16px',  // 16 x 1
        '6x': '24px',  // 16 x 1.5
        '8x': '32px',  // 16 x 2
        '12x': '48px', // 16 x 3
        '16x': '64px', // 16 x 4
        '24x': '96px', // 16 x 6
        '32x': '128px',// 16 x 8
        '48x': '192px',// 16 x 12
        '64x': '256px',// 16 x 16
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

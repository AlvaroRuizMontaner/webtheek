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
      fontSize: {
        '1u': '1rem',  // Configuración del tamaño de texto personalizado
        "1.5u": "1.5rem",
        "2u": "2rem"
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


/*         "primary-50": "#e5edff", // hsla(222, 100%, 95%, 1)
        "primary-100": "#ccd5ff", // hsla(229, 100%, 90%, 1)
        "primary-200": "#b3c1ff", // hsla(229, 100%, 85%, 1)
        "primary-300": "#8998f5", // hsla(232, 85%, 75%, 1)
    
        "primary-400": "#565ee6", // hsla(237, 74%, 62%, 1)
        "primary-500": "#4d4dcb", // hsla(240, 55%, 55%, 1)
        "primary-600": "#2929ae", // hsla(240, 62%, 42%, 1)
    
        "primary-700": "#202097", // hsla(240, 65%, 36%, 1)
        "primary-800": "#212173", // hsla(240, 56%, 29%, 1)
        "primary-900": "#1E1B4B", // hsla(244, 47%, 20%, 1) */


        "primary-50": "#f0f4ff", // hsla(230, 100%, 97%)
        "primary-100": "#d9e2ff", // hsla(230, 100%, 90%)
        "primary-200": "#b9c7ff", // hsla(232, 100%, 85%)
        "primary-300": "#9eaefc", // hsla(233, 95%, 78%)
        "primary-400": "#7589f2", // hsla(234, 85%, 68%)
        "primary-500": "#565ee6", // hsla(237, 74%, 62%) ← el tuyo, ¡ya está perfecto!

        "primary-600": "#4d4dcb", // hsla(240, 55%, 55%) ← tuyo
        "primary-700": "#2929ae", // hsla(240, 62%, 42%) ← tuyo
        "primary-800": "#202097", // hsla(240, 65%, 36%) ← tuyo
        "primary-900": "#1E1B4B", // hsla(244, 47%, 20%) ← tuyo




        "gray-100": "#f1f3f9", // hsla(222, 38%, 96%, 1)
        "gray-200": "#b3b9d6", // hsla(229, 30%, 77%, 1)
        "gray-300": "#a3a7c2", // hsla(232, 20%, 70%, 1)
    
        "gray-400": "#9495a8", // hsla(237, 10%, 62%, 1)
        "gray-500": "#778", // hsla(240, 7%, 50%, 1)
        "gray-600": "#535365", // hsla(240, 10%, 36%, 1)
    
        "gray-700": "#34344b", // hsla(240, 18%, 25%, 1)
        "gray-800": "#1b1b2c", // hsla(240, 24%, 14%, 1)
        "gray-900": "#10101e", // hsla(240, 32%, 9%, 1)

        

      "accent-50":  "#e6fdff", // hsla(182, 100%, 95%, 1)
      "accent-100": "#bff9ff", // hsla(183, 100%, 88%, 1)
      "accent-200": "#80f4ff", // hsla(185, 100%, 74%, 1)
      "accent-300": "#4be7f5", // hsla(186, 86%, 64%, 1)

      "accent-400": "#2ed3e0", // hsla(186, 72%, 53%, 1)
      "accent-500": "#12bdcc", // hsla(187, 81%, 45%, 1)
      "accent-600": "#109cad", // hsla(187, 77%, 37%, 1)

      "accent-700": "#0b7f90", // hsla(187, 81%, 30%, 1)
      "accent-800": "#07606f", // hsla(187, 82%, 23%, 1)
      "accent-900": "#03414e", // hsla(187, 88%, 16%, 1)


/*         "accent-50": "#e5ffff", // hsla(180, 100%, 95%, 1)
        "accent-100": "#cff", // hsla(180, 100%, 90%, 1)
        "accent-200": "#97eded", // hsla(180, 70%, 76%, 1)
        "accent-300": "#74dcdc", // hsla(180, 60%, 66%, 1)
    
        "accent-400": "#5bc8bd", // hsla(174, 50%, 57%, 1)
        "accent-500": "#39c6ae", // hsla(170, 55%, 50%, 1)
        "accent-600": "#37a492", // hsla(170, 50%, 43%, 1)
    
        "accent-700": "#228c7a", // hsla(170, 61%, 34%, 1)
        "accent-800": "#0b6b5b", // hsla(170, 82%, 23%, 1)
        "accent-900": "#024f42", // hsla(170, 94%, 16%, 1) */


        "accent-warning-100": "#fdfde7", // hsla(60, 88%, 95%, 1)
        "accent-warning-200": "#f5f5bc", // hsla(60, 75%, 85%, 1)
        "accent-warning-300": "#ebeb94", // hsla(60, 68%, 75%, 1)
    
        "accent-warning-400": "#d4dd6e", // hsla(65, 62%, 65%, 1)
        "accent-warning-500": "#b6cb4d", // hsla(70, 55%, 55%, 1)
        "accent-warning-600": "#92a437", // hsla(70, 50%, 43%, 1)
    
        "accent-warning-700": "#7a8c22", // hsla(70, 61%, 34%, 1)
        "accent-warning-800": "#5b6b0b", // hsla(70, 82%, 23%, 1)
        "accent-warning-900": "#424f02", // hsla(70, 94%, 16%, 1)


        "accent-danger-100": "#fde7e7", // hsla(360, 88%, 95%, 1)
        "accent-danger-200": "#f5bcbc", // hsla(360, 75%, 85%, 1)
        "accent-danger-300": "#eb9494", // hsla(360, 68%, 75%, 1)
    
        "accent-danger-400": "#e45858", // hsla(360, 72%, 62%, 1)
        "accent-danger-500": "#dd3c3c", // hsla(360, 70%, 55%, 1)
        "accent-danger-600": "#a43740", // hsla(355, 50%, 43%, 1)
    
        "accent-danger-700": "#8c2233", // hsla(350, 61%, 34%, 1)
        "accent-danger-800": "#6b0b1b", // hsla(350, 82%, 23%, 1)
        "accent-danger-900": "#4f020f", // hsla(350, 94%, 16%, 1)

        "blue-300": '#74a2ec',  // Sobrescribe el azul 300
        "blue-600": '#336ecc',  // Sobrescribe el azul 600
        "blue-800": '#0a287b',  // Sobrescribe el azul 800

        "indigo-300": '#948fef',
        "indigo-600": '#362fbc',
        "indigo-800": '#130d77',

        "yellow-300": '#efef8f',
        "yellow-600": '#bcbc2f',
        "yellow-800": '#77770d',

        "orange-300": '#efbf8f',
        "orange-600": '#bc762f',
        "orange-800": '#77420d',

        "green-300": 'var(--accent-300)',  // Usa variables CSS para verde
        "green-600": 'var(--accent-600)',
        "green-800": 'var(--accent-800)',

        "pink-600": "#d87da6",
        "pink-800": "#a92359",
        "pink-300": "#f3aed4"
      },
      spacing: {
        '1u': '4px',   // 16 x 0.25
        '2u': '8px',   // 16 x 0.5
        '3u': '12px',  // 16 x 0.75
        '4u': '16px',  // 16 x 1

        '6u': '24px',  // 16 x 1.5
        '8u': '32px',  // 16 x 2

        '12u': '48px', // 16 x 3
        '16u': '64px', // 16 x 4

        '24u': '96px', // 16 x 6
        '32u': '128px',// 16 x 8
        '48u': '192px',// 16 x 12
        
        '64u': '256px',// 16 x 16
      },
      borderWidth: {
        "1u": "4px",
        sm: "2px",
        md: "4px",
        lg: "10px"
      },
      boxShadow: {
        /* '1': "2px 2px 4px 2px rgba(0,0,0,0.3)", */
        "y-1": "0 1px 3px hsla(0, 0%, 0%,0.2)",
        "y-2": "0 2px 4px hsla(0, 0%, 0%,0.2)",
        "y-3": "0 4px 6px hsla(0, 0%, 0%,0.2)",
        "y-4": "0 5px 15px hsla(0, 0%, 0%,0.2)",
        "y-5": "0 10px 24px hsla(0, 0%, 0%,0.2)",
        "y-6": "0 15px 35px hsla(0, 0%, 0%,0.2)",
        "z-1": "0 0px 3px hsla(0, 0%, 0%,0.2)",
        "z-2": "0 0px 4px hsla(0, 0%, 0%,0.2)",
        "z-3": "0 0px 6px hsla(0, 0%, 0%,0.2)",
        "z-4": "0 0px 15px hsla(0, 0%, 0%,0.2)",
        "z-5": "0 0px 24px hsla(0, 0%, 0%,0.2)",
        "z-6": "0 0px 35px hsla(0, 0%, 0%,0.2)",
        inset: 'inset 0 1px 0 hsla(229, 100%, 77%, 1), 0 1px 3px hsla(0, 0%, 0%, 0.2)',
        "combined-1": "4px 6px hsla(0, 0%, 0%,0.7), 5px 15px hsla(0, 0%, 0%,0.1)",
        "no-blur": "0 3px 0 hsl(230, 7%, 83%)"
      },
      fontFamily: {
        orbitron: ["Orbitron", "sans-serif"],
        "rubik": ["Rubik", "sans-serif"],
      },
/*       fontSize: {
        body: ["14px", { lineHeight: "1.5", letterSpacing: "0.05em" }],
        headline: ["30px", { lineHeight: "1.5", letterSpacing: "-0.02em" }],
        "headline-lg": [
          "36px",
          { lineHeight: "1.5", letterSpacing: "-0.02em" },
        ],
      }, */
    },
  },
  plugins: [
    require("@tailwindcss/forms")
  ],
};
export default config;

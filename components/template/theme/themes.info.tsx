import "./styles.scss"
export const themes = [
  {
/*     color1: "blue-300",
    color2: "blue-500",
    color3: "blue-900",
    color4: "indigo-600",
    color5: "indigo-800", */
    icon: (
      <div className="w-8 h-8 icon-theme from-primary-200 to-primary-800 cursor-pointer"></div>
    ),
    nameTheme: "blue"
  },
  {
    icon: (
      <div className="w-8 h-8 icon-theme from-accent-warning-200 to-accent-warning-800 cursor-pointer"></div>
    ),
    nameTheme: "yellow"
  },
  {
    icon: (
      <div className="w-8 h-8 icon-theme from-red-200 to-red-800 cursor-pointer"></div>
    ),
    nameTheme: "red"
  },
  {
    icon: (
      <div className="w-8 h-8 icon-theme from-orange-200 to-orange-800 cursor-pointer"></div>
    ),
    nameTheme: "orange"
  },
]
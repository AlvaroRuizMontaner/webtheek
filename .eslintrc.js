module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@next/next/recommended",
    "plugin:@typescript-eslint/recommended", // Añade las reglas recomendadas de TypeScript
  ],
  overrides: [
    {
      env: {
        node: true,
        commonjs: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parser: "@typescript-eslint/parser", // Usa el parser de TypeScript
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: [
    "react",
    "@typescript-eslint", // Añade el plugin de TypeScript
  ],
  rules: {
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};

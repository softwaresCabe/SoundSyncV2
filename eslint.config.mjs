export default {
  // env: {
  //   browser: true,
  //   es2021: true,
  // },
  languageOptions: {
    globals: {
        window: true // Example for browser environment
    }
},
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "prettier"],
  rules: {
    "react/jsx-pascal-case": "error",
    "camelcase": ["error", { properties: "always" }],
    "prettier/prettier": "error",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};

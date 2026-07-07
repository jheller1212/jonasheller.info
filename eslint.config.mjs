import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

const eslintConfig = [
  {
    ignores: [".next/**", "out/**", "node_modules/**", "next-env.d.ts"],
  },
  ...coreWebVitals,
  ...typescript,
  {
    rules: {
      // The mounted-flag hydration pattern (setMounted(true) in an effect) is
      // deliberate in ThemeProvider/i18n; don't fail the lint on it.
      "react-hooks/set-state-in-effect": "warn",
    },
  },
];

export default eslintConfig;

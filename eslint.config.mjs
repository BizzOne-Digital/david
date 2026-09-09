import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTypescript,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
  {
    rules: {
      // Common client-only initialization patterns in this codebase.
      "react-hooks/set-state-in-effect": "off",
      // Dynamic Lucide icon lookup returns component types at runtime.
      "react-hooks/static-components": "off",
    },
  },
]);

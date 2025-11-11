import { FlatCompat } from "@eslint/eslintrc";
// 1. 'eslint-plugin-prettier' import 제거
// import prettier from "eslint-plugin-prettier";
import promise from "eslint-plugin-promise";
import unusedImports from "eslint-plugin-unused-imports";
import { dirname } from "path";
import { fileURLToPath } from "url";

// --- 추가된 모듈 ---
import prettierConfig from "eslint-config-prettier"; // Prettier 충돌 방지 설정 import (이것은 유지합니다!)
import globals from "globals"; // globals 패키지 import

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

export default [
  // 1. Next.js 기본 설정 (compat 사용)
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // 2. 전역 무시 설정
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "coverage/**",
      "dist/**",
    ],
  },

  // 3. 커스텀 플러그인 및 규칙 설정 (JS, TS, JSX, TSX 파일 대상)
  {
    files: ["**/*.{js,jsx,ts,tsx}"],

    // 언어 옵션
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
      // 'globals' 패키지를 사용하여 브라우저 및 Node.js 전역 변수 설정
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },

    // 플러그인 등록
    plugins: {
      // 2. 'prettier' 플러그인 등록 제거
      // prettier,
      "unused-imports": unusedImports,
      promise,
    },

    // 규칙 설정
    rules: {
      /* ----- Prettier ----- */
      // 3. 'prettier/prettier' 규칙 제거
      // "prettier/prettier": "error",

      /* ----- Unused (기존 설정과 동일) ----- */
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        { varsIgnorePattern: "^_", argsIgnorePattern: "^_" },
      ],

      /* ----- Promise (기존 설정과 동일) ----- */
      "promise/no-nesting": "warn",
      "promise/no-new-statics": "error",
      "promise/no-return-wrap": "error",
      "promise/valid-params": "error",

      /* ----- Next/TS Overrides (기존 설정과 동일) ----- */
      "no-console": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@next/next/no-page-custom-font": "off",
      "react/no-unescaped-entities": "off",
    },
  },

  // 4. Prettier 충돌 방지 설정 (중요!)
  // ❗️이 설정은 반드시 배열의 맨 마지막에 위치해야 합니다.
  // Next.js 및 커스텀 규칙과 충돌하는 모든 '스타일' 관련 ESLint 규칙을 비활성화합니다.
  prettierConfig, // 4. 'eslint-config-prettier'는 반드시 유지합니다.
];
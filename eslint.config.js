export default [
  {
    files: ["web-app/**/*.js", "scripts/**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        describe: "readonly",
        it: "readonly",
        document: "readonly",
        console: "readonly"
      }
    },
    rules: {
      "max-len": ["error", { code: 100, comments: 100, ignoreUrls: true }],
      "no-trailing-spaces": "error",
      "no-unused-vars": ["error", { argsIgnorePattern: "^_", caughtErrorsIgnorePattern: "^_" }],
      "no-undef": "error",
      "no-constant-condition": "error"
    }
  }
];

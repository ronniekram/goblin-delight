/** @type {import("eslint").Linter.Config} */

module.exports = {
  extends: [
    `plugin:astro/recommended`,
    `@actualsize/eslint-config`,
    `prettier`,
  ],
  plugins: [
    "import-quotes",
    "prettier",
  ],
  parser: `@typescript-eslint/parser`,
  parserOptions: {
    tsconfigRootDir: __dirname,
    sourceType: `module`,
    ecmaVersion: `latest`
  },
  overrides: [
    {
      files: [`*.astro`],
      parser: `astro-eslint-parser`,
      parserOptions: {
        parser: `@typescript-eslint/parser`,
        extraFileExtensions: [`.astro`]
      },
      rules: {
        "react/no-unescaped-entities": "off",
        "unicorn/prefer-export-from": "off",
        "unicorn/no-null": "off",
        "unicorn/prefer-optional-catch-binding": "off",
        "unicorn/explicit-length-check": "off",
        "unicorn/no-negated-condition": "off",
        "unicorn/expiring-todo-comments": "off",
        "import-quotes/import-quotes": [1, "double"],
        "import/no-anonymous-default-export": "off",
      },
    },
  ],
};

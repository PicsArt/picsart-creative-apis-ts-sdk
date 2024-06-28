module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
    "node": true,
  },
  "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  "overrides": [
    {
      "env": {
        "node": true,
      },
      "files": [".eslintrc.{js,cjs}"],
      "parserOptions": {
        "sourceType": "script",
      },
    },
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
  },
  "plugins": ["@typescript-eslint", "prettier", "unused-imports"],
  "ignorePatterns": ["lib", "tmp", "examples"],
  "rules": {
    "unused-imports/no-unused-imports": "error",
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
    "@typescript-eslint/consistent-type-imports": "off",
    "@typescript-eslint/no-namespace": "off",
    // The following rules are deprecated: https://eslint.org/blog/2023/10/deprecating-formatting-rules
    "array-bracket-newline": "off",
    "array-bracket-spacing": "off",
    "array-element-newline": "off",
    "arrow-parens": "off",
    "arrow-spacing": "off",
    "block-spacing": "off",
    "brace-style": "off",
    "comma-dangle": "off",
    "comma-spacing": "off",
    "comma-style": "off",
    "computed-property-spacing": "off",
    "dot-location": "off",
    "eol-last": "off",
    "func-call-spacing": "off",
    "function-call-argument-newline": "off",
    "function-paren-newline": "off",
    "generator-star-spacing": "off",
    "implicit-arrow-linebreak": "off",
    "indent": "off",
    "jsx-quotes": "off",
    "key-spacing": "off",
    "keyword-spacing": "off",
    "linebreak-style": "off",
    "lines-between-class-members": "off",
    "lines-around-comment": "off",
    "max-len": "off",
    "max-statements-per-line": "off",
    "multiline-ternary": "off",
    "new-parens": "off",
    "newline-per-chained-call": "off",
    "no-confusing-arrow": "off",
    "no-extra-parens": "off",
    "no-extra-semi": "off",
    "no-floating-decimal": "off",
    "no-mixed-operators": "off",
    "no-mixed-spaces-and-tabs": "off",
    "no-multi-spaces": "off",
    "no-multiple-empty-lines": "off",
    "no-tabs": "off",
    "no-trailing-spaces": "off",
    "no-whitespace-before-property": "off",
    "nonblock-statement-body-position": "off",
    "object-curly-newline": "off",
    "object-curly-spacing": "off",
    "object-property-newline": "off",
    "one-var-declaration-per-line": "off",
    "operator-linebreak": "off",
    "padded-blocks": "off",
    "padding-line-between-statements": "off",
    "quote-props": "off",
    "quotes": "off",
    "rest-spread-spacing": "off",
    "semi": "off",
    "semi-spacing": "off",
    "semi-style": "off",
    "space-before-blocks": "off",
    "space-before-function-paren": "off",
    "space-in-parens": "off",
    "space-infix-ops": "off",
    "space-unary-ops": "off",
    "spaced-comment": "off",
    "switch-colon-spacing": "off",
    "template-curly-spacing": "off",
    "template-tag-spacing": "off",
    "wrap-iife": "off",
    "wrap-regex": "off",
    "yield-star-spacing": "off",
    "@typescript-eslint/no-explicit-any": "off",
  },
};

export default {
  defaultSeverity: 'warning',
  extends: ['stylelint-config-standard-scss'],
  rules: {
    /**
     * stylelint rules
     * @link https://stylelint.io/user-guide/rules
     */
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    'block-no-empty': null,
    'color-no-invalid-hex': true,
    'comment-no-empty': true,
    'declaration-block-no-duplicate-properties': [
      true,
      {
        ignore: ['consecutive-duplicates-with-different-values'],
      },
    ],
    'declaration-block-no-shorthand-property-overrides': true,
    'font-family-no-duplicate-names': true,
    'function-calc-no-unspaced-operator': true,
    'function-linear-gradient-no-nonstandard-direction': true,
    'keyframe-declaration-no-important': true,
    'media-feature-name-no-unknown': true,
    'no-descending-specificity': null,
    'no-duplicate-at-import-rules': true,
    'no-duplicate-selectors': true,
    'no-empty-source': null,
    'no-invalid-double-slash-comments': true,
    'property-no-unknown': true,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global', 'local', 'export'],
      },
    ],
    'selector-pseudo-element-no-unknown': true,
    'string-no-newline': true,
    'unit-no-unknown': [
      true,
      {
        ignoreUnits: ['rpx'],
      },
    ],
    'color-hex-length': 'short',
    'comment-whitespace-inside': 'always',
    'declaration-block-single-line-max-declarations': 1,
    'length-zero-no-unit': [
      true,
      {
        ignore: ['custom-properties'],
      },
    ],
    'selector-max-id': 0,
    /**
     * tylelint-config-standard-scss rules
     * @link https://www.npmjs.com/package/stylelint-config-standard-scss
     */
    'scss/double-slash-comment-whitespace-inside': 'always',
  },
  overrides: [
    {
      // files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
      files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
      customSyntax: 'postcss-lit',
    },
  ],
};

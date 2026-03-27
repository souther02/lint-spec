import { RuleTester } from 'eslint';
import rule from '../../lib/rules/no-http-url.js';

const ruleTester = new RuleTester();

ruleTester.run('no-http-url', rule, {
  valid: [
    {
      code: "var test = 'https://chenghuai.com';",
    },
  ],

  invalid: [
    {
      code: "var test = 'http://chenghuai.com';",
      errors: [
        {
          message: 'Recommended "http://chenghuai.com" switch to HTTPS',
        },
      ],
    },
    {
      code: "<img src='http://chenghuai.com' />",
      languageOptions: {
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
      errors: [
        {
          message: 'Recommended "http://chenghuai.com" switch to HTTPS',
        },
      ],
    },
  ],
});

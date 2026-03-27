import { RuleTester } from 'eslint';
import rule from '../../lib/rules/no-timer-magic-numbers.js';

const ruleTester = new RuleTester();

ruleTester.run('no-timer-magic-numbers', rule, {
  valid: [
    {
      code: 'const TIME = 1000; setTimeout(() => { console.log(99) }, TIME)',
    },
    {
      code: 'const TIME = 1000; setInterval(() => { console.log(99) }, TIME)',
    },
    {
      code: 'setTimeout(() => { console.log(99) }, TIME)',
    },
  ],
  invalid: [
    {
      code: 'setTimeout(() => { console.log(99) }, 1000)',
      errors: [
        {
          messageId: 'noSetTimeoutMagicNumbers',
          data: {
            timerName: 'setTimeout',
            timerDelay: 1000,
          },
        },
      ],
    },
    {
      code: 'setInterval(() => { console.log(99) }, 300)',
      errors: [
        {
          messageId: 'noSetTimeoutMagicNumbers',
          data: {
            timerName: 'setInterval',
            timerDelay: 300,
          },
        },
      ],
    },
  ],
});

import { beforeEach, describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import stylelint from 'stylelint';

import config from '../index.js';

const validCss = readFileSync('./__tests__/fixtures/valid.css', 'utf-8');
const invalidCss = readFileSync('./__tests__/fixtures/invalid.css', 'utf-8');
const validScss = readFileSync('./__tests__/fixtures/valid.scss', 'utf-8');
const invalidScss = readFileSync('./__tests__/fixtures/invalid.scss', 'utf-8');
const validScssMdule = readFileSync(
  './__tests__/fixtures/valid-scss-module.scss',
  'utf-8',
);
const invalidLess = readFileSync('./__tests__/fixtures/invalid.less', 'utf-8');

describe('flags no warnings with valid css', () => {
  let result;

  beforeEach(async () => {
    result = await stylelint.lint({
      code: validCss,
      config,
    });
  });

  it('flags no warnings', () => {
    assert.equal(result.results[0].warnings.length, 0);
  });
});

describe('flags warnings with invalid css', () => {
  let result;

  beforeEach(async () => {
    result = await stylelint.lint({
      code: invalidCss,
      config,
    });
  });

  it('did warnings', () => {
    assert.equal(result.results[0].warnings.length > 0, true);
  });
});

describe('flags no warnings with valid scss', () => {
  let result;

  beforeEach(async () => {
    result = await stylelint.lint({
      code: validScss,
      config,
    });
  });

  it('flags no warnings', () => {
    assert.equal(result.results[0].warnings.length, 0);
  });
});

describe('flags warnings with invalid scss', () => {
  let result;

  beforeEach(async () => {
    result = await stylelint.lint({
      code: invalidScss,
      config,
    });
  });

  it('did warnings', () => {
    assert.equal(result.results[0].warnings.length > 0, true);
  });
});

describe('flags no warnings with valid scss module', () => {
  let result;

  beforeEach(async () => {
    result = await stylelint.lint({
      code: validScssMdule,
      config,
    });
  });

  it('flags no warnings', () => {
    assert.equal(result.results[0].warnings.length, 0);
  });
});

describe('flags warnings with invalid less', () => {
  let result;

  beforeEach(async () => {
    result = await stylelint.lint({
      code: invalidLess,
      config,
    });
  });

  it('did warnings', () => {
    assert.equal(result.results[0].warnings.length > 0, true);
  });
});

import type { Linter } from 'eslint';
import reactEssentialConfig from '../react';
import tsRuleConfig from '../../rules/typescript';
import tsBlacklistRuleConfig from '../rules/ts-blacklist';

export default [
  ...reactEssentialConfig,
  ...tsRuleConfig,
  tsBlacklistRuleConfig,
] as Linter.Config[];

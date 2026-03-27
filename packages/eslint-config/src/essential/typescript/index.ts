import type { Linter } from 'eslint';
import defaultEssentialConfig from '../index';
import tsRuleConfig from '../../rules/typescript';
import tsBlacklistRuleConfig from '../rules/ts-blacklist';

export default [
  ...defaultEssentialConfig,
  ...tsRuleConfig,
  tsBlacklistRuleConfig,
] as Linter.Config[];

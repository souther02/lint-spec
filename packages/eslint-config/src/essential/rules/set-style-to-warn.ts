import styleRuleConfig from '../../rules/base/style';

/**
 * 将 error 级别的 style 规则降级为 warn
 */

// 将传入 config 中 error 级别规则都改为 warn 级别
function setErrorRulesToWarn(config: { rules: Record<string, unknown> }) {
  const rules = Object.entries(config.rules).reduce(
    (acc, [ruleName, ruleValue]) => {
      if (Array.isArray(ruleValue) && ruleValue[0] === 'error') {
        return {
          ...acc,
          [ruleName]: ['warn', ...ruleValue.slice(1)],
        };
      }
      if (ruleValue === 'error') {
        // 'new-parens': 'error' 这种规则写法
        return {
          ...acc,
          [ruleName]: 'warn',
        };
      }
      return acc;
    },
    {} as Record<string, unknown>,
  );

  return {
    rules,
  };
}

export default setErrorRulesToWarn(styleRuleConfig);

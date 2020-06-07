const { useBabelRc, override, useEslintRc, removeModuleScopePlugin } = require('customize-cra')

module.exports = override(
  useBabelRc(),
  useEslintRc(),
  removeModuleScopePlugin()
)

const exts = '@(js|jsx|ts|tsx|mdx)';

module.exports = {
  stories: [`../stories/*.stories.${exts}`, `../../src/**/*.stories.${exts}`],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions'
  ]
};

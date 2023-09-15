import type { StorybookConfig } from '@storybook-vue/nuxt'

const config: StorybookConfig = {
    stories: [
        '../stories/**/*.mdx',
        // There is a bug if I make a more complex glob pattern like `(stories|components)`,
        // therefore I duplicate the pattern for the folders `stories/` and `components/`.
        // @see https://github.com/storybookjs/storybook/issues/22086
        '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
        '../components/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    ],
    addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'],
    framework: {
        name: '@storybook-vue/nuxt',
        options: {},
    },
    docs: {
        autodocs: 'tag',
    },
}
export default config

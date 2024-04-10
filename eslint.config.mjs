import eslintConfigPrettier from 'eslint-config-prettier'
import prettierPlugin from 'eslint-plugin-prettier'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

export default createConfigForNuxt({
    plugins: {
        prettier: prettierPlugin
    },
    rules: {
        // ...prettierPlugin.configs.recommended.rules,
        ...eslintConfigPrettier.rules,
        ...eslintPluginPrettierRecommended.rules,
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        '@typescript-eslint/ban-ts-ignore': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        'vue/require-default-prop': 'off', // props could be undefined
        'vue/padding-line-between-blocks': 'warn',
    },
    overrides: [
        {
            // stories files can have any name
            files: ['**/pages/*.vue'],
            rules: { 'vue/multi-word-component-names': 'off' },
        },
    ],
}).ov

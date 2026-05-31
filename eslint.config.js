import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', 'dist-docs']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    // Generated shadcn/ui code follows upstream conventions we don't rewrite:
    // components export a variants helper alongside the component, and some
    // effects intentionally sync state from external systems (embla, matchMedia).
    files: ['src/components/ui/**/*.{ts,tsx}', 'src/hooks/**/*.{ts,tsx}'],
    rules: {
      'react-refresh/only-export-components': 'off',
      'react-hooks/set-state-in-effect': 'off',
      // mapcn's Map reads refs in effects/cleanup by design.
      'react-hooks/refs': 'off',
    },
  },
  {
    // Registry/chart-spec files export a data object (and sometimes a small
    // example helper component) rather than being an HMR component module —
    // react-refresh doesn't apply.
    files: ['docs/registry/**/*.{ts,tsx}', 'docs/charts/**/*.{ts,tsx}'],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },
])

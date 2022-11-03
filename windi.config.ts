import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  extract: {
    exclude: ['node_modules', '.git', 'dist', 'mock', '.umi'],
  },
  attributify: true,
  darkMode: 'class',
  shortcuts: {
    btn: 'rounded border border-gray-300 text-gray-600 px-4 py-2 m-2 inline-block hover:shadow',
  },
  theme: {
    extend: {
      colors: {
        gray: {
          dark: '#969799',
          DEFAULT: '#C8C9CC',
          light: '#EBEDF0',
          lightest: '#F7F8FA',
        },
        green: {
          light: '#00A8E5',
        },
      },
    },
  },
})

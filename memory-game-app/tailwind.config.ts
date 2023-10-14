import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark-blue': 'var(--color-dark-blue)',
        'off-white': 'var(--color-off-white)',
        "gray-color": 'var(--color-gray)',
        'light-gray': 'var(--color-light-gray)',
        'orange-color': 'var(--color-orange)',
        'navy-blue': 'var(--color-navy-blue)',
        "color-ash": 'var(--color-ash)',
        'light-blue': 'var(--color-light-blue)',
      },
    },
  },
  plugins: [],
}
export default config

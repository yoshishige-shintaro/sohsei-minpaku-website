/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // メインカラー
        'deep-blue': '#1D3557',
        'ink': '#1A1A1A',
        // アクセントカラー
        'sakura': '#FAD2E1',
        'wakatake': '#88BDBC',
        // 背景色
        'kinari': '#F5F2E9',
      },
      fontFamily: {
        sans: ['var(--font-noto-sans-jp)', 'sans-serif'],
        serif: ['var(--font-noto-serif-jp)', 'serif'],
      },
    },
  },
  plugins: [],
};
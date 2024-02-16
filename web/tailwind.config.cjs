/** @type {import('tailwindcss').Config} */

export default {
	content: [
		`./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}`,
	],
	plugins: [
		require(`@tailwindcss/forms`),
	],
	theme: {
		extend: {
      colors: {
        current: `currentColor`,
        transparent: `transparent`,
        black: `black`,
        white: `white`,
        green: {
					100: `#FCFCFA`,
					200: `#FAFCF1`,
					300: `#E1F5E7`,
					400: `#9ADCAF`,
					500: `#48AD6A`,
					600: `#218365`,
					700: `#135D50`,
					800: `#05373B`,
					900: `#111518`,
				},
      },
      fontSize: {
        "2xs": [`11px`, `14.3px`],
        "xs": [`12px`, `18px`],
        "sm": [`14px`, `20px`],
        "base": [`16px`, `24px`],
        "lg": [`18px`, `28px`],
        "xl": [`20px`, `28px`],
        "2xl": [`24px`, `32px`],
        "3xl": [`30px`, `36px`],
        "4xl": [`36px`, `40px`],
        "5xl": [`48px`, `48px`],
        "6xl": [`60px`, `60px`],
        "7xl": [`72px`, `68.4px`],
        "8xl": [`96px`, `91.2px`],
        "9xl": [`108px`, `102.6px`],
        "10xl": [`160px`, `152px`],
      },
      fontWeight: {
        xthin: 100,
        thin: 200,
        light: 300,
        regular: 400,
        medium: 500,
        semi: 600,
        bold: 700,
        xbold: 800,
        black: 900,
      },
      fontFamily: {
        sans: [`Inter Tight`, `sans-serif`],
        display: [`OpenSansPX`, `monospace`],
      },
      boxShadow: {
        xs: `1px 2px 0px 0px #05373B`,
        sm: `2px 3px 0px 0px #05373B`,
        DEFAULT: `3px 4px 0px 0px #05373B`,
        lg: `3px 6px 0px 0px #05373B`,
        xl: `4px 7px 0px 0px #05373B`,
        "2xl": `5px 9px 0px 0px #05373B`,
      },
    },
	},
};

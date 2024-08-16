/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;

// autoprefixer: This plugin adds vendor prefixes to your CSS rules, ensuring cross-browser compatibility.

/*
 Tailwind CSS relies on PostCSS to process its utility-first styles. The postcss.config.
 js file typically includes the necessary plugins to compile and process Tailwind's CSS.
 */

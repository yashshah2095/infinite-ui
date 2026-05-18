// postcss.config.js (INSIDE YOUR LIBRARY PROJECT ROOT)
export default {
  plugins: {
    // FIXED: Point to the dedicated Tailwind v4 PostCSS package
    '@tailwindcss/postcss': {}, 
    autoprefixer: {},
  },
}
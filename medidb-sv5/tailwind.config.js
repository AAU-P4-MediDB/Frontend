/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      colors: {
        // This maps the utility 'cyan' to your CSS variable
        cyan: "var(--medi-cyan)",
        dark: "var(--medi-dark)",
        darker: "var(--medi-darker)",
        light: "var(--medi-light)",
        lighter: "var(--medi-lighter)",
      },
    },
  },
  plugins: [],
};

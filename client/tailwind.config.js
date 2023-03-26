/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    // Override the default Tailwind theme config here.
    extend: {
      colors: {
        accent: "var(--color-accent)",
        outline: {
          accent: ["2px dotted var(--color-accent)", "2px"],
        },
      },
      backgroundColor: {
        accent: "var(--color-bg-accent)",
        primary: "var(--color-bg-primary)",
        secondary: "var(--color-bg-secondary)",
      },
      textColor: {
        accent: "var(--color-text-accent)",
        primary: "var(--color-text-primary)",
        secondary: "var(--color-text-secondary)",
      },
      keyframes: {
        "0%": {
          transform: "rotate(0deg)",
        },
        "100%": {
          transform: "rotate(360deg)",
        },
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui"), require("tailwindcss-debug-screens")],
};

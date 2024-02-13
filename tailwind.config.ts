import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {},
    },
    extend: {
      backgroundImage: (theme) => ({
        gradient: "url('../public/images/Gradient.webp')",
      }),
      keyframes: {
        "gradient-y": {
          "0%, 100%": {
            "background-size": "400% 400%",
            "background-position": "center top",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "center center",
          },
        },
        "gradient-x": {
          "0%, 100%": {
            "background-size": "300% 300%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "300% 300%",
            "background-position": "right center",
          },
        },
        "gradient-xy": {
          "0%, 100%": {
            "background-size": "400% 400%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "gradient-x": "gradient-x 6s ease-in-out infinite alternate",
        "gradient-y": "gradient-y 10s ease-in-out infinite alternate",
        "gradient-xy": "gradient-xy 5s ease-in-out infinite alternate",
      },
      boxShadow: {
        perfect:
          "-10px 10px 10px 0px rgba(0, 0, 0, 0.35), -30px 30px 30px 0px rgba(0, 0, 0, 0.20), -45px 45px 70px 0px rgba(0, 0, 0, 0.20), 8px -8px 10px 0px rgba(255, 255, 255, 0.07), -3px 3px 4px 0px rgba(255, 255, 255, 0.20) inset",
      },
      backgroundColor: {
        bento: "#313131",
        main: "#202020",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config

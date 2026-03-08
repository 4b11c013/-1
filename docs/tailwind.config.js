/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#3482B9",
          light: "#5BA4D3",
          dark: "#26608A",
          soft: "rgba(52, 130, 185, 0.1)",
        },
        background: {
          light: "#F5F7F8",
          dark: "#0F1113",
        },
        card: {
          light: "rgba(255, 255, 255, 0.8)",
          dark: "rgba(30, 32, 35, 0.8)",
          border: {
            light: "rgba(255, 255, 255, 0.3)",
            dark: "rgba(255, 255, 255, 0.05)",
          }
        },
        slate: {
          850: "#1A1C1E",
          950: "#0A0B0C",
        }
      },
      fontFamily: {
        display: ["Outfit", "Inter", "sans-serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
        zodiak: ["Zodiak", "serif"],
      },
      borderRadius: {
        "DEFAULT": "1rem",
        "xl": "2.5rem",
        "2xl": "3.5rem",
      },
      boxShadow: {
        'premium': '0 10px 30px -5px rgba(0, 0, 0, 0.05), 0 4px 15px -2px rgba(0, 0, 0, 0.03)',
        'premium-hover': '0 20px 40px -5px rgba(0, 0, 0, 0.1), 0 10px 20px -2px rgba(0, 0, 0, 0.05)',
        'glass': 'inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'subtle-float': 'subtleFloat 6s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        subtleFloat: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}

/** Configuración de Tailwind con los design tokens oficiales de la marca EXPROSER */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./js/**/*.js"],
  theme: {
    extend: {
      colors: {
        "primary-dark": "#0A192F",
        "primary-blue": "#0F2C59",
        "accent-cyan": "#00A8CC",
        "accent-amber": "#F5A623",
        "neutral-bg": "#F8FAFC",
        "neutral-card": "#FFFFFF",
        "neutral-text": "#1E293B",
        "neutral-subtext": "#64748B",
        "success-green": "#10B981"
      },
      fontFamily: {
        display: ["Montserrat", "sans-serif"],
        body: ["Inter", "sans-serif"],
        technical: ["Barlow Semi Condensed", "sans-serif"]
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "16px",
        full: "9999px"
      },
      boxShadow: {
        card: "0 4px 20px -4px rgba(10, 25, 47, 0.12)",
        "card-hover": "0 12px 32px -8px rgba(10, 25, 47, 0.22)"
      }
    }
  },
  plugins: []
};

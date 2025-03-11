/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "yellow-25": "#FFB300", // Custom yellow color
        "red-25": "#FF4500", // Custom red color
        "blue-25": "#1E90FF", // Custom blue color (if needed)
        "blue-900" : "#121858",
        "lavendar" :"#C0B4FF",
        "dark-blue":"#304050",
        "deep-lavendar":"#7446C3",
        "dark-purple":"#4B0082",
        "near-black":"#333333",
        "boundary-color":"#7446C3",
        "navbar-color":"#4B0082",
        "clicked-25":"#FF9800",
        "icon-color":"#4B0082",
        "button-color":"#FFB0FF",
        "purple-text":"#673AB7",


      },
      animation: {
        'fade-in': 'fadeIn 1.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};

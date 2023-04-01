/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {

  
          
          "primary": "#b18be8",
                   
          "secondary": "#9df28a",
                   
          "accent": "#a3ff7c",
                   
          "neutral": "#2A1F2D",
                   
          "base-100": "#ede9fe",
                   
          "info": "#689ACF",
                   
          "success": "#50DC8B",
                   
          "warning": "#C46A03",
                   
          "error": "#FB1849",
               

      },
      
    },
  },
  plugins: [],
}
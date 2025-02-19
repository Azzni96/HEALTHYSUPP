/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./Menu.html",
    "./addProduct.html",
    "./productDetail.html"
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#ffffff',
        'secondary': '#f5f5f7',
        'accent': '#E60012',
        'text': '#1d1d1f',
        'subtle': '#86868b'
      },
      maxWidth: {
        'container': '1024px'
      }
    },
  },
  plugins: [],
}

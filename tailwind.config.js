/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'voltaris-red': '#FF4254',
        'voltaris-blue': '#0044FF',
        'voltaris-dark': '#0A0A14',
      },
      animation: {
        loadingBar: 'loadingBar 2.5s ease-in-out forwards',
        fadeIn: 'fadeIn 1s ease-out forwards',
        fadeInDelay: 'fadeInDelay 1.2s ease-out forwards',
        fadeInDelayLong: 'fadeInDelayLong 1.5s ease-out forwards',
        horizontalSweep: 'horizontalSweep 8s linear infinite',
        verticalSweep: 'verticalSweep 8s linear infinite',
        pulseSlow: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        rotate: 'rotate 20s linear infinite',
        scanLine: 'scanLine 3s linear infinite',
        dataStream: 'dataStream 5s linear infinite',
        barGrow: 'barGrow 1.5s ease-out forwards',
        'circuit-line-1': 'circuit-line-1 3s ease-in-out infinite',
        'circuit-line-2': 'circuit-line-2 3s ease-in-out infinite',
        'circuit-line-3': 'circuit-line-3 3s ease-in-out infinite',
        'circuit-line-4': 'circuit-line-4 3s ease-in-out infinite',
        'circuit-flow': 'circuit-flow 3s ease-in-out infinite',
        'rotate-gradient': 'rotate-gradient 3s linear infinite',
        'sectionFadeIn': 'sectionFadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'diagonalScan': 'diagonalScan 10s linear infinite',
        'diagonalScanReverse': 'diagonalScanReverse 10s linear infinite',
        'hide-scrollbar': 'hide-scrollbar 0.1s forwards',
        'sponsorSlide': 'sponsorSlide 30s linear infinite',
      },
      backgroundImage: {
        'circuit-pattern': `
          linear-gradient(to right, rgba(255, 66, 84, 0.03) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0, 68, 255, 0.03) 1px, transparent 1px)
        `,
        'technical-grid': `
          linear-gradient(to right, rgba(255, 0, 0, 0.05) 1px, transparent 1px), 
          linear-gradient(to bottom, rgba(0, 0, 255, 0.05) 1px, transparent 1px)
        `,
        'gradient-red-blue': 'linear-gradient(90deg, #FF4254 0%, #0044FF 100%)',
        'gradient-blue-red': 'linear-gradient(90deg, #0044FF 0%, #FF4254 100%)',
        'gradient-radial': 'radial-gradient(circle, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'red-glow': '0 0 15px rgba(255, 66, 84, 0.5)',
        'blue-glow': '0 0 15px rgba(0, 68, 255, 0.5)',
        'platinum': '0 0 15px rgba(255, 223, 0, 0.3)',
        'gold': '0 0 15px rgba(255, 215, 0, 0.3)',
        'silver': '0 0 15px rgba(192, 192, 192, 0.3)',
        'bronze': '0 0 15px rgba(205, 127, 50, 0.3)',
      },
      backdropBlur: {
        xs: '2px',
      },
      keyframes: {
        'circuit-line-1': {
          '0%': { transform: 'translateX(-100%)', opacity: 0.8 },
          '100%': { transform: 'translateX(100%)', opacity: 0.8 },
        },
        'circuit-line-2': {
          '0%': { transform: 'translateY(-100%)', opacity: 0.8 },
          '100%': { transform: 'translateY(100%)', opacity: 0.8 },
        },
        'circuit-line-3': {
          '0%': { transform: 'translateX(100%)', opacity: 0.8 },
          '100%': { transform: 'translateX(-100%)', opacity: 0.8 },
        },
        'circuit-line-4': {
          '0%': { transform: 'translateY(100%)', opacity: 0.8 },
          '100%': { transform: 'translateY(-100%)', opacity: 0.8 },
        },
        'circuit-flow': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'rotate-gradient': {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' },
        },
        'sectionFadeIn': {
          'from': { opacity: 0, transform: 'translateY(30px)' },
          'to': { opacity: 1, transform: 'translateY(0)' },
        },
        'diagonalScan': {
          '0%': { transform: 'translateX(-100%) rotate(45deg)' },
          '100%': { transform: 'translateX(100%) rotate(45deg)' }
        },
        'diagonalScanReverse': {
          '0%': { transform: 'translateX(100%) rotate(-45deg)' },
          '100%': { transform: 'translateX(-100%) rotate(-45deg)' }
        },
        'hide-scrollbar': {
          '0%': { '::-webkit-scrollbar': { width: '0px' } },
          '100%': { '::-webkit-scrollbar': { width: '0px' } }
        },
        'sponsorSlide': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        },
      },
      transitionProperty: {
        'theme': 'color, background-color, border-color, opacity, box-shadow',
      },
      transitionTimingFunction: {
        'tesla': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
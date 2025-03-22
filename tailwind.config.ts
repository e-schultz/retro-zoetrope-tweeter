
import type { Config } from "tailwindcss";

export default {
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
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        terminal: {
          black: '#121212',
          green: '#33ff33',
          cyan: '#00ffff',
          blue: '#0099ff',
          magenta: '#ff33ff',
          red: '#ff3333',
          yellow: '#ffff33',
          white: '#ffffff',
          grid: '#1a3a3a',
        },
        neon: {
          purple: '#b14aed',
          pink: '#ff2a6d',
          blue: '#05d9e8',
          green: '#01ff70',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
      },
      fontFamily: {
        mono: ['VT323', 'Consolas', 'Monaco', 'Andale Mono', 'Ubuntu Mono', 'monospace'],
        display: ['Press Start 2P', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'terminal-blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'scan-line': {
          '0%': { transform: 'translateY(0%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        'crt-flicker': {
          '0%': { opacity: '0.9' },
          '10%': { opacity: '0.95' },
          '20%': { opacity: '0.85' },
          '30%': { opacity: '0.9' },
          '40%': { opacity: '0.95' },
          '50%': { opacity: '0.8' },
          '60%': { opacity: '0.9' },
          '70%': { opacity: '0.8' },
          '80%': { opacity: '0.9' },
          '90%': { opacity: '0.95' },
          '100%': { opacity: '0.9' },
        },
        'pulse-neon': {
          '0%, 100%': { 
            textShadow: '0 0 4px #fff, 0 0 11px #fff, 0 0 19px #fff, 0 0 40px var(--neon-color), 0 0 80px var(--neon-color), 0 0 90px var(--neon-color), 0 0 100px var(--neon-color), 0 0 150px var(--neon-color)',
            boxShadow: '0 0 0.2rem #fff, 0 0 0.2rem #fff, 0 0 2rem var(--neon-color), 0 0 0.8rem var(--neon-color), 0 0 2.8rem var(--neon-color), inset 0 0 1.3rem var(--neon-color)',
          },
          '50%': { 
            textShadow: '0 0 4px #fff, 0 0 1px #fff, 0 0 19px #fff, 0 0 10px var(--neon-color), 0 0 30px var(--neon-color), 0 0 40px var(--neon-color), 0 0 50px var(--neon-color), 0 0 70px var(--neon-color)',
            boxShadow: '0 0 0.1rem #fff, 0 0 0.1rem #fff, 0 0 1rem var(--neon-color), 0 0 0.4rem var(--neon-color), 0 0 1.4rem var(--neon-color), inset 0 0 0.8rem var(--neon-color)',
          },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'grid-scroll': {
          '0%': { transform: 'translateZ(0) translateY(0)' },
          '100%': { transform: 'translateZ(0) translateY(calc(-1 * var(--grid-size)))' },
        },
        'appear': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'glitch': {
          '0%, 5%, 10%, 100%': { transform: 'skew(0deg)' },
          '1%': { transform: 'skew(-10deg)' },
          '2%': { transform: 'skew(2deg)' },
          '3%': { transform: 'skew(5deg)' },
          '4%': { transform: 'skew(-3deg)' },
          '6%': { transform: 'skew(4deg)' },
          '7%': { transform: 'skew(-2deg)' },
          '8%': { transform: 'skew(3deg)' },
          '9%': { transform: 'skew(-8deg)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'terminal-blink': 'terminal-blink 1s step-end infinite',
        'scan-line': 'scan-line 8s linear infinite',
        'crt-flicker': 'crt-flicker 0.5s infinite',
        'pulse-neon': 'pulse-neon 2s infinite',
        'float': 'float 6s ease-in-out infinite',
        'grid-scroll': 'grid-scroll 20s linear infinite',
        'appear': 'appear 0.5s ease-out forwards',
        'slide-in': 'slide-in 0.3s ease-out',
        'glitch': 'glitch 2s ease-in-out infinite',
      },
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(220, 26%, 14%)',
        foreground: 'hsl(210, 40%, 98%)',
        card: 'hsl(220, 26%, 18%)',
        'card-foreground': 'hsl(210, 40%, 98%)',
        popover: 'hsl(220, 26%, 18%)',
        'popover-foreground': 'hsl(210, 40%, 98%)',
        primary: 'hsl(262, 83%, 58%)',
        'primary-foreground': 'hsl(210, 40%, 98%)',
        secondary: 'hsl(220, 26%, 20%)',
        'secondary-foreground': 'hsl(210, 40%, 98%)',
        muted: 'hsl(220, 26%, 20%)',
        'muted-foreground': 'hsl(215, 20%, 65%)',
        accent: 'hsl(217, 91%, 60%)',
        'accent-foreground': 'hsl(210, 40%, 98%)',
        destructive: 'hsl(0, 84%, 60%)',
        'destructive-foreground': 'hsl(210, 40%, 98%)',
        border: 'hsl(220, 26%, 25%)',
        input: 'hsl(220, 26%, 25%)',
        ring: 'hsl(262, 83%, 58%)',
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      borderRadius: {
        lg: '0.75rem',
        md: '0.5rem',
        sm: '0.25rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}

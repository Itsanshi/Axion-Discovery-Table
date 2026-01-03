import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        // Core
        border: "hsl(var(--border))",
        "border-hover": "hsl(var(--border-hover))",
        "border-focus": "hsl(var(--border-focus))",
        input: "hsl(var(--input))",
        "input-focus": "hsl(var(--input-focus))",
        ring: "hsl(var(--ring))",
        
        // Background Palette
        background: {
          DEFAULT: "hsl(var(--background))",
          elevated: "hsl(var(--background-elevated))",
          surface: "hsl(var(--background-surface))",
          hover: "hsl(var(--background-hover))",
          active: "hsl(var(--background-active))",
        },
        
        // Foreground/Text
        foreground: {
          DEFAULT: "hsl(var(--foreground))",
          secondary: "hsl(var(--foreground-secondary))",
          muted: "hsl(var(--foreground-muted))",
          dim: "hsl(var(--foreground-dim))",
        },
        
        // Primary
        primary: {
          DEFAULT: "hsl(var(--primary))",
          glow: "hsl(var(--primary-glow))",
          dim: "hsl(var(--primary-dim))",
          foreground: "hsl(var(--primary-foreground))",
        },
        
        // Secondary
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        
        // Muted
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        
        // Accent
        accent: {
          DEFAULT: "hsl(var(--accent))",
          glow: "hsl(var(--accent-glow))",
          foreground: "hsl(var(--accent-foreground))",
        },
        
        // Semantic - Trading
        success: {
          DEFAULT: "hsl(var(--success))",
          glow: "hsl(var(--success-glow))",
          dim: "hsl(var(--success-dim))",
          foreground: "hsl(var(--success-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          glow: "hsl(var(--destructive-glow))",
          dim: "hsl(var(--destructive-dim))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          glow: "hsl(var(--warning-glow))",
          foreground: "hsl(var(--warning-foreground))",
        },
        
        // Price Colors
        price: {
          up: "hsl(var(--price-up))",
          "up-bg": "hsl(var(--price-up-bg))",
          down: "hsl(var(--price-down))",
          "down-bg": "hsl(var(--price-down-bg))",
          neutral: "hsl(var(--price-neutral))",
        },
        
        // Progress
        progress: {
          bg: "hsl(var(--progress-bg))",
          fill: "hsl(var(--progress-fill))",
          glow: "hsl(var(--progress-glow))",
        },
        
        // Table
        table: {
          "row-hover": "hsl(var(--table-row-hover))",
          "row-active": "hsl(var(--table-row-active))",
          header: "hsl(var(--table-header))",
          border: "hsl(var(--table-border))",
        },
        
        // Tab
        tab: {
          inactive: "hsl(var(--tab-inactive))",
          active: "hsl(var(--tab-active))",
          indicator: "hsl(var(--tab-indicator))",
        },
        
        // Skeleton
        skeleton: {
          base: "hsl(var(--skeleton-base))",
          shine: "hsl(var(--skeleton-shine))",
        },
        
        // Card & Popover
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
          hover: "hsl(var(--card-hover))",
          border: "hsl(var(--card-border))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        
        // Sidebar
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "var(--radius-xl)",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        "glow-primary": "var(--shadow-glow-primary)",
        "glow-success": "var(--shadow-glow-success)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(4px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 5px hsl(var(--primary) / 0.3)" },
          "50%": { boxShadow: "0 0 20px hsl(var(--primary) / 0.5)" },
        },
        "flash-green": {
          "0%, 100%": { backgroundColor: "transparent" },
          "50%": { backgroundColor: "hsl(142 76% 45% / 0.15)" },
        },
        "flash-red": {
          "0%, 100%": { backgroundColor: "transparent" },
          "50%": { backgroundColor: "hsl(0 84% 55% / 0.15)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out forwards",
        "slide-up": "slide-up 0.4s ease-out forwards",
        "scale-in": "scale-in 0.2s ease-out forwards",
        shimmer: "shimmer 1.5s infinite ease-in-out",
        "pulse-glow": "pulse-glow 2s infinite ease-in-out",
        "flash-green": "flash-green 0.6s ease-out",
        "flash-red": "flash-red 0.6s ease-out",
      },
      transitionDuration: {
        "150": "150ms",
        "250": "250ms",
        "350": "350ms",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

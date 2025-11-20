import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#0a0f1a",
                foreground: "#ffffff",
                card: {
                    DEFAULT: "#111827",
                    foreground: "#ffffff",
                },
                popover: {
                    DEFAULT: "#111827",
                    foreground: "#ffffff",
                },
                primary: {
                    DEFAULT: "#3b82f6",
                    foreground: "#ffffff",
                },
                secondary: {
                    DEFAULT: "#1e3a8a",
                    foreground: "#ffffff",
                },
                muted: {
                    DEFAULT: "#1e293b",
                    foreground: "#94a3b8",
                },
                accent: {
                    DEFAULT: "#06b6d4",
                    foreground: "#ffffff",
                },
                destructive: {
                    DEFAULT: "#ef4444",
                    foreground: "#ffffff",
                },
                border: "#1e293b",
                input: "#334155",
                ring: "#3b82f6",
            },
            borderRadius: {
                lg: "0.625rem",
                md: "calc(0.625rem - 2px)",
                sm: "calc(0.625rem - 4px)",
            },
            fontFamily: {
                sans: ['suite', 'suit', 'rajdhani', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
                mono: ['"Geist Mono"', '"Geist Mono Fallback"', '"Courier New"', 'monospace'],
            },
        },
    },
    plugins: [],
};
export default config;

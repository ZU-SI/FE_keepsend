/**  {import('tailwindcss').Config} */


module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark Theme (Default)
        background: "#0a0f1a", // $background
        foreground: "#ffffff", // $foreground

        // Light Theme
        "background-light": "#f8fafc", // $background-light
        "foreground-light": "#0f172a", // $foreground-light

        // Card colors
        card: {
          DEFAULT: "#111827", // $card
          foreground: "#ffffff", // $card-foreground
          light: "#ffffff", // $card-light
          "light-foreground": "#0f172a", // $card-light-foreground
        },

        // Popover
        popover: {
          DEFAULT: "#111827", // $popover
          foreground: "#ffffff", // $popover-foreground
        },

        // Primary colors
        primary: {
          DEFAULT: "#3b82f6", // $primary
          foreground: "#ffffff", // $primary-foreground
          hover: "#2563eb", // $primary-hover
        },

        // Secondary colors
        secondary: {
          DEFAULT: "#1e3a8a", // $secondary
          foreground: "#ffffff", // $secondary-foreground
        },

        // Muted colors
        muted: {
          DEFAULT: "#1e293b", // $muted
          foreground: "#e2e8f0", // $muted-foreground
          light: "#f1f5f9", // $muted-light
          "foreground-light": "#64748b", // $muted-foreground-light
        },

        // Accent colors
        accent: {
          DEFAULT: "#06b6d4", // $accent
          foreground: "#ffffff", // $accent-foreground
        },

        // Destructive
        destructive: {
          DEFAULT: "#ef4444", // $destructive
          foreground: "#ffffff", // $destructive-foreground
        },

        // Borders
        border: {
          DEFAULT: "#1e293b", // $border
          light: "#e2e8f0", // $border-light
        },

        // Input
        input: "#334155", // $input

        // Ring (focus)
        ring: "#3b82f6", // $ring

        // Base colors
        black: "#000000", // $black
        white: "#fafafa", // $white

        // Gray scale (Tailwind 기본값 유지하면서 확장)
        gray: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
        },

        // Slate
        slate: {
          800: "#1e293b",
        },

        // Cyan colors
        cyan: {
          400: "#22d3ee",
          500: "#06b6d4",
          600: "#0891b2",
        },

        // Purple colors
        purple: {
          50: "#faf5ff",
          100: "#f3e8ff",
          500: "#8b5cf6",
          600: "#7c3aed",
        },

        // Status Colors
        success: {
          DEFAULT: "#10b981", // Emerald-500: 배송 완료, 정상 가동 (Dark/Light 모두 가독성 우수)
          foreground: "#ffffff",
          light: "#d1fae5",   // Emerald-100: 배경용 (Light 모드 뱃지 등)
        },
        warning: {
          DEFAULT: "#f59e0b", // Amber-500: 지연, 트래픽 혼잡 (Red와 확실히 구분됨)
          foreground: "#ffffff",
          light: "#fef3c7",   // Amber-100
        },
        info: {
          DEFAULT: "#3b82f6", // Primary와 동일하지만, '정보'라는 의미론적 사용을 위해 별칭 추가
          foreground: "#ffffff",
          light: "#dbeafe",
        },

        // [New] Data Visualization Colors (차트/그래프 전용)
        // 배경색(#0a0f1a) 위에서 명확히 보이는 고채도/고명도 컬러로 보정
        chart: {
          1: "#3b82f6", // Blue-500 (기존 Primary)
          2: "#22d3ee", // Cyan-400 (기존 Accent보다 밝음 -> Dark모드 차트용)
          3: "#f472b6", // Pink-400 (AI/예측 데이터 비교군용 - 신규 추가)
          4: "#34d399", // Emerald-400 (성공 데이터 그래프용)
          5: "#fbbf24", // Amber-400 (경고 데이터 그래프용)

          // 다크모드 전용 보정 (기존 Secondary #1e3a8a는 차트에서 안보임 -> #60a5fa로 대체 권장)
          "dark-blue": "#60a5fa",
          "dark-cyan": "#67e8f9",
        }
      },

      // Border Radius - Tailwind 기본값 + custom 추가
      borderRadius: {
        sm: "calc(0.625rem - 4px)", // custom
        md: "calc(0.625rem - 2px)", // custom
        lg: "0.625rem", // custom (10px)
        xl: "calc(0.625rem + 4px)", // custom (14px)
        // full은 Tailwind 기본값 9999px 사용
      },

      // Font Family
      fontFamily: {
        sans: [
          "suite",
          "suit",
          "rajdhani",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          "sans-serif",
        ],
        mono: [
          '"Geist Mono"',
          '"Geist Mono Fallback"',
          '"Courier New"',
          "monospace",
        ],
      },

      // Font Sizes - Tailwind 기본값 유지
      fontSize: {
        "6xl": "3.75rem", // 60px - 추가
      },

      // Max Width
      maxWidth: {
        container: "1040px",
      },

      // Background Images (Gradients)
      backgroundImage: {
        "gradient-cyan": "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)",
        "gradient-light": "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)",
      },

      // Transitions
      transitionDuration: {
        DEFAULT: "300ms",
      },

      // Z-Index
      zIndex: {
        navigation: "50",
      },

      // Backdrop Blur
      backdropBlur: {
        xs: "4px",
        DEFAULT: "12px",
      },

      // Box Shadow
      boxShadow: {
        "card-hover": "0 20px 40px rgba(59, 130, 246, 0.12)",
        "button-hover": "0 10px 25px rgba(59, 130, 246, 0.3)",
        card: "0 1px 3px rgba(0, 0, 0, 0.06)",
      },

      // Screens (Breakpoints)
      screens: {
        md: "768px",
        lg: "1024px",
      },
    },
  },
  plugins: [],
};


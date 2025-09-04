// Unified Color Palette for Bakardy Kite Website

// Primary Colors
export const PRIMARY = {
  main: '#3182ce',        // Main brand color (blue)
  light: '#63b3ed',       // Lighter blue
  dark: '#2c5aa0',        // Darker blue
  contrast: '#ffffff'     // Text on primary
};

// Secondary Colors
export const SECONDARY = {
  main: '#2e186a',        // Purple accent (former primary)
  light: '#4a5568',       // Lighter purple
  dark: '#1a202c',        // Darker purple
  contrast: '#ffffff'     // Text on secondary
};

// Accent Colors
export const ACCENT = {
    success: '#38a169',     // Green for success/available
    successLight: '#c6f6d5', // Light green background
    successDark: '#22543d',  // Dark green text
    warning: '#d69e2e',     // Yellow/orange for warnings
    error: '#e53e3e',       // Red for errors/unavailable
    errorLight: '#fed7d7',  // Light red background
    errorDark: '#c53030',   // Dark red text
    whatsapp: '#25d366',    // WhatsApp green
    whatsappDark: '#128c7e' // Dark WhatsApp green
};

// Instagram Colors
export const INSTAGRAM = {
    primary: '#e1306c',     // Instagram pink
    secondary: '#c13584',   // Instagram purple
    contrast: '#ffffff'     // Text on Instagram
};

// Neutral Colors
export const NEUTRAL = {
    white: '#ffffff',
    lightGray: '#f8fafc',
    gray: '#e2e8f0',
    mediumGray: '#cbd5e0',
    darkGray: '#718096',
    black: '#000000'
};

// Text Colors
export const TEXT = {
    primary: PRIMARY.dark,      // Main text
    secondary: PRIMARY.light,   // Secondary text
    muted: NEUTRAL.darkGray,   // Muted text
    inverse: NEUTRAL.white,    // Text on dark backgrounds
    accent: ACCENT.success      // Accent text
};

// Background Colors
export const BACKGROUND = {
    primary: NEUTRAL.white,
    secondary: NEUTRAL.lightGray,
    tertiary: NEUTRAL.gray,
    accent: '#e6fffa',         // Light teal background
    accentLight: '#b2f5ea'     // Very light teal
};

// Border Colors
export const BORDER = {
    primary: PRIMARY.main,
    secondary: SECONDARY.main,
    light: NEUTRAL.gray,
    accent: '#38b2ac'          // Teal accent
};

// Hover/Interactive Colors
export const INTERACTIVE = {
  hover: '#ff826c',          // Orange for hover/active
  active: '#ff826c',         // Active state
  focus: '#ff826c'           // Focus state
};

// Gradients
export const GRADIENTS = {
  primary: `linear-gradient(135deg, ${PRIMARY.main} 0%, ${PRIMARY.dark} 100%)`,      // Blue gradient
  secondary: `linear-gradient(135deg, ${SECONDARY.main} 0%, ${SECONDARY.dark} 100%)`, // Purple gradient
  success: `linear-gradient(135deg, ${ACCENT.success} 0%, ${ACCENT.successDark} 100%)`,
  instagram: `linear-gradient(135deg, ${INSTAGRAM.primary} 0%, ${INSTAGRAM.secondary} 100%)`,
  background: `linear-gradient(135deg, ${BACKGROUND.primary} 0%, ${BACKGROUND.secondary} 100%)`,
  backgroundAlt: `linear-gradient(135deg, ${BACKGROUND.secondary} 0%, ${BACKGROUND.tertiary} 100%)`
};

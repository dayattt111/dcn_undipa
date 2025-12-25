import { PaletteOptions } from '@mui/material'

// DCN UNDIPA Color Scheme
// Primary: Maroon/Burgundy (#4c0027)
// Secondary: Magenta/Pink (#980f5a)
const paletteBase: Partial<PaletteOptions> = {
  primary: {
    light: '#7a1845',      // Lighter maroon
    main: '#4c0027',       // Main maroon
    dark: '#2d0017',       // Darker maroon
    contrastText: '#ffffff',
  },
  secondary: {
    light: '#c73d7f',      // Lighter magenta
    main: '#980f5a',       // Main magenta
    dark: '#6b0a3f',       // Darker magenta
    contrastText: '#ffffff',
  },
  success: {
    main: '#2e7d32',       // Green for badges/success states
    contrastText: '#ffffff',
  },
  info: {
    main: '#0288d1',
    contrastText: '#ffffff',
  },
  warning: {
    main: '#ed6c02',
    contrastText: '#ffffff',
  },
}

export default paletteBase

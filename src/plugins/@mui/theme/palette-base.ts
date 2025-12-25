import { PaletteOptions } from '@mui/material'

// DCN UNDIPA Color Scheme
// Primary: Magenta (#980f5a) - Warna utama
// Secondary: Maroon/Burgundy (#4c0027) - Warna sekunder
const paletteBase: Partial<PaletteOptions> = {
  primary: {
    light: '#b8336e',      // Lighter magenta
    main: '#980f5a',       // Main magenta (WARNA UTAMA)
    dark: '#4c0027',       // Darker to maroon
    contrastText: '#ffffff',
  },
  secondary: {
    light: '#7a1845',      // Lighter maroon
    main: '#4c0027',       // Main maroon
    dark: '#2d0017',       // Darker maroon
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

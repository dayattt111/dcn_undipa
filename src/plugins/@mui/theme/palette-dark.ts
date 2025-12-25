import { PaletteOptions, alpha } from '@mui/material'
import { grey } from '@mui/material/colors'

const paletteDark: PaletteOptions = {
  mode: 'dark',
  background: {
    default: '#2d0017',        // Deep maroon/magenta dark
    paper: '#4c0027',          // Maroon untuk cards dengan kontras putih
  },
  text: {
    primary: '#ffffff',        // Pure white untuk readability
    secondary: '#f8bbd0',      // Light pink untuk secondary
    disabled: grey[500],
  },
  divider: alpha('#f48fb1', 0.15),  // Light pink divider
}

export default paletteDark

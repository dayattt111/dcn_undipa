import { PaletteOptions, alpha } from '@mui/material'
import { grey } from '@mui/material/colors'

const paletteDark: PaletteOptions = {
  mode: 'dark',
  background: {
    default: '#1a0010',        // Very deep maroon (hampir hitam)
    paper: '#2d0017',          // Deep maroon untuk cards
  },
  text: {
    primary: '#ffffff',        // Pure white untuk readability
    secondary: '#f8bbd0',      // Light pink untuk secondary
    disabled: grey[600],
  },
  divider: alpha('#f48fb1', 0.1),  // Very subtle light pink divider
}

export default paletteDark

import { PaletteOptions, alpha } from '@mui/material'
import { grey } from '@mui/material/colors'

const paletteDark: PaletteOptions = {
  mode: 'dark',
  background: {
    default: '#1a1a1a',        // Deep dark background
    paper: '#242424',          // Slightly lighter for cards
  },
  text: {
    primary: '#f5f5f5',        // Off-white for readability
    secondary: grey[400],
    disabled: grey[600],
  },
  divider: alpha('#980f5a', 0.12),  // Subtle magenta divider
}

export default paletteDark

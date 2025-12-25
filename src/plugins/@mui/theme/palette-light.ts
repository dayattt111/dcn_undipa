import { alpha, PaletteOptions } from '@mui/material'
import { grey, common } from '@mui/material/colors'

const palette: PaletteOptions = {
  mode: 'light',
  background: {
    default: '#fce4ec',        // Soft magenta pink background
    paper: '#ffffff',          // Pure white for cards/contrast
  },
  text: {
    primary: '#4c0027',        // Maroon untuk text utama (kontras tinggi)
    secondary: '#880e4f',      // Dark magenta untuk secondary text
    disabled: grey[400],
  },
  divider: alpha('#980f5a', 0.12),  // Magenta divider
}

export default palette

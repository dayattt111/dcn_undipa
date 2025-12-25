import { alpha, PaletteOptions } from '@mui/material'
import { grey, common } from '@mui/material/colors'

const palette: PaletteOptions = {
  mode: 'light',
  background: {
    default: '#fff5f8',        // Very soft pink white (hampir putih dengan hint magenta)
    paper: '#ffffff',          // Pure white for cards/contrast
  },
  text: {
    primary: '#2d0017',        // Deep maroon untuk text utama
    secondary: '#6b0a3f',      // Medium magenta untuk secondary text
    disabled: grey[400],
  },
  divider: alpha('#980f5a', 0.08),  // Very subtle magenta divider
}

export default palette

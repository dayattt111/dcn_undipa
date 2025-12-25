import { alpha, PaletteOptions } from '@mui/material'
import { grey, common } from '@mui/material/colors'

const palette: PaletteOptions = {
  mode: 'light',
  background: {
    default: '#fafafa',        // Professional off-white
    paper: common.white,        // Pure white for cards
  },
  text: {
    primary: '#1a1a1a',        // Almost black for better contrast
    secondary: grey[700],       // Darker grey for secondary text
    disabled: grey[500],
  },
  divider: alpha('#4c0027', 0.08),  // Subtle maroon divider
}

export default palette

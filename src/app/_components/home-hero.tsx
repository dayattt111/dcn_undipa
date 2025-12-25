'use client'

import React from 'react'

// hooks
import { useTheme } from '@mui/material'

// components
import Box from '@mui/material/Box'
import HomeHeroContent from './home-hero/home-hero-content'
import HomeHeroDecoration from './home-hero/home-hero-decoration'

const HomeHero = () => {
  const { palette } = useTheme()

  return (
    <Box
      id='home-hero'
      sx={{
        width: '100%',
        position: 'relative',
        background: palette.mode === 'dark' 
          ? 'radial-gradient(ellipse at top, #4c0027 0%, #2d0017 50%, #1a0010 100%)'
          : 'radial-gradient(ellipse at top right, #fce4ec 0%, #f8bbd0 35%, #f48fb1 70%, #ec407a 100%)',
        minHeight: '100vh',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: palette.mode === 'dark'
            ? 'linear-gradient(135deg, rgba(152, 15, 90, 0.1) 0%, transparent 50%, rgba(236, 64, 122, 0.05) 100%)'
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, transparent 50%, rgba(152, 15, 90, 0.05) 100%)',
          pointerEvents: 'none',
        },
      }}
    >
      <HomeHeroDecoration />
      <HomeHeroContent />
    </Box>
  )
}

export default HomeHero

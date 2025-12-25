'use client'

import React from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import { AppConfig } from '@/configs'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useTheme } from '@mui/material/styles'

const HomeCTA = () => {
  const { palette } = useTheme()

  return (
    <Box
      id="home-cta"
      component="section"
      sx={{
        width: '100%',
        py: { xs: 8, md: 14 },
        position: 'relative',
        background:
          palette.mode === 'dark'
            ? 'linear-gradient(180deg, #1a0010 0%, #2d0017 100%)'
            : 'linear-gradient(180deg, #ffffff 0%, #fff5f8 100%)',
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Box
            sx={{
              borderRadius: 4,
              overflow: 'hidden',
              position: 'relative',
              background: (theme) =>
                `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              p: { xs: 4, md: 8 },
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background:
                  palette.mode === 'dark'
                    ? 'rgba(0, 0, 0, 0.3)'
                    : 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
              },
            }}
          >
            <Grid container spacing={4} alignItems="center" sx={{ position: 'relative', zIndex: 1 }}>
              <Grid size={{ xs: 12, md: 8 }}>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 900,
                    fontSize: { xs: '1.75rem', md: '2.5rem' },
                    color: 'white',
                    mb: 2,
                  }}
                >
                  Siap Bergabung dengan Kami?
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    lineHeight: 1.8,
                    fontSize: { xs: '1rem', md: '1.25rem' },
                    fontWeight: 400,
                  }}
                >
                  Mulai perjalanan belajarmu bersama {AppConfig.appName}. Dapatkan akses ke program bootcamp,
                  workshop, dan komunitas developer yang supportif.
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Button
                    component={Link}
                    href="/programs"
                    variant="contained"
                    size="large"
                    sx={{
                      py: 1.5,
                      px: 4,
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      borderRadius: 2,
                      bgcolor: 'white',
                      color: 'primary.main',
                      textTransform: 'none',
                      '&:hover': {
                        bgcolor: 'rgba(255, 255, 255, 0.9)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    Lihat Program
                  </Button>
                  <Button
                    component={Link}
                    href="/about"
                    variant="outlined"
                    size="large"
                    sx={{
                      py: 1.5,
                      px: 4,
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      borderRadius: 2,
                      borderColor: 'white',
                      color: 'white',
                      textTransform: 'none',
                      borderWidth: 2,
                      '&:hover': {
                        borderWidth: 2,
                        borderColor: 'white',
                        bgcolor: 'rgba(255, 255, 255, 0.1)',
                        transform: 'translateY(-2px)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    Tentang Kami
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Grid container spacing={3} sx={{ mt: 6 }}>
            {[
              { number: '150+', label: 'Anggota Aktif' },
              { number: '50+', label: 'Program & Event' },
              { number: '80+', label: 'Project Selesai' },
              { number: '20+', label: 'Partner' },
            ].map((stat, index) => (
              <Grid size={{ xs: 6, sm: 3 }} key={index}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 900,
                      color: 'primary.main',
                      mb: 0.5,
                      fontSize: { xs: '2rem', md: '2.5rem' },
                    }}
                  >
                    {stat.number}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: 0.5,
                      fontSize: { xs: '0.75rem', md: '0.875rem' },
                    }}
                  >
                    {stat.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  )
}

export default HomeCTA

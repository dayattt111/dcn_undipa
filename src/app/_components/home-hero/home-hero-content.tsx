'use client'

import React, { memo, useEffect, useState } from 'react'

// components
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { Link } from 'react-scroll'

// assets
import MouseIcon from '@/assets/icons/iconamoon--mouse-light.svg'
import Logo from '@/assets/logo.svg'

// motion
import { motion, AnimatePresence } from 'framer-motion'

// configs
// import { AppConfig } from '@/configs'

const MotionTypography = motion(Typography)

const HomeHeroContent = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const SERVICES_TEXTS = [
    'Belajar Bersama 📚',
    'Berkembang Bersama 🚀',
    'Raih Milestone Bersama 🏆',
    'Bangun Karya Nyata 💻',
    'Komunitas Developer Profesional 👥',
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SERVICES_TEXTS.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [SERVICES_TEXTS.length])

  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 1.5,
      }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: 0.15,
        type: 'spring',
        bounce: 0.15,
      }}
    >
      <Stack
        direction='column'
        sx={{
          position: 'relative',
          minHeight: { xs: 'calc(100vh - 100px)', md: 'calc(100vh - 160px)' },
          py: { xs: 2, md: 4 },
          px: { xs: 2, sm: 3, md: 4 },
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Stack
          direction='row'
          sx={(theme) => ({
            mb: 2,
            transition: theme.transitions.create(['all'], {
              duration: theme.transitions.duration.complex,
            }),
            div: {
              transition: theme.transitions.create(['all'], {
                duration: theme.transitions.duration.complex,
              }),
            },
          })}
        >
          <Box
            sx={() => ({
              width: 24,
              height: 'auto',
              mr: 1.5,
              mt: '2px',
            })}
          >
            <Box component={Logo} />
          </Box>
          <Box>
            <AnimatePresence mode='wait'>
              <MotionTypography
                key={currentIndex}
                variants={{
                  initial: { y: 20 },
                  animate: { y: 0 },
                  exit: { opacity: 0, y: -20 },
                }}
                initial='initial'
                animate='animate'
                exit='exit'
                transition={{
                  duration: 0.25,
                  ease: 'easeInOut',
                }}
                sx={(theme) => ({
                  fontSize: {
                    xs: 17,
                    md: 18,
                  },
                  fontWeight: '600',
                  color: theme.palette.primary.main,
                })}
              >
                {SERVICES_TEXTS[currentIndex]}
              </MotionTypography>
            </AnimatePresence>
          </Box>
        </Stack>
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            component='h1'
            sx={{
              mb: { xs: 1.5, md: 2 },
              fontSize: { xs: 28, sm: 36, md: 44, lg: 56 },
              lineHeight: { xs: 1.2, md: 1.3 },
              fontWeight: '800',
            }}
          >
            Dicoding Community Network
            <br />
            UNDIPA
          </Typography>
          <Typography
            component='p'
            sx={{
              mb: { xs: 3, md: 4 },
              color: 'text.secondary',
              fontWeight: 500,
              lineHeight: { xs: 1.6, md: 1.8 },
              fontSize: {
                xs: 14,
                sm: 15,
                md: 18,
              },
              maxWidth: '680px',
              mx: 'auto',
              px: { xs: 1, sm: 0 },
            }}
          >
            Komunitas developer <strong>UNDIPA</strong> yang belajar dan berkembang bersama melalui{' '}
            <strong>program Dicoding</strong>.
            <br />
            Akses bootcamp, study group, dan raih milestone bersama ratusan developer lainnya.
          </Typography>
          
          {/* CTA Buttons */}
          <Box
            sx={{
              display: 'flex',
              gap: { xs: 1.5, md: 2 },
              justifyContent: 'center',
              flexWrap: 'wrap',
              mb: 2,
              width: '100%',
              maxWidth: '500px',
              mx: 'auto',
            }}
          >
            <Box
              component='a'
              href='#home-contact'
              sx={{
                px: { xs: 3, md: 4 },
                py: { xs: 1.2, md: 1.5 },
                // textAlign: 'center',
                backgroundColor: 'primary.main',
                color: 'primary.contrastText',
                borderRadius: 2,
                fontWeight: 600,
                fontSize: { xs: 14, md: 15 },
                textDecoration: 'none',
                textAlign: 'center',
                flex: { xs: '1 1 auto', sm: '0 1 auto' },
                minWidth: { xs: '140px', sm: 'auto' },
                transition: 'all 0.3s',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                  transform: 'translateY(-2px)',
                  boxShadow: 3,
                },
              }}
            >
              Gabung Komunitas
            </Box>
            <Box
              component='a'
              href='/leaderboard'
              sx={{
                px: { xs: 3, md: 4 },
                py: { xs: 1.2, md: 1.5 },
                border: 2,
                borderColor: 'primary.main',
                color: 'primary.main',
                borderRadius: 2,
                fontWeight: 600,
                fontSize: { xs: 14, md: 15 },
                textDecoration: 'none',
                textAlign: 'center',
                flex: { xs: '1 1 auto', sm: '0 1 auto' },
                minWidth: { xs: '140px', sm: 'auto' },
                transition: 'all 0.3s',
                '&:hover': {
                  backgroundColor: 'primary.main',
                  color: 'primary.contrastText',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              Lihat Leaderboard
            </Box>
          </Box>
          
          {/* Quick Stats */}
          <Box
            sx={{
              display: 'flex',
              gap: { xs: 3, sm: 4, md: 5 },
              justifyContent: 'center',
              flexWrap: 'wrap',
              mt: { xs: 3, md: 4 },
              px: { xs: 2, sm: 0 },
              opacity: 0.85,
            }}
          >
            <Box sx={{ textAlign: 'center', minWidth: { xs: '80px', sm: 'auto' } }}>
              <Typography
                sx={{
                  fontSize: { xs: 28, sm: 32, md: 36 },
                  fontWeight: 800,
                  color: 'primary.main',
                  lineHeight: 1,
                }}
              >
                150+
              </Typography>
              <Typography sx={{ fontSize: { xs: 12, md: 13 }, color: 'text.secondary', mt: 0.5 }}>
                Members
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center', minWidth: { xs: '80px', sm: 'auto' } }}>
              <Typography
                sx={{
                  fontSize: { xs: 28, sm: 32, md: 36 },
                  fontWeight: 800,
                  color: 'primary.main',
                  lineHeight: 1,
                }}
              >
                520+
              </Typography>
              <Typography sx={{ fontSize: { xs: 12, md: 13 }, color: 'text.secondary', mt: 0.5 }}>
                Kelas Selesai
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center', minWidth: { xs: '80px', sm: 'auto' } }}>
              <Typography
                sx={{
                  fontSize: { xs: 28, sm: 32, md: 36 },
                  fontWeight: 800,
                  color: 'primary.main',
                  lineHeight: 1,
                }}
              >
                24+
              </Typography>
              <Typography sx={{ fontSize: { xs: 12, md: 13 }, color: 'text.secondary', mt: 0.5 }}>
                Event
              </Typography>
            </Box>
          </Box>
        </Box>
        <motion.div
          initial={{
            opacity: 0,
            y: 200,
          }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.5,
            type: 'spring',
            bounce: 0,
          }}
        >
          <Box
            sx={{
              mt: { xs: 4, md: '80px' },
              mb: { xs: -8, md: '-80px' },
              textAlign: 'center',
              display: { xs: 'none', md: 'block' },
            }}
          >
            <Link
              to='home-about'
              offset={0}
              spy={true}
              smooth={true}
              duration={400}
              style={{ display: 'block' }}
            >
              <Box
                component={MouseIcon}
                height={50}
                width={50}
                sx={(theme) => ({
                  color: theme.palette.text.secondary,
                })}
              />
              <Typography
                sx={{
                  color: 'text.disabled',
                  fontWeight: '500',
                  fontSize: 12,
                  mt: 1.2,
                }}
              >
                Scroll for more
              </Typography>
            </Link>
          </Box>
        </motion.div>
      </Stack>
    </motion.div>
  )
}

export default memo(HomeHeroContent)

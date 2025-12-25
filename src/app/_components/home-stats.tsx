'use client'

import React from 'react'

// components
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { SectionTitle } from '@/components/core'

// hooks
import { useTheme } from '@mui/material/styles'

// constants
import { communityStats } from '@/constants/community'

// motion
import { motion } from 'framer-motion'

interface StatItemProps {
  value: number
  label: string
  suffix?: string
  delay?: number
}

const StatItem = ({ value, label, suffix = '+', delay = 0 }: StatItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, delay }}
    >
      <Box
        sx={{
          textAlign: 'center',
          p: 4,
          borderRadius: 3,
          backgroundColor: 'background.paper',
          transition: 'all 0.3s',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: 4,
          },
        }}
      >
        <Typography
          component='div'
          sx={{
            fontSize: { xs: 42, md: 56 },
            fontWeight: 800,
            color: 'primary.main',
            mb: 1,
            lineHeight: 1,
          }}
        >
          {value}
          {suffix}
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: 15, md: 17 },
            fontWeight: 600,
            color: 'text.secondary',
            textTransform: 'uppercase',
            letterSpacing: 1,
          }}
        >
          {label}
        </Typography>
      </Box>
    </motion.div>
  )
}

const HomeStats = () => {
  const { palette } = useTheme()

  return (
    <Box
      component='section'
      id='home-stats'
      sx={{
        width: '100%',
        py: { xs: 8, md: 14 },
        backgroundColor: palette.mode === 'dark' ? 'background.default' : '#f8fafc',
      }}
    >
      <Container>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <SectionTitle>MILESTONE KOMUNITAS</SectionTitle>
          <Typography
            component='h2'
            variant='h2'
            sx={{
              fontSize: { xs: 28, md: 40 },
              fontWeight: 700,
              mb: 2,
            }}
          >
            Pencapaian Bersama
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: 16, md: 18 },
              color: 'text.secondary',
              maxWidth: 600,
              mx: 'auto',
            }}
          >
            Bersama mencapai milestone dan membangun skill development yang solid
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatItem
              value={communityStats.totalMembers}
              label='Members'
              delay={0.1}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatItem
              value={communityStats.totalClassesCompleted}
              label='Kelas Selesai'
              delay={0.2}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatItem
              value={communityStats.totalEvents}
              label='Event'
              delay={0.3}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatItem
              value={communityStats.activeLearners}
              label='Active Learners'
              delay={0.4}
            />
          </Grid>
        </Grid>

        {/* CTA to Leaderboard */}
        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Box
            component='a'
            href='/leaderboard'
            sx={{
              display: 'inline-block',
              px: 4,
              py: 1.5,
              backgroundColor: 'primary.main',
              color: 'primary.contrastText',
              borderRadius: 2,
              fontWeight: 600,
              fontSize: 15,
              textDecoration: 'none',
              transition: 'all 0.3s',
              '&:hover': {
                backgroundColor: 'primary.dark',
                transform: 'translateY(-2px)',
                boxShadow: 3,
              },
            }}
          >
            Lihat Leaderboard Lengkap →
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default HomeStats

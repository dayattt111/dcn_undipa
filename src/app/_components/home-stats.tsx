'use client'

import React, { useState, useEffect } from 'react'

// components
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Skeleton from '@mui/material/Skeleton'
import { SectionTitle } from '@/components/core'

// hooks
import { useTheme } from '@mui/material/styles'

// firebase
import { getStats } from '@/lib/firebase/community'
import type { ICommunityStats } from '@/types/community'

// motion
import { motion } from 'framer-motion'

interface StatItemProps {
  value: number
  label: string
  suffix?: string
  delay?: number
}

const StatItem = ({ value, label, suffix = '+', delay = 0 }: StatItemProps) => {
  const { palette } = useTheme()
  
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
          p: { xs: 3, sm: 4 },
          borderRadius: 3,
          background: palette.mode === 'dark'
            ? 'linear-gradient(135deg, rgba(45, 0, 23, 0.8) 0%, rgba(76, 0, 39, 0.6) 100%)'
            : 'linear-gradient(135deg, #ffffff 0%, rgba(248, 187, 208, 0.15) 100%)',
          backdropFilter: 'blur(10px)',
          border: `1px solid ${palette.mode === 'dark' ? 'rgba(152, 15, 90, 0.2)' : 'rgba(152, 15, 90, 0.08)'}`,
          transition: 'all 0.3s',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: palette.mode === 'dark'
              ? '0 12px 40px rgba(152, 15, 90, 0.4)'
              : '0 12px 40px rgba(152, 15, 90, 0.15)',
            borderColor: palette.mode === 'dark' ? 'rgba(152, 15, 90, 0.5)' : 'rgba(152, 15, 90, 0.2)',
          },
        }}
      >
        <Typography
          component='div'
          sx={{
            fontSize: { xs: 36, sm: 42, md: 56 },
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
            fontSize: { xs: 13, sm: 15, md: 17 },
            fontWeight: 600,
            color: 'text.secondary',
            textTransform: 'uppercase',
            letterSpacing: { xs: 0.5, md: 1 },
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
  const [stats, setStats] = useState<ICommunityStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getStats()
        setStats(data)
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  return (
    <Box
      component='section'
      id='home-stats'
      sx={{
        width: '100%',
        py: { xs: 8, md: 14 },
        position: 'relative',
        background: palette.mode === 'dark' 
          ? 'linear-gradient(180deg, #1a0010 0%, #2d0017 50%, #1a0010 100%)'
          : 'linear-gradient(180deg, #ffffff 0%, #fff5f8 30%, #fce4ec 70%, #fff5f8 100%)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: '10%',
          width: '80%',
          height: '100%',
          background: palette.mode === 'dark'
            ? 'radial-gradient(ellipse at center, rgba(152, 15, 90, 0.15) 0%, transparent 70%)'
            : 'radial-gradient(ellipse at center, rgba(248, 187, 208, 0.4) 0%, transparent 70%)',
          pointerEvents: 'none',
        },
      }}
    >
      <Container>
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
          <SectionTitle>MILESTONE KOMUNITAS</SectionTitle>
          <Typography
            component='h2'
            variant='h2'
            sx={{
              fontSize: { xs: 24, sm: 28, md: 40 },
              fontWeight: 700,
              mb: 2,
            }}
          >
            Pencapaian Bersama
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: 14, sm: 16, md: 18 },
              color: 'text.secondary',
              maxWidth: 600,
              mx: 'auto',
              px: { xs: 2, sm: 0 },
            }}
          >
            Bersama mencapai milestone dan membangun skill development yang solid
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {loading ? (
            // Loading skeletons
            Array.from({ length: 4 }).map((_, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                <Box
                  sx={{
                    textAlign: 'center',
                    p: { xs: 3, sm: 4 },
                    borderRadius: 3,
                    backgroundColor: 'background.paper',
                    border: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  <Skeleton variant="text" width="60%" height={56} sx={{ mx: 'auto', mb: 1 }} />
                  <Skeleton variant="text" width="80%" height={24} sx={{ mx: 'auto' }} />
                </Box>
              </Grid>
            ))
          ) : stats ? (
            <>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <StatItem
                  value={stats.totalMembers}
                  label='Members'
                  delay={0.1}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <StatItem
                  value={stats.totalClassesCompleted}
                  label='Classes Completed'
                  delay={0.2}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <StatItem
                  value={stats.totalEvents}
                  label='Events'
                  delay={0.3}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <StatItem
                  value={stats.activeLearners}
                  label='Active Learners'
                  delay={0.4}
                />
              </Grid>
            </>
          ) : (
            <Grid size={{ xs: 12 }}>
              <Typography textAlign="center" color="text.secondary">
                Data statistik tidak tersedia
              </Typography>
            </Grid>
          )}
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

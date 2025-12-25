'use client'

import React, { useState, useEffect } from 'react'

// components
import Image from 'next/image'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Skeleton from '@mui/material/Skeleton'
import { SectionTitle } from '@/components/core'
import { styled, useMediaQuery, useTheme } from '@mui/material'

// firebase
import { getStats } from '@/lib/firebase/community'
import type { ICommunityStats } from '@/types/community'

const HomeOurMotivation = () => {
  const { breakpoints } = useTheme()
  const matchMobile = useMediaQuery(breakpoints.down('sm'))
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

  const CONTENT = stats
    ? [
        {
          value: `${stats.totalMembers}+`,
          description: 'Anggota Komunitas',
          image: '/images/medal.png',
        },
        {
          value: `${stats.totalClassesCompleted}+`,
          description: 'Kelas Diselesaikan',
          image: '/images/smile.png',
        },
        {
          value: `${stats.totalEvents}+`,
          description: 'Event Terlaksana',
          image: '/images/success.png',
        },
      ]
    : []

  return (
    <Box
      id='home-motivation'
      sx={{
        pt: { xs: 8, md: 2 },
        pb: { xs: 8, md: 16, lg: 20 },
        width: '100%',
        backgroundColor: 'background.paper',
      }}
    >
      <Container>
        <Grid container spacing={6}>
          <Grid size={{ xs: 12, md: 4 }} sx={{ pr: 4 }}>
            <Box>
              <SectionTitle>WE WORK HARD, WE PLAY HARD</SectionTitle>
              <Typography
                variant='h1'
                sx={{
                  fontSize: { xs: 20, md: 26, lg: 32 },
                  mb: 3,
                  lineHeight: 1.4,
                }}
              >
                We are motivated by a desire to achieve.
              </Typography>
              <Typography
                sx={{
                  color: 'text.secondary',
                  fontSize: { xs: 14, md: 17 },
                  lineHeight: 1.8,
                }}
              >
                We enjoy finding simple solutions for complex challenges.
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Grid container spacing={matchMobile ? 2 : 3}>
                {loading ? (
                  // Loading skeletons
                  Array.from({ length: 3 }).map((_, index) => (
                    <Grid key={index} size={{ xs: 6, md: 4 }}>
                      <StyledBox>
                        <Skeleton variant="text" width="60%" height={48} sx={{ mb: 2 }} />
                        <Skeleton variant="rectangular" width={80} height={80} sx={{ borderRadius: 2, mb: 2 }} />
                        <Skeleton variant="text" width="80%" />
                      </StyledBox>
                    </Grid>
                  ))
                ) : CONTENT.length > 0 ? (
                  CONTENT.map((item, index) => (
                    <Grid key={String(index)} size={{ xs: 6, md: 4 }}>
                      <StyledBox>
                        <StyledTitle variant='h2' sx={{ fontWeight: '800' }}>
                          {item.value}
                        </StyledTitle>
                        <StyledIcon>
                          <Image
                            src={item.image}
                            width={80}
                            height={80}
                            alt={item.description}
                          />
                        </StyledIcon>
                        <Divider sx={{ width: 36, my: 2 }} />
                        <Box>
                          <Typography>{item.description}</Typography>
                        </Box>
                      </StyledBox>
                    </Grid>
                  ))
                ) : (
                  <Grid size={{ xs: 12 }}>
                    <Typography textAlign="center" color="text.secondary">
                      Data statistik tidak tersedia
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

const StyledBox = styled('div')(({ theme }) => ({
  padding: '14px 20px',
  '@media screen and (min-width: 600px)': {
    padding: '28px 32px',
  },
  boxShadow: theme.shadows[2],
  borderRadius: Number(theme.shape.borderRadius) * 2,
  backgroundColor: theme.palette.mode === 'dark' ? '#090e22' : '#D1E7FE',
  transition: theme.transitions.create(['background-color', 'transform'], {
    duration: 250,
  }),
  position: 'relative',
  '&:hover': {
    color: '#fbfbfb',
    backgroundColor:
      theme.palette.mode === 'dark' ? '#000' : theme.palette.primary.main,
    transform: 'translateY(-5px)',
  },
}))

const StyledTitle = styled(Typography)(({ theme }) => ({
  fontSize: 36,
  marginBottom: theme.spacing(4),
}))

const StyledIcon = styled(Typography)(({}) => ({
  width: 72,
  height: 'auto',
}))

export default HomeOurMotivation

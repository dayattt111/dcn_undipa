'use client'

import React from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import { motion } from 'framer-motion'
import { useTheme } from '@mui/material/styles'

interface LeaderboardUser {
  rank: number
  name: string
  avatar?: string
  points: number
  badges: number
  completedCourses: number
}

const HomeLeaderboard = () => {
  const { palette } = useTheme()

  // Sample leaderboard data - replace with real data later
  const topUsers: LeaderboardUser[] = [
    {
      rank: 1,
      name: 'Ahmad Rizki',
      avatar: '/avatars/user-1.jpg',
      points: 2850,
      badges: 15,
      completedCourses: 12,
    },
    {
      rank: 2,
      name: 'Siti Nurhaliza',
      avatar: '/avatars/user-2.jpg',
      points: 2640,
      badges: 13,
      completedCourses: 10,
    },
    {
      rank: 3,
      name: 'Budi Santoso',
      avatar: '/avatars/user-3.jpg',
      points: 2480,
      badges: 12,
      completedCourses: 9,
    },
    {
      rank: 4,
      name: 'Dewi Lestari',
      points: 2320,
      badges: 11,
      completedCourses: 8,
    },
    {
      rank: 5,
      name: 'Eko Prasetyo',
      points: 2150,
      badges: 10,
      completedCourses: 8,
    },
  ]

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return {
          bg: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
          text: '#000',
          shadow: 'rgba(255, 215, 0, 0.4)',
        }
      case 2:
        return {
          bg: 'linear-gradient(135deg, #C0C0C0 0%, #808080 100%)',
          text: '#000',
          shadow: 'rgba(192, 192, 192, 0.4)',
        }
      case 3:
        return {
          bg: 'linear-gradient(135deg, #CD7F32 0%, #8B4513 100%)',
          text: '#fff',
          shadow: 'rgba(205, 127, 50, 0.4)',
        }
      default:
        return {
          bg: palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(152, 15, 90, 0.05)',
          text: 'text.primary',
          shadow: 'rgba(152, 15, 90, 0.1)',
        }
    }
  }

  return (
    <Box
      component="section"
      id="home-leaderboard"
      sx={{
        width: '100%',
        py: { xs: 8, md: 14 },
        position: 'relative',
        background:
          palette.mode === 'dark'
            ? 'linear-gradient(180deg, #1a0010 0%, #2d0017 100%)'
            : 'linear-gradient(180deg, #fafafa 0%, #ffffff 100%)',
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant="overline"
              sx={{
                color: 'primary.main',
                fontWeight: 700,
                letterSpacing: 2,
                mb: 2,
                display: 'block',
              }}
            >
              Leaderboard
            </Typography>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 900,
                fontSize: { xs: '2rem', md: '2.5rem' },
                mb: 2,
              }}
            >
              Top Contributors Dicoding
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ maxWidth: 700, mx: 'auto', fontSize: { xs: '1rem', md: '1.1rem' } }}
            >
              Anggota dengan poin tertinggi dari program dan kelas Dicoding
            </Typography>
          </Box>
        </motion.div>

        <Grid container spacing={3}>
          {topUsers.map((user, index) => {
            const rankStyle = getRankColor(user.rank)
            return (
              <Grid size={{ xs: 12, sm: 6, md: user.rank <= 3 ? 4 : 6 }} key={user.rank}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Box
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      border: user.rank <= 3 ? '2px solid' : '1px solid',
                      borderColor: user.rank <= 3 ? `${rankStyle.shadow}` : 'divider',
                      background:
                        palette.mode === 'dark'
                          ? 'rgba(255, 255, 255, 0.02)'
                          : 'rgba(255, 255, 255, 0.9)',
                      backdropFilter: 'blur(10px)',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      overflow: 'hidden',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: `0 12px 24px ${rankStyle.shadow}`,
                        borderColor: user.rank <= 3 ? rankStyle.shadow : 'primary.main',
                      },
                      '&::before':
                        user.rank <= 3
                          ? {
                              content: '""',
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              right: 0,
                              height: '4px',
                              background: rankStyle.bg,
                            }
                          : {},
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2.5 }}>
                      {/* Rank Badge */}
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: '50%',
                          background: rankStyle.bg,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          boxShadow: user.rank <= 3 ? `0 4px 12px ${rankStyle.shadow}` : 'none',
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: 900,
                            fontSize: '1.25rem',
                            color: rankStyle.text,
                          }}
                        >
                          #{user.rank}
                        </Typography>
                      </Box>

                      {/* Avatar */}
                      <Avatar
                        src={user.avatar}
                        alt={user.name}
                        sx={{
                          width: 56,
                          height: 56,
                          border: '3px solid',
                          borderColor: user.rank <= 3 ? 'transparent' : 'divider',
                          background: user.rank <= 3 ? rankStyle.bg : 'primary.main',
                          fontSize: '1.5rem',
                          fontWeight: 700,
                        }}
                      >
                        {user.name.charAt(0)}
                      </Avatar>

                      {/* Name & Points */}
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 700,
                            fontSize: { xs: '1.1rem', md: '1.25rem' },
                            mb: 0.5,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {user.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: 'primary.main',
                            fontWeight: 700,
                            fontSize: '1rem',
                          }}
                        >
                          {user.points.toLocaleString()} poin
                        </Typography>
                      </Box>
                    </Box>

                    {/* Stats */}
                    <Box
                      sx={{
                        display: 'flex',
                        gap: 3,
                        pt: 2.5,
                        borderTop: '1px solid',
                        borderColor: 'divider',
                      }}
                    >
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ fontSize: '0.75rem', mb: 0.5, fontWeight: 600 }}
                        >
                          Badges
                        </Typography>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 800,
                            fontSize: '1.25rem',
                            color: 'text.primary',
                          }}
                        >
                          {user.badges}
                        </Typography>
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ fontSize: '0.75rem', mb: 0.5, fontWeight: 600 }}
                        >
                          Courses
                        </Typography>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 800,
                            fontSize: '1.25rem',
                            color: 'text.primary',
                          }}
                        >
                          {user.completedCourses}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </motion.div>
              </Grid>
            )
          })}
        </Grid>

        {/* Achievement Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Box
            sx={{
              mt: 6,
              p: 4,
              borderRadius: 3,
              textAlign: 'center',
              background:
                palette.mode === 'dark'
                  ? 'linear-gradient(135deg, rgba(152, 15, 90, 0.1) 0%, rgba(76, 0, 39, 0.1) 100%)'
                  : 'linear-gradient(135deg, rgba(152, 15, 90, 0.05) 0%, rgba(76, 0, 39, 0.05) 100%)',
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography
              variant="h6"
              fontWeight={700}
              gutterBottom
              sx={{ fontSize: { xs: '1.1rem', md: '1.25rem' } }}
            >
              Raih Posisi Teratas!
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
              Ikuti kelas Dicoding, selesaikan challenge, dan kumpulkan poin untuk masuk ke leaderboard
            </Typography>
          </Box>
        </motion.div>
      </Container>
    </Box>
  )
}

export default HomeLeaderboard

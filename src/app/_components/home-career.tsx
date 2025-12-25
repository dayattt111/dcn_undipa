'use client'

import React from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useTheme } from '@mui/material/styles'
import { jobPostings } from '@/constants/career'

const HomeCareer = () => {
  const { palette } = useTheme()
  const featuredJobs = jobPostings.filter((j) => j.featured && j.status === 'active').slice(0, 3)

  const getWorkTypeColor = (type: string) => {
    switch (type) {
      case 'remote':
        return '#10b981'
      case 'onsite':
        return '#3b82f6'
      case 'hybrid':
        return '#8b5cf6'
      default:
        return '#6b7280'
    }
  }

  const getWorkTypeLabel = (type: string) => {
    switch (type) {
      case 'remote':
        return 'Remote'
      case 'onsite':
        return 'On-site'
      case 'hybrid':
        return 'Hybrid'
      default:
        return type
    }
  }

  return (
    <Box
      component="section"
      id="home-career"
      sx={{
        width: '100%',
        py: { xs: 8, md: 14 },
        position: 'relative',
        background:
          palette.mode === 'dark'
            ? 'linear-gradient(180deg, #2d0017 0%, #1a0010 100%)'
            : 'linear-gradient(180deg, #fff5f8 0%, #fafafa 100%)',
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
              Career
            </Typography>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 900,
                fontSize: { xs: '2rem', md: '2.5rem' },
                mb: 2,
              }}
            >
              Peluang Karir Terbaru
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ maxWidth: 600, mx: 'auto' }}
            >
              Temukan lowongan pekerjaan di bidang teknologi yang sesuai dengan keahlianmu
            </Typography>
          </Box>
        </motion.div>

        <Grid container spacing={3}>
          {featuredJobs.map((job, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={job.id}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Paper
                  component={Link}
                  href={`/career/${job.slug}`}
                  elevation={0}
                  sx={{
                    display: 'block',
                    textDecoration: 'none',
                    p: 3,
                    borderRadius: 3,
                    border: '1px solid',
                    borderColor: 'divider',
                    background:
                      palette.mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.02)'
                        : 'rgba(255, 255, 255, 0.9)',
                    transition: 'all 0.3s ease',
                    height: '100%',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 24px rgba(152, 15, 90, 0.2)',
                      borderColor: 'primary.main',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
                    {job.companyLogo && (
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: 2,
                          border: '1px solid',
                          borderColor: 'divider',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '24px',
                          flexShrink: 0,
                        }}
                      >
                        {job.companyLogo}
                      </Box>
                    )}
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography variant="h6" fontWeight={700} gutterBottom noWrap>
                        {job.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" noWrap>
                        {job.company}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    <Box
                      sx={{
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 1,
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        bgcolor: getWorkTypeColor(job.workType),
                        color: 'white',
                      }}
                    >
                      {getWorkTypeLabel(job.workType)}
                    </Box>
                    <Box
                      sx={{
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 1,
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        border: '1px solid',
                        borderColor: 'divider',
                        color: 'text.secondary',
                      }}
                    >
                      {job.location}
                    </Box>
                  </Box>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: 2,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      minHeight: 40,
                    }}
                  >
                    {job.description}
                  </Typography>

                  {job.salaryRange && (
                    <Typography variant="body2" color="primary" fontWeight={700}>
                      {job.salaryRange}
                    </Typography>
                  )}
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Box sx={{ textAlign: 'center', mt: 6 }}>
            <Button
              component={Link}
              href="/career"
              variant="outlined"
              size="large"
              sx={{
                borderRadius: 2,
                px: 4,
                py: 1.5,
                fontWeight: 700,
                borderWidth: 2,
                '&:hover': {
                  borderWidth: 2,
                  transform: 'translateY(-2px)',
                },
              }}
            >
              Lihat Semua Lowongan
            </Button>
          </Box>
        </motion.div>
      </Container>
    </Box>
  )
}

export default HomeCareer

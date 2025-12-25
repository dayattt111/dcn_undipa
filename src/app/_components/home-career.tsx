'use client'

import React from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
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
              sx={{ maxWidth: 700, mx: 'auto', fontSize: { xs: '1rem', md: '1.1rem' } }}
            >
              Temukan lowongan pekerjaan di bidang teknologi yang sesuai dengan keahlianmu
            </Typography>
          </Box>
        </motion.div>

        <Grid container spacing={3}>
          {featuredJobs.map((job, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={job.id}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Box
                  component={Link}
                  href={`/career/${job.slug}`}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    textDecoration: 'none',
                    p: 3,
                    borderRadius: 3,
                    border: '1px solid',
                    borderColor: 'divider',
                    background:
                      palette.mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.02)'
                        : 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease',
                    height: '100%',
                    minHeight: 280,
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 24px rgba(152, 15, 90, 0.2)',
                      borderColor: 'primary.main',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2.5 }}>
                    {job.companyLogo && (
                      <Box
                        sx={{
                          width: 56,
                          height: 56,
                          borderRadius: 2,
                          border: '1px solid',
                          borderColor: 'divider',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '28px',
                          flexShrink: 0,
                          background: palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'white',
                        }}
                      >
                        {job.companyLogo}
                      </Box>
                    )}
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          mb: 0.5,
                          fontSize: { xs: '1.1rem', md: '1.25rem' },
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          color: 'text.primary',
                        }}
                      >
                        {job.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                          fontWeight: 600,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {job.company}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2.5 }}>
                    <Box
                      sx={{
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 1.5,
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        bgcolor: getWorkTypeColor(job.workType),
                        color: 'white',
                        textTransform: 'capitalize',
                      }}
                    >
                      {getWorkTypeLabel(job.workType)}
                    </Box>
                    <Box
                      sx={{
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 1.5,
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
                      mb: 2.5,
                      lineHeight: 1.7,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      flex: 1,
                    }}
                  >
                    {job.description}
                  </Typography>

                  {job.salaryRange && (
                    <Box
                      sx={{
                        pt: 2,
                        borderTop: '1px solid',
                        borderColor: 'divider',
                        mt: 'auto',
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'primary.main',
                          fontWeight: 700,
                          fontSize: '0.95rem',
                        }}
                      >
                        {job.salaryRange}
                      </Typography>
                    </Box>
                  )}
                </Box>
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

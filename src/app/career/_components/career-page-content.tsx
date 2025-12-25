'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import { useTheme } from '@mui/material/styles'
import { motion } from 'framer-motion'

import { jobPostings } from '@/constants/career'
import { IJobPosting, WorkTypeFilter } from '@/types/career'

const workTypeLabels: Record<WorkTypeFilter, string> = {
  all: 'Semua',
  remote: 'Remote',
  onsite: 'On-site',
  hybrid: 'Hybrid',
}

const employmentTypeLabels: Record<IJobPosting['employmentType'], string> = {
  'full-time': 'Full-time',
  'part-time': 'Part-time',
  contract: 'Contract',
  internship: 'Internship',
}

const workTypeColors: Record<IJobPosting['workType'], string> = {
  remote: '#10b981',
  onsite: '#3b82f6',
  hybrid: '#8b5cf6',
}

const JobCard = ({ job }: { job: IJobPosting }) => {
  const theme = useTheme()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card
        component='a'
        href={`/career/${job.slug}`}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 3,
          transition: 'all 0.3s ease',
          border: '1px solid',
          borderColor: 'divider',
          textDecoration: 'none',
          cursor: 'pointer',
          position: 'relative',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow:
              theme.palette.mode === 'dark'
                ? '0 12px 40px rgba(152, 15, 90, 0.25)'
                : '0 12px 40px rgba(152, 15, 90, 0.15)',
          },
        }}
      >
        {job.featured && (
          <Box
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              zIndex: 1,
            }}
          >
            <Chip
              label='Featured'
              size='small'
              sx={{
                fontWeight: 600,
                backgroundColor: 'primary.main',
                color: 'primary.contrastText',
              }}
            />
          </Box>
        )}

        <CardContent sx={{ flexGrow: 1, p: 3 }}>
          {/* Company Logo & Name */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            {job.companyLogo && (
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 2,
                  backgroundColor: 'background.default',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  p: 1,
                }}
              >
                <Image
                  src={job.companyLogo}
                  alt={job.company}
                  width={40}
                  height={40}
                  style={{ objectFit: 'contain' }}
                />
              </Box>
            )}
            <Box>
              <Typography variant='body2' fontWeight={600} color='text.primary'>
                {job.company}
              </Typography>
              <Typography variant='caption' color='text.secondary'>
                📍 {job.location}
              </Typography>
            </Box>
          </Box>

          {/* Job Title */}
          <Typography
            variant='h6'
            component='h3'
            sx={{
              mb: 2,
              fontWeight: 700,
              fontSize: { xs: 18, md: 20 },
              lineHeight: 1.3,
            }}
          >
            {job.title}
          </Typography>

          {/* Description */}
          <Typography
            variant='body2'
            color='text.secondary'
            sx={{
              mb: 2,
              lineHeight: 1.6,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {job.description}
          </Typography>

          {/* Tags */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            <Chip
              label={workTypeLabels[job.workType]}
              size='small'
              sx={{
                backgroundColor: `${workTypeColors[job.workType]}20`,
                color: workTypeColors[job.workType],
                fontWeight: 600,
                fontSize: 11,
              }}
            />
            <Chip
              label={employmentTypeLabels[job.employmentType]}
              size='small'
              variant='outlined'
              sx={{ fontSize: 11 }}
            />
            {job.experience && (
              <Chip label={job.experience} size='small' variant='outlined' sx={{ fontSize: 11 }} />
            )}
          </Box>

          {/* Skills */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 3 }}>
            {job.skills.slice(0, 4).map((skill) => (
              <Chip
                key={skill}
                label={skill}
                size='small'
                sx={{
                  fontSize: 10,
                  height: 24,
                  backgroundColor:
                    theme.palette.mode === 'dark'
                      ? 'rgba(152, 15, 90, 0.1)'
                      : 'rgba(152, 15, 90, 0.05)',
                  color: 'text.secondary',
                }}
              />
            ))}
            {job.skills.length > 4 && (
              <Chip
                label={`+${job.skills.length - 4}`}
                size='small'
                sx={{
                  fontSize: 10,
                  height: 24,
                  color: 'text.secondary',
                }}
              />
            )}
          </Box>

          {/* Salary & Posted Date */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              pt: 2,
              borderTop: '1px solid',
              borderColor: 'divider',
            }}
          >
            {job.salaryRange && (
              <Typography variant='body2' fontWeight={600} color='primary.main'>
                💰 {job.salaryRange}
              </Typography>
            )}
            <Typography variant='caption' color='text.secondary'>
              {new Date(job.postedDate).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'short',
              })}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function CareerPageContent() {
  const theme = useTheme()
  const [selectedWorkType, setSelectedWorkType] = useState<WorkTypeFilter>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredJobs = jobPostings
    .filter((job) => job.status === 'active')
    .filter((job) => (selectedWorkType === 'all' ? true : job.workType === selectedWorkType))
    .filter(
      (job) =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()))
    )

  const handleWorkTypeChange = (_event: React.SyntheticEvent, newValue: WorkTypeFilter) => {
    setSelectedWorkType(newValue)
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        pt: { xs: 10, md: 12 },
        pb: { xs: 8, md: 12 },
        background:
          theme.palette.mode === 'dark'
            ? 'radial-gradient(ellipse at top, rgba(152, 15, 90, 0.15) 0%, transparent 50%), radial-gradient(ellipse at bottom, rgba(76, 0, 39, 0.1) 0%, transparent 50%)'
            : 'radial-gradient(ellipse at top, rgba(152, 15, 90, 0.08) 0%, transparent 50%), radial-gradient(ellipse at bottom, rgba(152, 15, 90, 0.05) 0%, transparent 50%)',
      }}
    >
      <Container maxWidth='lg'>
        {/* Header Section */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Chip
              label='LOWONGAN KERJA'
              sx={{
                mb: 3,
                px: 2,
                py: 0.5,
                backgroundColor:
                  theme.palette.mode === 'dark'
                    ? 'rgba(152, 15, 90, 0.2)'
                    : 'rgba(152, 15, 90, 0.1)',
                color: 'primary.main',
                fontWeight: 700,
                fontSize: 12,
                letterSpacing: 1,
              }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Typography
              variant='h1'
              sx={{
                fontSize: { xs: 32, sm: 40, md: 48 },
                fontWeight: 800,
                mb: 2,
                background:
                  theme.palette.mode === 'dark'
                    ? 'linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%)'
                    : 'linear-gradient(135deg, #980f5a 0%, #4c0027 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Temukan Karirmu
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Typography
              variant='h6'
              color='text.secondary'
              sx={{
                maxWidth: 700,
                mx: 'auto',
                lineHeight: 1.7,
                fontSize: { xs: 16, md: 18 },
                mb: 4,
              }}
            >
              Jelajahi lowongan pekerjaan terbaru di bidang teknologi untuk alumni dan anggota
              komunitas DCN UNDIPA.
            </Typography>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <TextField
              fullWidth
              placeholder='Cari berdasarkan posisi, perusahaan, lokasi, atau skill...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{
                maxWidth: 600,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  backgroundColor: 'background.paper',
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Typography>🔍</Typography>
                  </InputAdornment>
                ),
              }}
            />
          </motion.div>
        </Box>

        {/* Work Type Filter Tabs */}
        <Box sx={{ mb: 6, display: 'flex', justifyContent: 'center' }}>
          <Tabs
            value={selectedWorkType}
            onChange={handleWorkTypeChange}
            variant='scrollable'
            scrollButtons='auto'
            sx={{
              '& .MuiTabs-indicator': {
                backgroundColor: 'primary.main',
                height: 3,
                borderRadius: 1.5,
              },
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 600,
                fontSize: { xs: 13, md: 15 },
                minHeight: 48,
                '&.Mui-selected': {
                  color: 'primary.main',
                },
              },
            }}
          >
            <Tab label={`${workTypeLabels.all} (${jobPostings.filter(j => j.status === 'active').length})`} value='all' />
            <Tab
              label={`${workTypeLabels.remote} (${jobPostings.filter(j => j.workType === 'remote' && j.status === 'active').length})`}
              value='remote'
            />
            <Tab
              label={`${workTypeLabels.onsite} (${jobPostings.filter(j => j.workType === 'onsite' && j.status === 'active').length})`}
              value='onsite'
            />
            <Tab
              label={`${workTypeLabels.hybrid} (${jobPostings.filter(j => j.workType === 'hybrid' && j.status === 'active').length})`}
              value='hybrid'
            />
          </Tabs>
        </Box>

        {/* Jobs Grid */}
        <Grid container spacing={3}>
          {filteredJobs.map((job) => (
            <Grid size={{ xs: 12, md: 6 }} key={job.id}>
              <JobCard job={job} />
            </Grid>
          ))}
        </Grid>

        {/* Empty State */}
        {filteredJobs.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant='h6' color='text.secondary' sx={{ mb: 2 }}>
              Tidak ada lowongan yang sesuai
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              Coba ubah filter atau kata kunci pencarian
            </Typography>
          </Box>
        )}

        {/* Info Box */}
        <Box
          sx={{
            mt: 10,
            p: { xs: 4, md: 6 },
            borderRadius: 4,
            textAlign: 'center',
            background:
              theme.palette.mode === 'dark'
                ? 'linear-gradient(135deg, rgba(152, 15, 90, 0.2) 0%, rgba(76, 0, 39, 0.2) 100%)'
                : 'linear-gradient(135deg, rgba(152, 15, 90, 0.1) 0%, rgba(255, 245, 248, 0.8) 100%)',
            border: '1px solid',
            borderColor:
              theme.palette.mode === 'dark' ? 'rgba(152, 15, 90, 0.3)' : 'rgba(152, 15, 90, 0.1)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <Typography
            variant='h5'
            sx={{
              mb: 2,
              fontWeight: 700,
              fontSize: { xs: 20, md: 24 },
            }}
          >
            💼 Ingin Posting Lowongan?
          </Typography>
          <Typography
            variant='body1'
            color='text.secondary'
            sx={{ mb: 4, maxWidth: 600, mx: 'auto', lineHeight: 1.7 }}
          >
            Perusahaan Anda sedang mencari talent dari komunitas developer UNDIPA? Hubungi kami
            untuk posting lowongan kerja.
          </Typography>
          <Button
            variant='contained'
            size='large'
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
              fontSize: 16,
              background:
                theme.palette.mode === 'dark'
                  ? 'linear-gradient(135deg, #980f5a 0%, #c41470 100%)'
                  : 'linear-gradient(135deg, #980f5a 0%, #d01678 100%)',
              '&:hover': {
                background:
                  theme.palette.mode === 'dark'
                    ? 'linear-gradient(135deg, #7a0c48 0%, #a00f5a 100%)'
                    : 'linear-gradient(135deg, #7a0c48 0%, #b01260 100%)',
              },
            }}
          >
            Hubungi Admin
          </Button>
        </Box>
      </Container>
    </Box>
  )
}
